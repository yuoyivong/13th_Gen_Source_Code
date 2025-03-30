package spring.monster.todowebminiproject002.model.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserInfoResponse {
    private UUID userId;
    private String username;
    private String email;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String profile;

    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private List<WorkspaceResponse> workspaceList;

}
