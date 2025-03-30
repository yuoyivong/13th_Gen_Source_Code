package spring.monster.todowebminiproject002.model.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class WorkspaceRequest {
    private String workspaceName;
    private Boolean isFavorite;
}
