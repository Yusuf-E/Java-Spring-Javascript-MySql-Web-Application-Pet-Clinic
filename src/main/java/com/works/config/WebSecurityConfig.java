package com.works.config;

import com.works.services.UserService;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    final UserService userService;
    public WebSecurityConfig(UserService userService) {
        this.userService = userService;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService).passwordEncoder( userService.encoder() );
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http
                .headers().frameOptions().sameOrigin().and()
                .authorizeRequests()
                .antMatchers("/login/**").permitAll()
                .antMatchers("/dashboard/**").hasAnyRole("ADMIN","DOKTOR","SEKRETER")
                .antMatchers("/customer/**").hasAnyRole("ADMIN","DOKTOR","SEKRETER")
                .antMatchers("/orders/sale/**").hasAnyRole("ADMIN","DOKTOR","SEKRETER")
                .antMatchers("/orders/buying/**").hasAnyRole("ADMIN","DOKTOR","SEKRETER")
                .antMatchers("/lab-customer/**").hasAnyRole("ADMIN","DOKTOR")
                .antMatchers("/patient-detail/**").hasAnyRole("ADMIN","DOKTOR")
                .antMatchers("/company-cashier/**").hasAnyRole("ADMIN","DOKTOR","SEKRETER")
                .antMatchers("/product/**").hasAnyRole("ADMIN","DOKTOR")
                .antMatchers("/product/vlist/**").hasAnyRole("ADMIN","DOKTOR")
                .antMatchers("/suppliers/**").hasAnyRole("ADMIN","SEKRETER")
                .antMatchers("/diary/**").hasAnyRole("ADMIN","DOKTOR","SEKRETER")
                .antMatchers("/warehouse/**").hasAnyRole("ADMIN","DOKTOR","SEKRETER")
                .antMatchers("/statistics/**").hasAnyRole("ADMIN","DOKTOR","SEKRETER")
                .antMatchers("/category/**").hasAnyRole("ADMIN","DOKTOR","SEKRETER")
                .antMatchers("/calendar/**").permitAll()
                .antMatchers("/kalender/**").permitAll()
                .antMatchers("/js/calender/data/**").permitAll()
                .antMatchers("/dist/js/**").permitAll()
                .antMatchers("/users/**").permitAll()
                .antMatchers("/resources/**").permitAll()
                .antMatchers("/static/**").permitAll()
                .antMatchers("/css/**").permitAll()
                .antMatchers("/dist/**").permitAll()
                .antMatchers("/fonts.icomoon/**").permitAll()
                .antMatchers("/images/**").permitAll()
                .antMatchers("/js/**").permitAll()
                .antMatchers("/uploads/**").permitAll()
                .antMatchers("/labImage/**").permitAll()
                .antMatchers("/templates/**").permitAll()
                .antMatchers("/inc/**").permitAll()
                .antMatchers("/error/**").permitAll()

                .anyRequest().authenticated()
                .and()
                .formLogin().loginPage("/login").permitAll()
                .and()
                .logout()
                    .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                    .deleteCookies("JSESSIONID")
                    .invalidateHttpSession(true)
                    .logoutSuccessHandler(userService)
                    .logoutSuccessUrl("/login")
                    .permitAll()
                .and()
                .exceptionHandling().accessDeniedPage("/403");

        http.csrf().disable();


    }
}
