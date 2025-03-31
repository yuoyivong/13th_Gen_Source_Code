package spring.monster.todowebminiproject002.service.serviceImpl;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import spring.monster.todowebminiproject002.exception.ResourceConflictException;
import spring.monster.todowebminiproject002.exception.ValidationException;
import spring.monster.todowebminiproject002.model.entity.UserInfo;
import spring.monster.todowebminiproject002.model.entity.UserInfoDetails;
import spring.monster.todowebminiproject002.model.dto.request.UserInfoRequest;
import spring.monster.todowebminiproject002.model.dto.response.UserInfoResponse;
import spring.monster.todowebminiproject002.repository.UserInfoRepository;
import spring.monster.todowebminiproject002.service.UserInfoService;

import java.util.UUID;

@Service
public class UserInfoServiceImpl implements UserInfoService {
    private final UserInfoRepository userInfoRepository;
    private final PasswordEncoder passwordEncoder;

    public UserInfoServiceImpl(UserInfoRepository userInfoRepository, PasswordEncoder passwordEncoder) {
        this.userInfoRepository = userInfoRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserInfo userInfo = userInfoRepository.findUserInfoByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found " + email));

//        convert userInfo to UserDetails
        return new UserInfoDetails(userInfo);
    }

    @Override
    public UserInfoResponse registerUser(UserInfoRequest userInfoRequest) {
        validateUser(userInfoRequest);
        UserInfo userInfo = new UserInfo();
        userInfo.setUsername(userInfoRequest.getUsername());
        userInfo.setEmail(userInfoRequest.getEmail());
        userInfo.setPassword(passwordEncoder.encode(userInfoRequest.getPassword()));
        userInfo.setProfile("https://i.pinimg.com/736x/25/c0/51/25c051740b4ef174b604799fb435db8e.jpg");
        return userInfoRepository.save(userInfo).toResponseDTO();
    }

    @Override
    public UserInfo getUserById(UUID userId) {
        return userInfoRepository.findById(userId).orElseThrow(() -> new UsernameNotFoundException("User not found " + userId));
    }

    //    custom method for handling validation
    private void validateUser(UserInfoRequest userInfoRequest) {

        if (!StringUtils.hasText(userInfoRequest.getUsername())) {
            throw new ValidationException("Username cannot be empty.");
        }

        if (!StringUtils.hasText(userInfoRequest.getEmail())) {
            throw new ValidationException("Email cannot be empty.");
        } else if (!userInfoRequest.getEmail().matches("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$")) {
            throw new ValidationException("Invalid email format.");
        } else if (userInfoRepository.findUserInfoByEmail(userInfoRequest.getEmail()).isPresent()) {
            throw new ResourceConflictException("Email is already in use.");
        }

        if (!StringUtils.hasText(userInfoRequest.getPassword())) {
            throw new ValidationException("Password cannot be empty.");
        }
    }

}
