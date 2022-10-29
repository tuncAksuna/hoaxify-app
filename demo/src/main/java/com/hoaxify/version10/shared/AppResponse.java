package com.hoaxify.version10.shared;


import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public class AppResponse {

    private String message;

    private int status;

}
