package com.works.services;

import com.works.entities.Role;
import com.works.entities.Users;
import com.works.repositories.UserRepository;
import com.works.utils.Util;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.security.web.authentication.logout.SimpleUrlLogoutSuccessHandler;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.naming.AuthenticationException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserService extends SimpleUrlLogoutSuccessHandler implements UserDetailsService, LogoutSuccessHandler {

    final UserRepository uRepo;
    public UserService(UserRepository uRepo) {
        this.uRepo = uRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String email) {
        UserDetails userDetails = null;
        Optional<Users> oUser = uRepo.findByUseremailEqualsIgnoreCaseAllIgnoreCase(email);
        if( oUser.isPresent() ){
            Users us = oUser.get();
            userDetails = new org.springframework.security.core.userdetails.User(
                    us.getUseremail(),
                    us.getPassword(),
                    us.isEnabled(),
                    us.isTokenExpired(),
                    true,
                    true,
                    getAuthorities( us.getRoles() ));
        }else {
            throw new UsernameNotFoundException("Kullanıcı adı ya da şifre hatalı!");
        }
        return userDetails;


    }

    public Users register(Users us) throws AuthenticationException {
        if( !Util.isEmail(us.getUseremail()) ){
            throw new AuthenticationException("Bu mail formatı hatalı!");
        }
        Optional<Users> uOpt = uRepo.findByUseremailEqualsIgnoreCaseAllIgnoreCase(us.getUseremail());
        if( uOpt.isPresent() ){
            throw new AuthenticationException("Bu kullanıcı daha önce kayıtlı!");
        }
        us.setPassword( encoder().encode( us.getPassword() ) );
        return uRepo.save(us);

    }

    private List<GrantedAuthority> getAuthorities (List<Role> roles) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        for (Role role : roles) {
            authorities.add(new SimpleGrantedAuthority( role.getName() ));
        }
        return authorities;
    }

    public PasswordEncoder encoder(){
        return new BCryptPasswordEncoder();
    }

    @Override
    public void onLogoutSuccess(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Authentication authentication) throws IOException, ServletException {
        System.out.println("onLogoutSuccess Call");
        httpServletResponse.sendRedirect(httpServletRequest.getContextPath()+"/login");
    }


}
