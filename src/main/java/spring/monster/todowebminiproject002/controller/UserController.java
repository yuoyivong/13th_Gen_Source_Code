package spring.monster.todowebminiproject002.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import spring.monster.todowebminiproject002.configuration.CurrentUserConfig;
import spring.monster.todowebminiproject002.model.dto.response.APIResponse;
import spring.monster.todowebminiproject002.model.dto.response.UserInfoResponse;

@RestController
@RequestMapping("/api/v1/user")
@SecurityRequirement(name = "bearerAuth")
public class UserController {

    private final CurrentUserConfig currentUserConfig;

    public UserController(CurrentUserConfig currentUserConfig) {
        this.currentUserConfig = currentUserConfig;
    }

    @GetMapping
    @Operation(summary = "Get current user information")
    public ResponseEntity<APIResponse<UserInfoResponse>> getUserInfo() {
        APIResponse<UserInfoResponse> response = new APIResponse<>(
                "Get current user information successfully!",
                HttpStatus.OK,
                currentUserConfig.getCurrenUser()
        );

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
