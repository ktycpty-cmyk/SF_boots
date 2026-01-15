package com.example.jpa2.repository;

import com.example.jpa2.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemberRepository extends JpaRepository<Member, Integer> {

    Member findByName(String name);

    Member findByPhone(String phone);

    List<Member> findByAge(int age);

    List<Member> findByAddressAndAge(String address, int age);
}
