package com.hoaxify.version10.controller;


import com.hoaxify.version10.model.User;
import com.hoaxify.version10.services.UserService;
import com.hoaxify.version10.shared.AppResponse;
import com.hoaxify.version10.shared.error.ApiError;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping(value = "api/1.0/hoaxify")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/users")
    public AppResponse createUser(@RequestBody @Valid User user) {
        userService.saveUser(user);
        return new AppResponse("User created successfully", 200);

    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiError handleValidationException(MethodArgumentNotValidException exc) {
        ApiError error = new ApiError(400, "Validation Error", "api/1.0/hoaxify/users");

        Map<String, String> validationErrors = new HashMap<>();

        for (FieldError fieldError : exc.getBindingResult().getFieldErrors()) {
            validationErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
        }

        error.setValidationErrors(validationErrors);
        return error;
    }
}
