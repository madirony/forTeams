package com.forteams.chatbot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class ChatbotApplication {

	public static void main(String[] args) {
		SpringApplication.run(ChatbotApplication.class, args);
	}

}
