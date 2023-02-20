package com.teambj.stackoverflow.auth;

import org.springframework.security.core.userdetails.UserDetails;

public class UserPrincipal implements UserDetails, OAuth2User, OidcUser {
}
