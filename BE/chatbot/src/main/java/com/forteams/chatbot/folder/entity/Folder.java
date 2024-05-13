package com.forteams.chatbot.folder.entity;

import com.forteams.chatbot.common.BaseEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "folders")
@NoArgsConstructor
@Setter
@Getter
public class Folder extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "folder_id")
    private Long id;

    @Column(name = "folder_name")
    private String name;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "user_id")  // 이 부분은 외래키가 되는 컬럼 이름을 지정합니다.
//    private User user;
    @Column(name = "msUuid")
    private String msUuid;
//    @Builder
//    public Folder(String name, User user){
//        this.name = name;
//        this.user = user;
//    }

    @Builder
    public Folder(String name, String msUuid){
        this.name = name;
        this.msUuid = msUuid;
    }
}
