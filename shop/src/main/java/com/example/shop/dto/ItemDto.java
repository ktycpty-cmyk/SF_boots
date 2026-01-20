package com.example.shop.dto;


import com.example.shop.constant.ItemSellStatus;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ItemDto {


    private Long id;  //상품코드

    private String itemNm;  //상품 명

    private int price;  //가격

    private String itemDetail;  //상품 상세 설명

    private String sellStatCd;

    private LocalDateTime regTime; //등록 시간

    private LocalDateTime updateTime;  //수정 시간
}
