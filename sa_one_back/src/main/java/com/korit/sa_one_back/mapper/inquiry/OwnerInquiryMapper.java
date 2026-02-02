package com.korit.sa_one_back.mapper.inquiry;

import com.korit.sa_one_back.dto.response.inquiry.OwnerInquiryDetailRespDto;
import com.korit.sa_one_back.dto.response.inquiry.OwnerInquiryListItemRespDto;
import com.korit.sa_one_back.entity.inquiry.InquiryCommentEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface OwnerInquiryMapper {

    // store_tb.user_id = ownerUserId (내 매장 검증)
    boolean existsOwnerStore(@Param("ownerUserId") Long ownerUserId,
                             @Param("storeId") Long storeId);

    // inquiry_tb.user_id = userId (내 문의 검증)
    boolean existsMyInquiry(@Param("userId") Long userId,
                            @Param("inquiryId") Long inquiryId);

    int countMyInquiries(@Param("userId") Long userId,
                         @Param("status") String status,
                         @Param("keyword") String keyword);

    List<OwnerInquiryListItemRespDto> findMyInquiryList(
            @Param("userId") Long userId,
            @Param("status") String status,
            @Param("keyword") String keyword,
            @Param("offset") int offset,
            @Param("size") int size
    );

    int insertInquiry(@Param("userId") Long userId,
                      @Param("storeId") Long storeId,
                      @Param("title") String title,
                      @Param("content") String content);

    OwnerInquiryDetailRespDto findDetail(@Param("inquiryId") Long inquiryId);

    List<InquiryCommentEntity> findComments(@Param("inquiryId") Long inquiryId);

    int insertComment(@Param("inquiryId") Long inquiryId,
                      @Param("userId") Long userId,
                      @Param("content") String content);
}