package spring.monster.todowebminiproject002.model.entity;

import jakarta.persistence.*;
import lombok.*;
import spring.monster.todowebminiproject002.model.dto.response.UserInfoResponse;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Entity(name = "user_tb")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class UserInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(nullable = false)
    private String username;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    private String profile;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Workspace> workspaceList = new ArrayList<>();

    private String roles;

//    map user dto
    public UserInfoResponse toResponseDTO() {
        return new UserInfoResponse(
                this.userId,
                this.username,
                this.email,
                this.profile,
                this.workspaceList.stream().map(Workspace::toResponseDTO).collect(Collectors.toList())
        );
    }

}
