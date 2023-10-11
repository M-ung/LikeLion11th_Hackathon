package instagrandma.instagrandma.repository;

import instagrandma.instagrandma.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUserPhone(String userPhone);
    Optional<User> findByUserName(String userName);
}
