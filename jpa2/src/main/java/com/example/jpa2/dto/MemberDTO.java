package com.example.jpa2.dto;

import com.example.jpa2.domain.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Builder
public class MemberDTO {

    private Integer memberId;
    private String name;
    private int age;
    private String address;
    private String phone;

// MemberDTO.java 파일

    public Member toEntity() {
        // 1. 빌더를 먼저 생성 (ID는 제외하고 공통 필드만 넣기)
        Member.MemberBuilder builder = Member.builder()
                .name(this.name)
                .age(this.age)
                .address(this.address)
                .phone(this.phone);

        // 2. memberId가 null이 아닐 때만(수정 시에만) ID를 세팅함
        // 이렇게 하면 신규 등록(null)일 때는 이 if문을 건너뛰어 에러가 나지 않습니다.
        if (this.memberId != null) {
            builder.memberId(this.memberId);
        }

        return builder.build();
    }

    public static MemberDTO from(Member member){
        return MemberDTO.builder()
                .memberId(member.getMemberId())
                .name(member.getName())
                .age(member.getAge())
                .address(member.getAddress())
                .phone(member.getPhone())
                .build();
    }
}
