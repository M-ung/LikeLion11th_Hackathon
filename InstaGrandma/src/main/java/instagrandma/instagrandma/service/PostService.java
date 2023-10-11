package instagrandma.instagrandma.service;

import instagrandma.instagrandma.entity.Post;
import instagrandma.instagrandma.entity.User;
import instagrandma.instagrandma.repository.PostRepository;
import instagrandma.instagrandma.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.io.File;


@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    @Transactional
    public void savePost(String loginPhone, String postName, LocalDateTime uploadTime, String imageUrl) {
        Post post = new Post();
        User userId = userRepository.findByUserPhone(loginPhone).orElse(null);
        post.setUserId(userId);
//        post.setUserName(userName);
        post.setPostName(postName);
        post.setPostTime(uploadTime);
        post.setImageUrl(imageUrl);
        postRepository.save(post);
    }

    @Transactional
    public List<Post> findAll() {
        List<Post> postList = postRepository.findAll();
        return postList;
    }
    public void deleteByPost(List<Long> selectedPosts, String loginPhone) {
        for(int i=0; i<selectedPosts.size(); i++) {
            Optional<Post> optionalPost = postRepository.findById(selectedPosts.get(i));
            if(optionalPost.get().getUserId().getUserPhone().equals(loginPhone)) {
                postRepository.deleteById(selectedPosts.get(i));
                String imgPath = System.getProperty("user.dir") + "/InstaGrandma/src/main/frontend/myapp/public" + optionalPost.get().getImageUrl();
                if (imgPath != null) {
                    File imageFile = new File(imgPath);
                    if (imageFile.exists()) {
                        imageFile.delete(); // 파일 삭제
                    }
                }
            }
        }
    }
}
