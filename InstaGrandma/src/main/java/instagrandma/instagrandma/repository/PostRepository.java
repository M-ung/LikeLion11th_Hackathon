package instagrandma.instagrandma.repository;

import instagrandma.instagrandma.entity.Post;
import instagrandma.instagrandma.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    void deleteByUserId(Long userId);

}
