package instagrandma.instagrandma.service;

import instagrandma.instagrandma.dto.UserDTO;
import instagrandma.instagrandma.entity.Post;
import instagrandma.instagrandma.entity.User;
import instagrandma.instagrandma.repository.PostRepository;
import instagrandma.instagrandma.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    public Boolean save(UserDTO userDTO) {
        User user = User.toUser(userDTO);
        Optional<User> byUserPhone = userRepository.findByUserPhone(user.getUserPhone());
        if(!byUserPhone.isPresent())
        {
            userRepository.save(user);
            System.out.println(user.getUserPhone()+"님이 저장되었습니다.");
            return true;
        }
        else {
            System.out.println(user.getUserPhone()+"님이 이미 존재합니다.");
            return false;
        }
    }

    public UserDTO login(UserDTO userDTO) {
        Optional<User> byUserPhone = userRepository.findByUserPhone(userDTO.getUserPhone());
        System.out.println(userDTO.getUserPhone()+" 로그인 중입니다.");
        if(byUserPhone.isPresent()) {
            User user = byUserPhone.get();
            System.out.println("존재합니다.");
            UserDTO dto = UserDTO.toUserDTO(user);
            return dto;
        }
        else{
            System.out.println("존재하지 않습니다.");
            return null;
        }
    }
    public Boolean update(UserDTO userDTO, String myPhone) {
        Optional<User> optionalUserPhone = userRepository.findByUserPhone(myPhone);
        if (optionalUserPhone.isPresent()) {
            User user = optionalUserPhone.get();
            User updatedUser = User.toUpdateUser(userDTO, user); // 사용자 정보 업데이트
            userRepository.save(updatedUser);
            return true;
        } else {
            System.out.println(myPhone + "님이 수정실패되었습니다.");
            return false;
        }
    }
    public UserDTO getUser(String myPhone) {
        Optional<User> optionalUserPhone = userRepository.findByUserPhone(myPhone);
        if(optionalUserPhone.isPresent()) {
            User user = optionalUserPhone.get();
            UserDTO userDTO = UserDTO.toUserDTO(user);
            return userDTO;
        }
        else {
            return null;
        }
    }

    public boolean deleteById(String myPhone) {
        Optional<User> optionalUserPhone = userRepository.findByUserPhone(myPhone);
        if (optionalUserPhone.isPresent()) {
            System.out.println("존재한다");
            User user = optionalUserPhone.get();
            Long myId = user.getId();

            List<Post> postsToDelete = postRepository.findAll(); // 사용자의 모든 포스트를 가져옵니다.

            // 모든 포스트를 삭제합니다.
            for (Post post : postsToDelete) {
                if(post.getUserId().getId() == myId)
                {
                    postRepository.delete(post);
                }
            }
            // 사용자 정보 삭제
            userRepository.deleteById(myId);
            System.out.println(myPhone + "님이 계정을 탈퇴했습니다.");
            return true;
        } else {
            System.out.println("존재 안한다");
            return false;
        }
    }
}
