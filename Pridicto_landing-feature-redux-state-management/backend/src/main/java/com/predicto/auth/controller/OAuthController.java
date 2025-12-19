package com.predicto.auth.controller;
import com.predicto.auth.entity.AuthProvider;

import com.predicto.auth.entity.User;
import com.predicto.auth.repository.UserRepository;
import com.predicto.auth.security.JwtUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Optional;

@RestController
@RequestMapping("/auth/oauth")
public class OAuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @Value("${app.frontend.url:http://localhost:5173}")
    private String frontendUrl;

    /* =========================
       START OAUTH REDIRECTS
       ========================= */

    @GetMapping("/google")
    public RedirectView googleAuth() {
        return new RedirectView("/oauth2/authorization/google");
    }

    @GetMapping("/github")
    public RedirectView githubAuth() {
        return new RedirectView("/oauth2/authorization/github");
    }

    /* =========================
       OAUTH SUCCESS HANDLER
       ========================= */

   @GetMapping("/success")
public void oauthSuccess(HttpServletRequest request, HttpServletResponse response) throws IOException {

    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    if (authentication == null || !(authentication.getPrincipal() instanceof OAuth2User)) {
        response.sendRedirect(frontendUrl + "/login?error=oauth_failed");
        return;
    }

    OAuth2AuthenticationToken oauthToken =
            (OAuth2AuthenticationToken) authentication;

    String registrationId =
            oauthToken.getAuthorizedClientRegistrationId();

    OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();

    String email = oauthUser.getAttribute("email");
    String firstName = oauthUser.getAttribute("given_name");
    String lastName = oauthUser.getAttribute("family_name");

    // GitHub fallback
    if (email == null) {
        String login = oauthUser.getAttribute("login");
        email = login + "@github.com";
        firstName = oauthUser.getAttribute("name");
        lastName = "";
    }

    if (firstName == null) firstName = "User";
    if (lastName == null) lastName = "";

    Optional<User> optionalUser = userRepository.findByEmail(email);
    User user;

    if (optionalUser.isPresent()) {
        user = optionalUser.get();
    } else {
        user = new User();
        user.setEmail(email);
        user.setUsername(email.split("@")[0]);
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setPassword("{noop}OAUTH_USER");

        user.setEmailVerified(true);
        user.setActive(true);

        if ("github".equalsIgnoreCase(registrationId)) {
            user.setProvider(AuthProvider.GITHUB);
        } else if ("google".equalsIgnoreCase(registrationId)) {
            user.setProvider(AuthProvider.GOOGLE);
        }

        userRepository.save(user);
    }

    String jwt = jwtUtils.generateTokenFromUsername(user.getEmail());
    response.sendRedirect(frontendUrl + "/oauth-success?token=" + jwt);
}
}