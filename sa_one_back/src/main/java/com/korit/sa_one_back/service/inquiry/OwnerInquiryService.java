package com.korit.sa_one_back.service.inquiry;

import com.korit.sa_one_back.dto.request.inquiry.InquiryCreateReqDto;
import com.korit.sa_one_back.dto.response.admin.PageRespDto;
import com.korit.sa_one_back.dto.response.inquiry.OwnerInquiryDetailRespDto;
import com.korit.sa_one_back.dto.response.inquiry.OwnerInquiryListItemRespDto;
import com.korit.sa_one_back.entity.inquiry.InquiryCommentEntity;
import com.korit.sa_one_back.mapper.inquiry.OwnerInquiryMapper;
import com.korit.sa_one_back.util.PageParam;
import com.korit.sa_one_back.util.PageUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OwnerInquiryService {

    private final OwnerInquiryMapper ownerInquiryMapper;

    public PageRespDto<OwnerInquiryListItemRespDto> list(
            Long ownerUserId, String status, String keyword, Integer page, Integer size
    ) {
        String resolvedStatus = (status == null || status.isBlank()) ? "OPEN" : status;
        PageParam pageParam = PageUtil.resolve(page, size);

        int total = ownerInquiryMapper.countMyInquiries(ownerUserId, resolvedStatus, keyword);
        List<OwnerInquiryListItemRespDto> items =
                ownerInquiryMapper.findMyInquiryList(ownerUserId, resolvedStatus, keyword,
                        pageParam.getOffset(), pageParam.getSize());

        return PageRespDto.<OwnerInquiryListItemRespDto>builder()
                .items(items)
                .page(pageParam.getPage())
                .size(pageParam.getSize())
                .total(total)
                .build();
    }

    @Transactional
    public void create(Long ownerUserId, InquiryCreateReqDto dto) {
        if (dto.getTitle() == null || dto.getTitle().isBlank()) {
            throw new IllegalArgumentException("제목이 비어있습니다.");
        }
        if (dto.getContent() == null || dto.getContent().isBlank()) {
            throw new IllegalArgumentException("내용이 비어있습니다.");
        }

        // storeId가 있으면: 내 매장인지 검증
        if (dto.getStoreId() != null) {
            boolean ok = ownerInquiryMapper.existsOwnerStore(ownerUserId, dto.getStoreId());
            if (!ok) throw new IllegalArgumentException("본인 매장이 아닙니다.");
        }

        ownerInquiryMapper.insertInquiry(ownerUserId, dto.getStoreId(), dto.getTitle(), dto.getContent());
    }

    public OwnerInquiryDetailRespDto detail(Long ownerUserId, Long inquiryId) {
        boolean mine = ownerInquiryMapper.existsMyInquiry(ownerUserId, inquiryId);
        if (!mine) throw new IllegalArgumentException("조회 권한이 없습니다.");

        OwnerInquiryDetailRespDto detail = ownerInquiryMapper.findDetail(inquiryId);
        if (detail == null) throw new IllegalArgumentException("문의가 존재하지 않습니다.");

        List<InquiryCommentEntity> comments = ownerInquiryMapper.findComments(inquiryId);
        detail.setComments(comments);
        return detail;
    }

    @Transactional
    public void addComment(Long ownerUserId, Long inquiryId, String content) {
        if (content == null || content.isBlank()) {
            throw new IllegalArgumentException("댓글 내용이 비어있습니다.");
        }

        boolean mine = ownerInquiryMapper.existsMyInquiry(ownerUserId, inquiryId);
        if (!mine) throw new IllegalArgumentException("댓글 권한이 없습니다.");

        ownerInquiryMapper.insertComment(inquiryId, ownerUserId, content);
    }
}