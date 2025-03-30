package spring.monster.todowebminiproject002.service;

import spring.monster.todowebminiproject002.model.dto.request.AuthRequest;
import spring.monster.todowebminiproject002.model.dto.response.AuthResponse;

public interface AuthService {
    AuthResponse login(AuthRequest authRequest);
}
