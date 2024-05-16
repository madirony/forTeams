package com.forteams.gateway.config;

import com.forteams.gateway.service.TokenService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
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
                            ServerHttpRequest mutatedRequest = exchange.getRequest().mutate()
                                    .header("msUuid", msUuid)
                                    .build();
                            return chain.filter(exchange.mutate().request(mutatedRequest).build());
                        })
                        .switchIfEmpty(Mono.defer(() -> {
                            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                            return exchange.getResponse().setComplete();
                        }));
            } else {
                log.info(">ASDASDAS<DASDAS<DAS>DASD>AS<DASDASDK#UR*$*********************************");
                exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                return exchange.getResponse().setComplete();
            }
        };
    }
}
