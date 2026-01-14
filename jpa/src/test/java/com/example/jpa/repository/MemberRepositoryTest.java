package com.example.jpa.repository;

import com.example.jpa.domain.Member;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Log4j2
class MemberRepositoryTest {

    @Autowired
    private MemberRepository memberRepository;

    //추가
    @Test
    public void insertTest() {
        Member member = Member.builder().name("북극해").age(16).phone("010-2222-5555").address("경기도 하남시").build();

        memberRepository.save(member);
    }

    @Test
    public void updateTest() {
        Optional<Member> optmember = memberRepository.findById(2);
        Member member = optmember.get();

        member.setName("북해도");
        member.setAge(7);
        member.setAddress("북극해");

        memberRepository.save(member);
    }

    @Test
    public void deleteTest() {

        memberRepository.deleteById(4);

    }

    //전체 데이터 조회
    @Test
    public void selectAll() {
        List<Member> memberList = memberRepository.findAll();

        memberList.forEach(member -> log.info(member));
    }

    //조회
    @Test
    public void selectTest() {

       List<Member> memberList =
               memberRepository.findByAgeGreaterThanEqual(10);

       memberList.forEach(member -> log.info(member));
       log.info("--------------------------------------------");
       log.info(memberList);

    }

    @Test
    public void likeTest(){
        List<Member> memberList = memberRepository.findByAddressLike("%하남%");
        memberList.forEach(member -> log.info(member));
    }

    @Test
    public void orderAge(){
        List<Member> memberList = memberRepository.findByAgeOrderByDesc(10);
        memberList.forEach(member -> log.info(member));
    }

}