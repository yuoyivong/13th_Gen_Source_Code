package spring.monster.todowebminiproject002.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import spring.monster.todowebminiproject002.model.dto.request.AuthRequest;
import spring.monster.todowebminiproject002.model.dto.request.UserInfoRequest;
import spring.monster.todowebminiproject002.model.dto.response.APIResponse;
import spring.monster.todowebminiproject002.model.dto.response.AuthResponse;
import spring.monster.todowebminiproject002.model.dto.response.UserInfoResponse;
import spring.monster.todowebminiproject002.service.AuthService;
import spring.monster.todowebminiproject002.service.UserInfoService;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthenticationController {
    private final UserInfoService userInfoService;
    private final AuthService authService;

    public AuthenticationController(UserInfoService userInfoService, AuthService authService) {
        this.userInfoService = userInfoService;
        this.authService = authService;
    }

//    user register
    @PostMapping("/register")
    @Operation(summary = "New user register")
    public ResponseEntity<APIResponse<UserInfoResponse>> register(
            @RequestBody UserInfoRequest userInfoRequest) {
        APIResponse<UserInfoResponse> response = new APIResponse<>(
                "You've registered successfully.",
                HttpStatus.CREATED,
                userInfoService.registerUser(userInfoRequest)
        );

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }


//    user login
    @PostMapping("/login")
    @Operation(summary = "User login")
    public ResponseEntity<APIResponse<AuthResponse>> login(@RequestBody AuthRequest authRequest) {
        APIResponse<AuthResponse> response = new APIResponse<>(
                "You are authenticated!",
                HttpStatus.OK,
                authService.login(authRequest)
        );

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
