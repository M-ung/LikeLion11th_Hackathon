package instagrandma.instagrandma.controller;

import instagrandma.instagrandma.dto.UserDTO;
import instagrandma.instagrandma.service.PostService;
import instagrandma.instagrandma.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;


@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {
    // 생성자 주입
    private final UserService userService;

    @PostMapping("/register")   // 회원가입 구현
    public ResponseEntity<String> register(@RequestBody UserDTO userDTO) {
        try {
            System.out.println(userDTO.getUserName()+ " "+userDTO.getUserPhone());
            boolean registerCheck = userService.save(userDTO);
            if (registerCheck) {
                return ResponseEntity.ok("회원가입 성공!!");
            } else {
                return ResponseEntity.badRequest().body("회원가입 실패"); // 실패 시 Bad Request로 응답
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("회원가입 실패");
        }
    }
    @PostMapping("/login")   // 로그인 구현
    public ResponseEntity<String> login(@RequestBody UserDTO userDTO, HttpSession session) {
        try {
            UserDTO loginResult = userService.login(userDTO);
            System.out.println(userDTO.getUserPhone()+"님이 로그인을 시도합니다.");
            if(loginResult != null) {
                // 로그인 성공
                session.setAttribute("loginPhone", userDTO.getUserPhone());
                System.out.println("session: "+session.getAttribute("loginPhone"));
                return ResponseEntity.ok("로그인 성공!!");
            }
            else {
                return ResponseEntity.badRequest().body("로그인 실패");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("회원가입 실패");
        }
    }
    @PostMapping("/delete") // 회원탈퇴 구현
    public ResponseEntity<String> deleteById(HttpSession session) {
        String myPhone = (String)session.getAttribute("loginPhone");
        System.out.println(myPhone+"님께서 회원탈퇴를 시도합니다.");
        try {
            boolean deleteResult = userService.deleteById(myPhone);
            if(deleteResult) {
                return ResponseEntity.ok("회원탈퇴 성공!!");
            }
            else {
                return ResponseEntity.badRequest().body("회원탈퇴 실패");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("회원탈퇴 실패");
        }
    }

    @PostMapping("/update")
    public ResponseEntity<String> update(@RequestBody UserDTO userDTO, HttpSession session) {
        String myPhone = (String)session.getAttribute("loginPhone");

        try {
            boolean updateResult = userService.update(userDTO, myPhone);
            if(updateResult) {
                return ResponseEntity.ok("회원수정 성공");
            }
            else {
                return ResponseEntity.badRequest().body("회원수정 실패");
            }

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("회원수정 실패");
        }
    }
    @GetMapping("/update")
    public ResponseEntity<UserDTO> getUserInfo(HttpSession session) {
        String myPhone = (String) session.getAttribute("loginPhone");
        try {
            UserDTO userDTO = userService.getUser(myPhone);
            return ResponseEntity.ok(userDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        try {
            session.invalidate();
            return ResponseEntity.ok("로그아웃 성공");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("로그아웃 실패");
        }
    }

}
