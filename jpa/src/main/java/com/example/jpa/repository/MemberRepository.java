package com.example.jpa.repository;

import com.example.jpa.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemberRepository extends JpaRepository<Member, Integer> {
    Member findMemberByName(String name);

    Member findMemberByPhone(String phone);

    List<Member> findByAge(int age);

    Member findByAddressAndAge(String address, int age);

    List<Member> findByAgeGreaterThanEqual(int age);

    List<Member> findByAddressLike(String address);




    @Query(
            "select m from Member m where m.address like %:address% order by m.age asc "
    )
    List<Member> findByAddressAgeASC(String address);

    @Query(
            "select m from Member m where m.age>= :age " +
                    "order by m.age desc"
    )
    List<Member> findByAgeOrderByDesc(int age);

    @Query(value = "select * from member where age>=:age order by age desc ", nativeQuery = true)
    List<Member> findByAgeOrderByDesc2(int age);


}
