package com.ssafy.a305.global.advice;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
@Slf4j
public class ExceptionAdvice {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity unknownException(RuntimeException e) {
        log.error("Unknown server exception : ", e);
        return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
