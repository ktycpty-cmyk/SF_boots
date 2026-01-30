package com.example.shop.service;

import com.example.shop.dto.CartItemDto;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Log4j2
class CartServiceTest {

    @Autowired
    private CartService cartService;

    @Test
    @DisplayName("카트 상품 목록")
    public void cartTest(){

        CartItemDto cartItemDto = new CartItemDto();
        cartItemDto.setItemId(126L);
        cartItemDto.setCount(2);
        String email = "jinu@naver.com";

        Long result = cartService.addCart(cartItemDto, email);

        assertEquals(1, result);
    }
}