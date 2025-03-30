package spring.monster.todowebminiproject002.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import spring.monster.todowebminiproject002.model.entity.UserInfo;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserInfoRepository extends JpaRepository<UserInfo, UUID> {

    Optional<UserInfo> findUserInfoByEmail(String email);
}
