package com.korit.sa_one_back.mapper.admin;

import com.korit.sa_one_back.dto.response.admin.AdminInquiryDetailRespDto;
import com.korit.sa_one_back.dto.response.admin.AdminInquiryListItemRespDto;
import com.korit.sa_one_back.entity.inquiry.InquiryCommentEntity;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.data.repository.query.Param;

import java.util.List;

@Mapper
public interface AdminInquiryMapper {

    int count(@Param("status") String status,
              @Param("keyword") String keyword);

    List<AdminInquiryListItemRespDto> findList(
            @Param("status") String status,
            @Param("keyword") String keyword,
            @Param("offset") int offset,
            @Param("size") int size
    );

    AdminInquiryDetailRespDto findDetail(@Param("id") Long id);

    List<InquiryCommentEntity> findComments(@Param("inquiryId") Long inquiryId);

    int updateStatus(@Param("id") Long id,
                     @Param("status") String status);

    int insertComment(@Param("inquiryId") Long inquiryId,
                      @Param("userId") Long userId,
                      @Param("content") String content);
}