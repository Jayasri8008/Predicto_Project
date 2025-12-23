package com.predicto.auth.config;

import com.predicto.auth.security.JwtUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    private final JwtUtils jwtUtils;

    public SecurityConfig(JwtUtils jwtUtils) {
        this.jwtUtils = jwtUtils;
    }

    // ✅ REQUIRED for AuthService (FIXES YOUR CURRENT ERROR)
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            .csrf(csrf -> csrf.disable())
            .cors(Customizer.withDefaults())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                    "/",
                    "/auth/**",
                    "/oauth2/**",
                    "/login/**",
                     "/api/contact" 
                ).permitAll()
                .anyRequest().authenticated()
            )
            .oauth2Login(oauth -> oauth
                .successHandler((request, response, authentication) -> {

                    OAuth2AuthenticationToken oauthToken =
                            (OAuth2AuthenticationToken) authentication;

                    String email =
                            oauthToken.getPrincipal().getAttribute("email");

                    // ✅ Generate JWT after Google login
                    String token = jwtUtils.generateTokenFromUsername(email);

                    // ✅ Redirect to frontend with token
                    response.sendRedirect(
                        "http://localhost:5173/dashboard?token=" + token
                    );
                })
            );

        return http.build();
    }
}
