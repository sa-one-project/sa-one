package com.korit.sa_one_back.controller.admin;

import com.korit.sa_one_back.dto.request.admin.AdminInquiryListReqDto;
import com.korit.sa_one_back.dto.request.admin.InquiryCommentReqDto;
import com.korit.sa_one_back.dto.request.admin.InquiryStatusUpdateReqDto;
import com.korit.sa_one_back.dto.response.admin.AdminInquiryDetailRespDto;
import com.korit.sa_one_back.dto.response.admin.AdminInquiryListItemRespDto;
import com.korit.sa_one_back.dto.response.admin.PageRespDto;
import com.korit.sa_one_back.security.PrincipalUser;
import com.korit.sa_one_back.service.admin.AdminInquiryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/inquiries")
public class AdminInquiryController {

    private final AdminInquiryService adminInquiryService;

    @GetMapping
    public ResponseEntity<PageRespDto<AdminInquiryListItemRespDto>> list(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size
    ) {
        AdminInquiryListReqDto dto = AdminInquiryListReqDto.builder()
                .status(status)
                .keyword(keyword)
                .page(page)
                .size(size)
                .build();

        return ResponseEntity.ok(adminInquiryService.list(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdminInquiryDetailRespDto> detail(@PathVariable Long id) {
        return ResponseEntity.ok(adminInquiryService.detail(id));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> updateStatus(
            @PathVariable Long id,
            @RequestBody InquiryStatusUpdateReqDto dto
    ) {
        adminInquiryService.updateStatus(id, dto.getStatus());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/comments")
    public ResponseEntity<Void> addComment(
            @PathVariable Long id,
            @RequestBody InquiryCommentReqDto dto,
            @AuthenticationPrincipal PrincipalUser principalUser
    ) {
        Long adminUserId = principalUser.getUserId();

        adminInquiryService.addComment(id, adminUserId, dto.getContent());
        return ResponseEntity.ok().build();
    }
}
