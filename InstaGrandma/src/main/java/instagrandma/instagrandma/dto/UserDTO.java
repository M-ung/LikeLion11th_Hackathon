package instagrandma.instagrandma.dto;

import instagrandma.instagrandma.entity.User;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserDTO {
    private Long id;
    private String userName;
    private String userPhone;

    public static UserDTO toUserDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setUserName(user.getUserName());
        userDTO.setUserPhone(user.getUserPhone());
        return userDTO;
    }
}
