package instagrandma.instagrandma.entity;

import instagrandma.instagrandma.dto.UserDTO;
import lombok.*;

import javax.persistence.*;

@Entity
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "user_table")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment 지정
    private Long id;

    @Column
    private String userName;

    @Column
    private String userPhone;
    public static User toUser(UserDTO userDTO) {
        User user = new User();
        user.setUserName(userDTO.getUserName());
        user.setUserPhone(userDTO.getUserPhone());
        return user;
    }

    public static User toUpdateUser(UserDTO userDTO, User existingUser) {
        existingUser.setUserPhone(userDTO.getUserPhone());
        existingUser.setUserName(userDTO.getUserName());
        return existingUser;
    }

}
