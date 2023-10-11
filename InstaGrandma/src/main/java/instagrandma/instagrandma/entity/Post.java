package instagrandma.instagrandma.entity;

import instagrandma.instagrandma.dto.PostDTO;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "post_table")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment 지정
    private Long post_id;

    @Column
    private String postName;

    @Column
    private LocalDateTime postTime;

    @Column
    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "user_id") // 외래키 컬럼 이름을 정의합니다. 실제 DB에는 이 컬럼이 생성됩니다.
    private User userId;

    @Column
    private String userName;

}
