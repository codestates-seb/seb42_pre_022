package com.teambj.stackoverflow.auth;

import com.teambj.stackoverflow.domain.user.entity.User;
import com.teambj.stackoverflow.domain.user.repository.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Optional;

@Component
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
    private final CustomAuthorityUtils customAuthorityUtils;

    public CustomUserDetailsService(UserRepository userRepository, CustomAuthorityUtils customAuthorityUtils) {
        this.userRepository = userRepository;
        this.customAuthorityUtils = customAuthorityUtils;

    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<User> optional = userRepository.findByEmail(username);
        User findUser = optional.orElseThrow(() -> new RuntimeException("존재하지 않는 아이디, 비밀번호 입니다."));

        return new UserPrincipal(findUser);
    }

    public class UserPrincipal extends User implements UserDetails {


        UserPrincipal(User user){
            setUserId(user.getUserId());
            setEmail(user.getEmail());
            setPassword(user.getPassword());
            setRoles(user.getRoles());
            setEmailVerified(user.getEmailVerified());
        }


        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return customAuthorityUtils.createAuthorities(this.getRoles());
        }

        @Override
        public String getUsername() {
            return getEmail();
        }

        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isEnabled() {
            return getEmailVerified();
        }
    }


}
