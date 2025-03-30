package spring.monster.todowebminiproject002.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import spring.monster.todowebminiproject002.model.dto.response.UserInfoResponse;
import spring.monster.todowebminiproject002.model.entity.UserInfo;
import spring.monster.todowebminiproject002.model.entity.UserInfoDetails;

import java.util.UUID;

@Configuration
public class CurrentUserConfig {

//    get current user information
    public UserInfoResponse getCurrenUser() {
        Authentication authentication =  SecurityContextHolder.getContext().getAuthentication();

        UserInfoDetails userInfoDetails = (UserInfoDetails) authentication.getPrincipal();
        UserInfo userInfo = userInfoDetails.getUserInfo();
        return userInfo.toResponseDTO();
    }

//    get current user id
    public UUID getCurrentUserId() {
        Authentication authentication =  SecurityContextHolder.getContext().getAuthentication();
        UserInfoDetails userInfoDetails = (UserInfoDetails) authentication.getPrincipal();
        return userInfoDetails.getUserInfo().getUserId();
    }
}
