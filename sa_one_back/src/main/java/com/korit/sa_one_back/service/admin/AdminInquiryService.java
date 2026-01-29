package com.korit.sa_one_back.service.admin;

import com.korit.sa_one_back.dto.request.admin.AdminInquiryListReqDto;
import com.korit.sa_one_back.dto.response.admin.AdminInquiryDetailRespDto;
import com.korit.sa_one_back.dto.response.admin.AdminInquiryListItemRespDto;
import com.korit.sa_one_back.dto.response.admin.PageRespDto;
import com.korit.sa_one_back.entity.inquiry.InquiryCommentEntity;
import com.korit.sa_one_back.mapper.admin.AdminInquiryMapper;
import com.korit.sa_one_back.util.PageParam;
import com.korit.sa_one_back.util.PageUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminInquiryService {

    private final AdminInquiryMapper adminInquiryMapper;

    public PageRespDto<AdminInquiryListItemRespDto> list(AdminInquiryListReqDto dto) {

        String status = (dto.getStatus() == null || dto.getStatus().isBlank())
                ? "OPEN"
                : dto.getStatus();

        PageParam pageParam = PageUtil.resolve(dto.getPage(), dto.getSize());

        int total = adminInquiryMapper.count(status, dto.getKeyword());
        List<AdminInquiryListItemRespDto> items =
                adminInquiryMapper.findList(status, dto.getKeyword(),
                        pageParam.getOffset(), pageParam.getSize());

        return PageRespDto.<AdminInquiryListItemRespDto>builder()
                .items(items)
                .page(pageParam.getPage())
                .size(pageParam.getSize())
                .total(total)
                .build();
    }

    public AdminInquiryDetailRespDto detail(Long inquiryId) {
        AdminInquiryDetailRespDto detail = adminInquiryMapper.findDetail(inquiryId);
        if (detail == null) throw new IllegalArgumentException("문의가 존재하지 않습니다.");

        List<InquiryCommentEntity> comments =
                adminInquiryMapper.findComments(inquiryId);

        detail.setComments(comments);
        return detail;
    }

    @Transactional
    public void updateStatus(Long inquiryId, String status) {
        if (!List.of("OPEN", "IN_PROGRESS", "CLOSED").contains(status)) {
            throw new IllegalArgumentException("잘못된 상태값입니다.");
        }

        adminInquiryMapper.updateStatus(inquiryId, status);
    }

    @Transactional
    public void addComment(Long inquiryId, Long adminUserId, String content) {
        if (content == null || content.isBlank()) {
            throw new IllegalArgumentException("댓글 내용이 비어있습니다.");
        }

        adminInquiryMapper.insertComment(inquiryId, adminUserId, content);
    }
}
