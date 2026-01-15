package com.example.jpa2.controller;

import com.example.jpa2.domain.Member;
import com.example.jpa2.dto.MemberDTO;
import com.example.jpa2.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/list")
    public void getList(@PageableDefault(size = 3, sort = "memberId",
            direction = Sort.Direction.DESC)Pageable pageable, Model model){

        log.info("controller pageable : ");
        log.info(pageable);

        Page<Member> memberPage = memberService.findByAll(pageable);

        //1. 실제 데이터 리스트
        model.addAttribute("memberList", memberPage.getContent());

        log.info("memberPage.hasPrevious() : " + memberPage.hasPrevious());
        log.info("memberPage.hasNext() : " + memberPage.hasNext());
        log.info("memberPage.getNumber() : " + memberPage.getNumber());

        //2. 페이지 정보(HTML에서 버튼 만들 때 사용)
        model.addAttribute("page", memberPage);
    }

    //@GetMapping("/list")
    public void getList(Model model){
        List<Member> memberList = memberService.finByALL();
        model.addAttribute("memberList", memberList);
    }

    @GetMapping("/new")
    public void getNew(){

    }

    @PostMapping("/new")
    public String postNew(MemberDTO memberDTO){
        memberService.insert(memberDTO);

        return "redirect:/members/list";
    }

    @GetMapping("/delete/{id}")
    public String delete(@PathVariable("id") int memberId){
        memberService.delete(memberId);

        return "redirect:/members/list";
    }

    @GetMapping("/edit/{id}")
    public String edit(@PathVariable("id") int memberId, Model model){
        MemberDTO memberDTO = memberService.findById(memberId);
        model.addAttribute("member", memberDTO);

        return "/members/edit";
    }

    @PostMapping("/edit/{id}")
    public String editPost(@PathVariable("id") int memberId, MemberDTO memberDTO){

        memberService.update(memberId, memberDTO);

        return "redirect:/members/list";

    }
}
