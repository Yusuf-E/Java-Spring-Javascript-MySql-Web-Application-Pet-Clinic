package com.works.controllers;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class LoginController {
    private static final Logger log = Logger.getLogger(LoginController.class);
    @GetMapping("/login")
    public String login() {
        log.debug("debug message");
        log.error("error message");
        log.trace("trace message");
        log.info("info message");
        log.warn("warn message");
        return "login";
    }


}
