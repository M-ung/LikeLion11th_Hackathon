package instagrandma.instagrandma.controller;
import instagrandma.instagrandma.dto.ProfileDTO;
import instagrandma.instagrandma.dto.UserDTO;
import instagrandma.instagrandma.entity.Post;
import instagrandma.instagrandma.entity.User;
import instagrandma.instagrandma.repository.PostRepository;
import instagrandma.instagrandma.repository.UserRepository;
import instagrandma.instagrandma.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;
    private final UserRepository userRepository;
    private final PostRepository postRepository;

    @PostMapping("/post")   // 게시  구현
    public ResponseEntity<String> upload(@RequestParam("file") MultipartFile file, HttpSession session) {
        String loginPhone = (String) session.getAttribute("loginPhone");
        String originalFilename = file.getOriginalFilename();
        LocalDateTime uploadTime = LocalDateTime.now();
        String postName = uploadTime+originalFilename;
        if (file.isEmpty()) {
            System.out.println("빈 파일입니다.");
            return ResponseEntity.badRequest().body("빈 파일입니다."); // 실패 시 Bad Request로 응답
        } else {
            try {
                // 저장할 폴더 경로 설정
//                String uploadDirectory = "/Users/mung/Documents/멍족/해커톤/4차 수정/InstaGrandma/src/main/frontend/myapp/public/uploads"; // 절대 경로
                String uploadDirectory = System.getProperty("user.dir") + "/InstaGrandma/src/main/frontend/myapp/public/uploads"; // 상대 경로
                // 이미지 파일의 URL 생성
                String imageUrl = "/uploads/" + postName;
                File directory = new File(uploadDirectory);
                if (!directory.exists()) {
                    directory.mkdirs(); // 중간 경로까지 생성
                }
                // 새 파일 객체 생성
                File newFile = new File(uploadDirectory + File.separator + postName);
                // 파일 저장
                file.transferTo(newFile);

                System.out.println(postName + " 저장 완료");
                postService.savePost(loginPhone, postName, uploadTime, imageUrl);
                return ResponseEntity.ok("게시 성공!!");
            } catch (IOException e) {
                e.printStackTrace();
                System.out.println("게시 오류");
                return ResponseEntity.badRequest().body("게시 오류"); // 실패 시 Bad Request로 응답
            }
        }
    }
    @GetMapping("/timeline")
    public ResponseEntity<List<Post>> getAllPosts() {
        List<Post> posts = postService.findAll();
        for (Post post : posts) {
            User userId = post.getUserId(); // 예시에서는 userId 필드를 가져오는 것으로 가정합니다.
            User user = userRepository.findById(userId.getId()).orElse(null);
            if (user != null) {
                post.setUserName(user.getUserName());
            }
        }

        return ResponseEntity.ok(posts);
    }

    @GetMapping("/myprofile")
    public ResponseEntity<ProfileDTO> getMyPosts(HttpSession session) {
        String loginPhone = (String) session.getAttribute("loginPhone");
        Long userId = userRepository.findByUserPhone(loginPhone).get().getId();
        List<Post> posts = postService.findAll();
        List<Post> myPosts = new ArrayList<>();
        for (int i=0; i<posts.size(); i++) {
            if(posts.get(i).getUserId().getId() == userId) {
                myPosts.add(posts.get(i));
            }
        }
        String userName = userRepository.findByUserPhone(loginPhone).get().getUserName();
        int postCount = myPosts.size();
        ProfileDTO profileDTO = new ProfileDTO();
        profileDTO.setMyPosts(myPosts);
        profileDTO.setUserName(userName);
        profileDTO.setPostCount(postCount);

        System.out.println(profileDTO+"전송중!!!");
        return ResponseEntity.ok(profileDTO);
    }

    @GetMapping("/userprofile/{post_id}")
    public ResponseEntity<ProfileDTO> getUserProfile(@PathVariable Long post_id, HttpSession session) {
        String loginPhone = postRepository.findById(post_id).get().getUserId().getUserPhone();
        Long userId = userRepository.findByUserPhone(loginPhone).get().getId();

        String sessionLoginPhone = (String) session.getAttribute("loginPhone");
        Long myId = userRepository.findByUserPhone(sessionLoginPhone).get().getId();


        List<Post> posts = postService.findAll();
        List<Post> myPosts = new ArrayList<>();
        for (int i=0; i<posts.size(); i++) {
            if(posts.get(i).getUserId().getId() == userId) {
                myPosts.add(posts.get(i));
            }
        }
        String userName = userRepository.findByUserPhone(loginPhone).get().getUserName();
        int postCount = myPosts.size();
        ProfileDTO profileDTO = new ProfileDTO();
        profileDTO.setMyPosts(myPosts);
        profileDTO.setUserName(userName);
        profileDTO.setPostCount(postCount);

        return ResponseEntity.ok(profileDTO);
    }

    @PostMapping("/deletePosts")
    public ResponseEntity<String> deletePosts(@RequestBody Map<String, List<Long>> requestData, HttpSession session) {
        String loginPhone = (String) session.getAttribute("loginPhone");
        List<Long> selectedPosts = requestData.get("selectedPosts");
        postService.deleteByPost(selectedPosts, loginPhone);
        System.out.println("게시물 삭제 메소드 입니다!!!!!!!");
        return ResponseEntity.ok().build();
    }


}