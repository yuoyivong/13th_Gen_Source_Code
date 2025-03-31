package spring.monster.todowebminiproject002.service.serviceImpl;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import spring.monster.todowebminiproject002.exception.ResourceConflictException;
import spring.monster.todowebminiproject002.exception.ResourceNotFoundException;
import spring.monster.todowebminiproject002.exception.ValidationException;
import spring.monster.todowebminiproject002.jwt.JwtService;
import spring.monster.todowebminiproject002.model.dto.request.AuthRequest;
import spring.monster.todowebminiproject002.model.dto.request.UserInfoRequest;
import spring.monster.todowebminiproject002.model.dto.response.AuthResponse;
import spring.monster.todowebminiproject002.model.entity.UserInfoDetails;
import spring.monster.todowebminiproject002.repository.UserInfoRepository;
import spring.monster.todowebminiproject002.service.AuthService;

@Service
public class AuthServiceImpl implements AuthService {
    private final UserInfoRepository userInfoRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthServiceImpl(UserInfoRepository userInfoRepository, AuthenticationManager authenticationManager, JwtService jwtService) {
        this.userInfoRepository = userInfoRepository;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @Override
    public AuthResponse login(AuthRequest authRequest) {
        validateUserLogin(authRequest);

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authRequest.getEmail(),
                        authRequest.getPassword()
                )
        );

        var user = userInfoRepository.findUserInfoByEmail(authRequest.getEmail())
                .orElseThrow(()-> new ResourceNotFoundException("User not found"));

        UserDetails userDetails = new UserInfoDetails(user);

        String jwtToken = jwtService.generateToken(userDetails);

        return new AuthResponse(jwtToken);
    }

    //    custom method for handling validation
    private void validateUserLogin(AuthRequest authRequest) {

        if (!StringUtils.hasText(authRequest.getEmail())) {
            throw new ValidationException("Email cannot be empty.");
        } else if (!authRequest.getEmail().matches("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$")) {
            throw new ValidationException("Invalid email format.");
        } else if(userInfoRepository.findUserInfoByEmail(authRequest.getEmail()).isEmpty()) {
            throw new ResourceNotFoundException("Email not found.");
        }

        if (!StringUtils.hasText(authRequest.getPassword())) {
            throw new ValidationException("Password cannot be empty.");
        }
    }
}
