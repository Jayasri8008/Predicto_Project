package com.predicto.auth.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Condition;
import org.springframework.context.annotation.ConditionContext;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Conditional;
import org.springframework.core.type.AnnotatedTypeMetadata;
import org.springframework.security.oauth2.client.InMemoryOAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;

import java.util.Arrays;
import java.util.List;

@Configuration
@Conditional(OAuth2Config.OAuthConfigCondition.class)
public class OAuth2Config {

    @Value("${spring.security.oauth2.client.registration.google.client-id:}")
    private String googleClientId;

    @Value("${spring.security.oauth2.client.registration.google.client-secret:}")
    private String googleClientSecret;

    @Value("${spring.security.oauth2.client.registration.google.redirect-uri:}")
    private String googleRedirectUri;

    public static class OAuthConfigCondition implements Condition {
        @Override
        public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
            // Check if OAuth credentials are properly configured
            String clientId = context.getEnvironment().getProperty("spring.security.oauth2.client.registration.google.client-id", "");
            String clientSecret = context.getEnvironment().getProperty("spring.security.oauth2.client.registration.google.client-secret", "");
            
            boolean hasValidCredentials = clientId != null && 
                                        !clientId.isEmpty() &&
                                        !clientId.equals("your-google-client-id") &&
                                        clientSecret != null && 
                                        !clientSecret.isEmpty() &&
                                        !clientSecret.equals("your-google-client-secret");
            
            if (!hasValidCredentials) {
                System.out.println("INFO: Google OAuth2 credentials are not properly configured. OAuth login will be disabled. " +
                    "Please set spring.security.oauth2.client.registration.google.client-id and " +
                    "spring.security.oauth2.client.registration.google.client-secret in application.properties for OAuth functionality.");
            }
            
            return hasValidCredentials;
        }
    }

    @Bean
    @Conditional(OAuthConfigCondition.class)
    public ClientRegistrationRepository clientRegistrationRepository() {
        ClientRegistration googleRegistration = ClientRegistration.withRegistrationId("google")
                .clientId(googleClientId)
                .clientSecret(googleClientSecret)
                .clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_BASIC)
                .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
                .redirectUri(googleRedirectUri)
                .scope("openid", "email", "profile")
                .authorizationUri("https://accounts.google.com/o/oauth2/v2/auth")
                .tokenUri("https://oauth2.googleapis.com/token")
                .userInfoUri("https://openidconnect.googleapis.com/v1/userinfo")
                .userNameAttributeName("sub")
                .jwkSetUri("https://www.googleapis.com/oauth2/v3/certs")
                .clientName("Google")
                .build();

        System.out.println("Google OAuth2 configured successfully.");
        return new InMemoryClientRegistrationRepository(Arrays.asList(googleRegistration));
    }

    @Bean
    @Conditional(OAuthConfigCondition.class)
    public OAuth2AuthorizedClientService authorizedClientService(ClientRegistrationRepository clientRegistrationRepository) {
        return new InMemoryOAuth2AuthorizedClientService(clientRegistrationRepository);
    }
}