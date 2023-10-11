package instagrandma.instagrandma.dto;

import instagrandma.instagrandma.entity.Post;
import lombok.*;

import java.util.List;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ProfileDTO {
    private List<Post> myPosts;
    private String userName;
    private int postCount;
}
