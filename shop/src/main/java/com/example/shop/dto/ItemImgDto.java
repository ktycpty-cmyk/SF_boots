package com.example.shop.dto;

import com.example.shop.entity.ItemImg;
import lombok.*;
import org.modelmapper.ModelMapper;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ItemImgDto {

    private Long id;

    private String imgName;
    private String oriImgName;
    private String imgUrl;
    private String repimgYn;

    private static ModelMapper modelMapper = new ModelMapper();

    public static ItemImgDto of(ItemImg itemImg){
        return modelMapper.map(itemImg, ItemImgDto.class);
    }
}
