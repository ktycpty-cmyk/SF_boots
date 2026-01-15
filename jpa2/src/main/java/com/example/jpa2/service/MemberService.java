package com.example.jpa2.service;

import com.example.jpa2.domain.Member;
import com.example.jpa2.dto.MemberDTO;
import com.example.jpa2.repository.MemberRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Log4j2
@Service
public class MemberService {

    private MemberRepository memberRepository;

    //생산자 주입
    public MemberService(MemberRepository memberRepository){
        this.memberRepository = memberRepository;
    }

    //수정
    public void update(int memberId, MemberDTO memberDTO){
        //2. 영속성 컨텍스트에서 엔티티를 조회
        Member member = memberRepository.findById(memberId)
                .orElseThrow(()-> new IllegalArgumentException("해당 회원이 없습니다. id=" + memberId));

        //3. 비즈니스 로직을 엔티티 내부 메서드로 처리(setter 대신 권장)
        member.updateInfo(memberDTO.getName(), memberDTO.getAge(),
                memberDTO.getAddress(), memberDTO.getPhone());
    }

    //추가
    public void insert(MemberDTO memberDTO){
        Member member = memberDTO.toEntity();
        memberRepository.save(member);
    }

    //삭제
    public void delete(int memberId){

        memberRepository.deleteById(memberId);
    }

    //조회
    public MemberDTO findById(int memberId){
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NoSuchElementException("해당 회원이 없습니다."));

        return MemberDTO.from(member);
    }

    //전체 데이터 조회
    public List<Member> finByALL(){
        return memberRepository.findAll();
    }

    //전체 데이터 조회
    public Page<Member> findByAll(Pageable pageable){

        log.info("---------------findByAll---------------");
        log.info("pageable : " + pageable);

        Page<Member> memberPage = memberRepository.findAll(pageable);

        log.info("memeberPage : " + memberPage);
        log.info("----------------------end findByAll-------------------------");

        return memberPage;
    }


}
