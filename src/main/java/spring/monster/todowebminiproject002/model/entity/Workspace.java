package spring.monster.todowebminiproject002.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import spring.monster.todowebminiproject002.model.dto.response.WorkspaceResponse;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity(name = "workspace")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Workspace {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(nullable = false, name = "workspace_id")
    private UUID workspaceId;

    @Column(nullable = false, length = 50, name = "workspace_name")
    private String workspaceName;

    @Column(nullable = false, name = "is_favorite")
    private Boolean isFavorite;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserInfo user;

    @OneToMany(mappedBy = "workspace", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Task> taskList = new ArrayList<>();

//    map workspace to dto
    public WorkspaceResponse toResponseDTO() {

        WorkspaceResponse workspaceResponse = new WorkspaceResponse();
        workspaceResponse.setWorkspaceId(this.workspaceId);
        workspaceResponse.setWorkspaceName(this.workspaceName);
        workspaceResponse.setIsFavorite(this.isFavorite);

        return workspaceResponse;

    }

}
