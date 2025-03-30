package spring.monster.todowebminiproject002.service.serviceImpl;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
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
        UserInfo userInfo = userInfoRepository.findUserInfoByEmail(email).orElseThrow(()-> new UsernameNotFoundException("User not found " + email));

//        convert userInfo to UserDetails
        return new UserInfoDetails(userInfo);
    }

    @Override
    public UserInfoResponse registerUser(UserInfoRequest userInfoRequest) {
        UserInfo userInfo = new UserInfo();
        userInfo.setUsername(userInfoRequest.getUsername());
        userInfo.setEmail(userInfoRequest.getEmail());
        userInfo.setPassword(passwordEncoder.encode(userInfoRequest.getPassword()));
        return userInfoRepository.save(userInfo).toResponseDTO();
    }

    @Override
    public UserInfo getUserById(UUID userId) {
        return userInfoRepository.findById(userId).orElseThrow(()-> new UsernameNotFoundException("User not found " + userId));
    }


}
