package com.forteams.gateway.config;

import com.forteams.gateway.service.TokenService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;
import org.springframework.http.HttpCookie;
import java.util.Optional;

@Component
@Slf4j
public class JwtTokenFilter extends AbstractGatewayFilterFactory<JwtTokenFilter.Config> {

    public static class Config {
        // Configuration properties
    }

    private final TokenService tokenService;

    public JwtTokenFilter(TokenService tokenService) {
        super(Config.class);
        this.tokenService = tokenService;
    }

    private String getTokenFromRequest(ServerHttpRequest request) {
        return Optional.ofNullable(request.getCookies().getFirst("ACCESS_TOKEN"))
                .map(HttpCookie::getValue)
                .orElse(null);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            String token = getTokenFromRequest(exchange.getRequest());
            log.info(">>>>>>>>>>>>>>>>>>>>           Token : "+token+"            >>>>>>>>>>>>>");
            if (token != null) {
                return tokenService.validateTokenAndGetMsUuid(token)
                        .flatMap(msUuid -> {
                            log.info("msUuid from token: {}", msUuid);
                            ServerHttpRequest mutatedRequest = exchange.getRequest().mutate()
                                    .header("msUuid", msUuid)
                                    .build();
                            return chain.filter(exchange.mutate().request(mutatedRequest).build());
                        })
//                        .switchIfEmpty(Mono.defer(() -> {
//                            log.warn("Token is invalid or expired");
////                            RestTemplate restTemplate = new RestTemplate();
////                            restTemplate.execute("https://forteams.co.kr/api/v2/1", HttpMethod.GET,null,null,new Object());
//                            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
//                            return exchange.getResponse().setComplete();
//                        }))
                        .onErrorResume(e -> {
                            log.error("Token validation error: ", e);
                            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                            return exchange.getResponse().setComplete();
                        });
//                log.info("************************   "+msUuid1);
//                return msUuid1;
            } else {
                log.warn("No ACCESS_TOKEN cookie found");
                exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                return exchange.getResponse().setComplete();
            }
        };
    }
}
