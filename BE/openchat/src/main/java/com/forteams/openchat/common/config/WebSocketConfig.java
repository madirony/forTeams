package com.forteams.openchat.common.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Value("${spring.rabbitmq.host}")
    private String host;

    @Value("${spring.rabbitmq.username}")
    private String username;

    @Value("${spring.rabbitmq.password}")
    private String password;

    @Value("${spring.rabbitmq.virtual-host}")
    private String virtualHost;

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // 설정 STOMP 메시지 브로커를 RabbitMQ로 설정
        registry.enableStompBrokerRelay("/topic", "/queue")
                .setRelayHost(host)
                .setRelayPort(61613)
                .setClientLogin(username)
                .setClientPasscode(password)
                .setSystemLogin(username)
                .setSystemPasscode(password)
                .setVirtualHost(virtualHost);

        // 클라이언트에서 메시지를 보낼 수 있는 엔드포인트의 접두어 설정
        registry.setApplicationDestinationPrefixes("/pub");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // WebSocket 엔드포인트 등록
        registry.addEndpoint("/api/ws")
                .setAllowedOriginPatterns("*") // 모든 도메인 허용 (보안적인 측면에서 검토 필요)
                .withSockJS(); // SockJS 지원을 활성화
    }
}
