package com.forteams.gateway.config;

import com.forteams.gateway.service.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;
import org.springframework.http.HttpCookie;

import java.util.Optional;

@Component
public class JwtTokenFilter extends AbstractGatewayFilterFactory<JwtTokenFilter.Config> {

    public static class Config{
        // put the config
    }

    public JwtTokenFilter(TokenService tokenService){
        super(Config.class);
        this.tokenService = tokenService;
    }


    private final TokenService tokenService;


    private String getTokenFromRequest(ServerHttpRequest request) {
        return Optional.ofNullable(request.getCookies().getFirst("ACCESS_TOKEN"))
                .map(HttpCookie::getValue)
                .orElse(null);
    }


    @Override
    public GatewayFilter apply(Config config){
        return (exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest();
            ServerHttpResponse response = exchange.getResponse();
            String token = getTokenFromRequest(request);


            if (token != null) {
                String msUuid = tokenService.validateTokenAndGetMsUuid(token);
                if (msUuid != null) {
                    // Token is valid, add msUuid to the headers
                    request.mutate().header("msUuid", msUuid).build();
                    return chain.filter(exchange);
                }
            }
            // Token is invalid, set the response status to UNAUTHORIZED
            response.setStatusCode(HttpStatus.UNAUTHORIZED);
            return response.setComplete();

        };
    }
//    @Override
//    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
//        String token = getTokenFromRequest(exchange.getRequest());
//        if (token != null) { // 토큰 검증 추가
//            String msUuid = tokenService.validateTokenAndGetMsUuid(token); // 내부적으로 재발급 하면 될듯
//            if(msUuid != null) {
//                exchange.getRequest().mutate().header("msUuid", msUuid).build();
//                return chain.filter(exchange);
//            }
//        }
//        exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED); // 유효하지 않은 토큰 처리
//        return exchange.getResponse().setComplete(); // 요청 처리 중단
//
//    }
}
