//package com.forteams.gateway.config;
//
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.reactive.config.CorsRegistry;
//import org.springframework.web.reactive.config.WebFluxConfigurer;
//
//@Configuration
//public class WebFluxConfig implements WebFluxConfigurer {
//
////    @Override
////    public void addCorsMappings(CorsRegistry registry) {
////        registry.addMapping("/**")
//////                .allowedOrigins("https://forteams.co.kr")
////                .allowedOriginPatterns("*")
////                .allowedMethods("GET", "POST", "PUT", "DELETE")
////                .allowedHeaders("*")
//////                .allowCredentials(true) // allowedOriginPatterns("*") 와 함께 사용할 수 없음
////                .allowCredentials(false)
////                .maxAge(3600);
////    }
//
//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/**")
//                .allowedOriginPatterns("*")
//                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
//                .allowedHeaders("*")
//                .allowCredentials(false)
//                .maxAge(3600);
//
//    }
//}