package com.korit.sa_one_back.mapper.inquiry;

import com.korit.sa_one_back.dto.response.inquiry.EmployeeInquiryDetailRespDto;
import com.korit.sa_one_back.dto.response.inquiry.EmployeeInquiryListItemRespDto;
import com.korit.sa_one_back.entity.inquiry.InquiryCommentEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface EmployeeInquiryMapper {

    // store_employee_tb에 존재하는지 (매장 소속 검증)
    boolean existsEmployeeInStore(@Param("userId") Long userId,
                                  @Param("storeId") Long storeId);

    // 내 문의인지 검증
    boolean existsMyInquiry(@Param("userId") Long userId,
                            @Param("inquiryId") Long inquiryId);

    int countMyInquiries(@Param("userId") Long userId,
                         @Param("status") String status,
                         @Param("keyword") String keyword);

    List<EmployeeInquiryListItemRespDto> findMyInquiryList(
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

    EmployeeInquiryDetailRespDto findDetail(@Param("inquiryId") Long inquiryId);

    List<InquiryCommentEntity> findComments(@Param("inquiryId") Long inquiryId);

    int insertComment(@Param("inquiryId") Long inquiryId,
                      @Param("userId") Long userId,
                      @Param("content") String content);
}