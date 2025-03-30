package spring.monster.todowebminiproject002.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import spring.monster.todowebminiproject002.model.entity.Workspace;

import java.util.List;
import java.util.UUID;

@Repository
public interface WorkspaceRepository extends JpaRepository<Workspace, UUID> {

    @Query("""
    SELECT w FROM workspace w JOIN w.user u WHERE u.userId = :userId
    """)
    List<Workspace> findWorkspacesByUserId(@Param("userId") UUID userId, Pageable pageable);

    @Query("""
        SELECT w FROM workspace w JOIN w.user u 
        WHERE u.userId = :userId 
        AND w.workspaceId = :workspaceId
    """)
    Workspace findWorkspaceByUserIdAndWorkspaceId(@Param("userId") UUID userId, @Param("workspaceId")UUID workspaceId);

    @Modifying
    @Query("""
        DELETE FROM workspace w 
        WHERE w.workspaceId = :workspaceId 
        AND w.user.userId = :userId
    """)
    void deleteWorkspaceByIdAndUserId(@Param("workspaceId") UUID workspaceId,
                                     @Param("userId") UUID userId);
}
