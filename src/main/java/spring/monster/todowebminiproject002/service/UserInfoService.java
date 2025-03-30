package spring.monster.todowebminiproject002.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import spring.monster.todowebminiproject002.model.dto.request.UserInfoRequest;
import spring.monster.todowebminiproject002.model.dto.response.UserInfoResponse;
import spring.monster.todowebminiproject002.model.entity.UserInfo;

import java.util.UUID;

public interface UserInfoService extends UserDetailsService {
    UserInfoResponse registerUser(UserInfoRequest userInfoRequest);

    UserInfo getUserById(UUID userId);

}
