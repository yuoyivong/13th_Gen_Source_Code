package spring.monster.todowebminiproject002.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import spring.monster.todowebminiproject002.model.entity.Task;
import spring.monster.todowebminiproject002.model.entity.Workspace;

import java.util.List;
import java.util.UUID;

@Repository
public interface TaskRepository extends JpaRepository<Task, UUID> {

    @Query("""
    SELECT t FROM task t JOIN t.workspace w 
    WHERE w.workspaceId = :workspaceId
    """)
    List<Task> findTasksByWorkspaceId(@Param("workspaceId") UUID workspaceId, Pageable pageable);

    @Query("""
        SELECT t FROM task t JOIN t.workspace w 
        WHERE t.taskId = :taskId 
        AND w.workspaceId = :workspaceId
    """)
    Task findTaskByTaskIdAndWorkspaceId(@Param("taskId") UUID taskId, @Param("workspaceId") UUID workspaceId);

    @Modifying
    @Query("""
        DELETE FROM task t 
        WHERE t.taskId = :taskId 
        AND t.workspace.workspaceId = :workspaceId
    """)
    void deleteTaskByTaskIdAndWorkspaceId(@Param("workspaceId") UUID workspaceId,
                                      @Param("taskId") UUID taskId);

}
