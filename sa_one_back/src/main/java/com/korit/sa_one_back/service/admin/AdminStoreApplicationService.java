package com.korit.sa_one_back.service.admin;

import com.korit.sa_one_back.dto.request.admin.StoreApplicationListReqDto;
import com.korit.sa_one_back.dto.response.admin.PageRespDto;
import com.korit.sa_one_back.entity.StoreApplicationEntity;
import com.korit.sa_one_back.entity.StoreEntity;
import com.korit.sa_one_back.mapper.admin.AdminStoreApplicationMapper;
import com.korit.sa_one_back.util.PageParam;
import com.korit.sa_one_back.util.PageUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminStoreApplicationService {

    private final AdminStoreApplicationMapper adminStoreApplicationMapper;

    public PageRespDto<StoreApplicationEntity> list(StoreApplicationListReqDto dto) {
        String status = (dto.getStatus() == null || dto.getStatus().isBlank()) ? "PENDING" : dto.getStatus();

        PageParam pageParam = PageUtil.resolve(dto.getPage(), dto.getSize());

        int page = pageParam.getPage();
        int size = pageParam.getSize();
        int offset = pageParam.getOffset();

        int total = adminStoreApplicationMapper.countByStatus(status);
        List<StoreApplicationEntity> items = adminStoreApplicationMapper.findByStatus(status, offset, size);

        return PageRespDto.<StoreApplicationEntity>builder()
                .items(items)
                .page(page)
                .size(size)
                .total(total)
                .build();
    }

    public StoreApplicationEntity detail(Long id) {
        StoreApplicationEntity app = adminStoreApplicationMapper.findById(id);
        if (app == null) throw new IllegalArgumentException("신청 내역을 찾을 수 없습니다.");
        return app;
    }

    @Transactional
    public void approve(Long id) {
        StoreApplicationEntity app = detail(id);

        if (!"PENDING".equalsIgnoreCase(app.getStatus())) {
            throw new IllegalStateException("이미 처리된 신청입니다.");
        }

        StoreEntity store = StoreEntity.builder()
                .storeName(app.getStoreName())
                .address(app.getAddress())
                .businessNumber(app.getBusinessNumber())
                .ownerName(app.getOwnerName())
                .storePhone(app.getStorePhone())
                .userId(app.getUserId())
                .build();

        adminStoreApplicationMapper.insertStore(store);

        adminStoreApplicationMapper.insertStoreBusinessInfo(store.getStoreId());

        adminStoreApplicationMapper.updateApproved(id);
    }

    @Transactional
    public void reject(Long id, String reason) {
        StoreApplicationEntity app = detail(id);

        if (!"PENDING".equalsIgnoreCase(app.getStatus())) {
            throw new IllegalStateException("이미 처리된 신청입니다.");
        }

        if (reason == null || reason.isBlank()) {
            throw new IllegalArgumentException("반려 사유가 필요합니다.");
        }

        adminStoreApplicationMapper.updateRejected(id, reason);
    }
}