package spring.monster.todowebminiproject002.service.serviceImpl;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import spring.monster.todowebminiproject002.jwt.JwtService;
import spring.monster.todowebminiproject002.model.dto.request.AuthRequest;
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

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authRequest.getEmail(),
                        authRequest.getPassword()
                )
        );

        var user = userInfoRepository.findUserInfoByEmail(authRequest.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        UserDetails userDetails = new UserInfoDetails(user);

        String jwtToken = jwtService.generateToken(userDetails);

        return new AuthResponse(jwtToken);
    }
}
