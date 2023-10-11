package instagrandma.instagrandma.dto;

import instagrandma.instagrandma.entity.Post;
import instagrandma.instagrandma.entity.User;
import lombok.*;

import javax.persistence.Column;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PostDTO {
    private Long post_id;
    private String userPhone;
    private String postName;
    private Long postTime;
    private String imageUrl;

//    public static PostDTO toPostDTO(Post post) {
//        PostDTO postDTO = new PostDTO();
//        postDTO.setPost_id(post.getPost_id());
//        postDTO.setUserPhone(post.getUserPhone());
//        postDTO.setPostName(post.getPostName());
//        postDTO.setPostTime(post.getPostTime());
//        return postDTO;
//    }
}
