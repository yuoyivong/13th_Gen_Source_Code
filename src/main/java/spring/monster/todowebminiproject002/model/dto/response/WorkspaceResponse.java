package spring.monster.todowebminiproject002.model.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import spring.monster.todowebminiproject002.model.entity.Task;

import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class WorkspaceResponse {
    private UUID workspaceId;
    private String workspaceName;
    private Boolean isFavorite;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<Task> taskList;

}
