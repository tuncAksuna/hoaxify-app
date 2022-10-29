package com.hoaxify.version10.shared.customvalidations;

import com.hoaxify.version10.model.User;
import com.hoaxify.version10.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UniqueUsernameValidator implements ConstraintValidator<UniqueUsername, String> {

    @Autowired
    UserRepository userRepository;

    @Override
    public boolean isValid(String username, ConstraintValidatorContext constraintValidatorContext) {
        User user = userRepository.findByUsername(username);

        if (user != null) {
            return false;
        }

        return true;
    }
}
