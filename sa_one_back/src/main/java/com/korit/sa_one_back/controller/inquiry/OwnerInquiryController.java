package com.korit.sa_one_back.controller.inquiry;

import com.korit.sa_one_back.dto.request.inquiry.InquiryCommentReqDto;
import com.korit.sa_one_back.dto.request.inquiry.InquiryCreateReqDto;
import com.korit.sa_one_back.dto.response.admin.PageRespDto;
import com.korit.sa_one_back.dto.response.inquiry.OwnerInquiryDetailRespDto;
import com.korit.sa_one_back.dto.response.inquiry.OwnerInquiryListItemRespDto;
import com.korit.sa_one_back.security.PrincipalUser;
import com.korit.sa_one_back.service.inquiry.OwnerInquiryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/owner/inquiries")
public class OwnerInquiryController {

    private final OwnerInquiryService ownerInquiryService;

    // 문의 목록
    @GetMapping
    public ResponseEntity<PageRespDto<OwnerInquiryListItemRespDto>> list(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size,
            @AuthenticationPrincipal PrincipalUser principalUser
    ) {
        return ResponseEntity.ok(
                ownerInquiryService.list(principalUser.getUserId(), status, keyword, page, size)
        );
    }

    // 문의 작성
    @PostMapping
    public ResponseEntity<Void> create(
            @RequestBody InquiryCreateReqDto dto,
            @AuthenticationPrincipal PrincipalUser principalUser
    ) {
        ownerInquiryService.create(principalUser.getUserId(), dto);
        return ResponseEntity.ok().build();
    }

    // 문의 상세 + 댓글
    @GetMapping("/{id}")
    public ResponseEntity<OwnerInquiryDetailRespDto> detail(
            @PathVariable Long id,
            @AuthenticationPrincipal PrincipalUser principalUser
    ) {
        return ResponseEntity.ok(ownerInquiryService.detail(principalUser.getUserId(), id));
    }

    // 내 문의에 댓글로 추가 작성
    @PostMapping("/{id}/comments")
    public ResponseEntity<Void> addComment(
            @PathVariable Long id,
            @RequestBody InquiryCommentReqDto dto,
            @AuthenticationPrincipal PrincipalUser principalUser
    ) {
        ownerInquiryService.addComment(principalUser.getUserId(), id, dto.getContent());
        return ResponseEntity.ok().build();
    }
}