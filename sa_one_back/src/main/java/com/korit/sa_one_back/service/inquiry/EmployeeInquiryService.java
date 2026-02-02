package com.korit.sa_one_back.service.inquiry;

import com.korit.sa_one_back.dto.request.inquiry.InquiryCreateReqDto;
import com.korit.sa_one_back.dto.response.admin.PageRespDto;
import com.korit.sa_one_back.dto.response.inquiry.EmployeeInquiryDetailRespDto;
import com.korit.sa_one_back.dto.response.inquiry.EmployeeInquiryListItemRespDto;
import com.korit.sa_one_back.entity.inquiry.InquiryCommentEntity;
import com.korit.sa_one_back.mapper.inquiry.EmployeeInquiryMapper;
import com.korit.sa_one_back.util.PageParam;
import com.korit.sa_one_back.util.PageUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeInquiryService {

    private final EmployeeInquiryMapper employeeInquiryMapper;

    public PageRespDto<EmployeeInquiryListItemRespDto> list(
            Long userId, String status, String keyword, Integer page, Integer size
    ) {
        String resolvedStatus = (status == null || status.isBlank()) ? "OPEN" : status;
        PageParam pageParam = PageUtil.resolve(page, size);

        int total = employeeInquiryMapper.countMyInquiries(userId, resolvedStatus, keyword);
        List<EmployeeInquiryListItemRespDto> items =
                employeeInquiryMapper.findMyInquiryList(userId, resolvedStatus, keyword,
                        pageParam.getOffset(), pageParam.getSize());

        return PageRespDto.<EmployeeInquiryListItemRespDto>builder()
                .items(items)
                .page(pageParam.getPage())
                .size(pageParam.getSize())
                .total(total)
                .build();
    }

    @Transactional
    public void create(Long userId, InquiryCreateReqDto dto) {
        if (dto.getTitle() == null || dto.getTitle().isBlank()) {
            throw new IllegalArgumentException("제목이 비어있습니다.");
        }
        if (dto.getContent() == null || dto.getContent().isBlank()) {
            throw new IllegalArgumentException("내용이 비어있습니다.");
        }

        // storeId가 있으면: 해당 매장 소속 직원인지 검증
        if (dto.getStoreId() != null) {
            boolean ok = employeeInquiryMapper.existsEmployeeInStore(userId, dto.getStoreId());
            if (!ok) throw new IllegalArgumentException("해당 매장 소속 직원이 아닙니다.");
        }

        employeeInquiryMapper.insertInquiry(userId, dto.getStoreId(), dto.getTitle(), dto.getContent());
    }

    public EmployeeInquiryDetailRespDto detail(Long userId, Long inquiryId) {
        boolean mine = employeeInquiryMapper.existsMyInquiry(userId, inquiryId);
        if (!mine) throw new IllegalArgumentException("조회 권한이 없습니다.");

        EmployeeInquiryDetailRespDto detail = employeeInquiryMapper.findDetail(inquiryId);
        if (detail == null) throw new IllegalArgumentException("문의가 존재하지 않습니다.");

        List<InquiryCommentEntity> comments = employeeInquiryMapper.findComments(inquiryId);
        detail.setComments(comments);
        return detail;
    }

    @Transactional
    public void addComment(Long userId, Long inquiryId, String content) {
        if (content == null || content.isBlank()) {
            throw new IllegalArgumentException("댓글 내용이 비어있습니다.");
        }

        boolean mine = employeeInquiryMapper.existsMyInquiry(userId, inquiryId);
        if (!mine) throw new IllegalArgumentException("댓글 권한이 없습니다.");

        employeeInquiryMapper.insertComment(inquiryId, userId, content);
    }
}