package com.korit.sa_one_back.service.admin;

import com.korit.sa_one_back.dto.request.admin.AdminStoreListReqDto;
import com.korit.sa_one_back.dto.response.admin.AdminStoreDetailRespDto;
import com.korit.sa_one_back.dto.response.admin.AdminStoreListItemRespDto;
import com.korit.sa_one_back.dto.response.admin.PageRespDto;
import com.korit.sa_one_back.mapper.admin.AdminStoreMapper;
import com.korit.sa_one_back.util.PageParam;
import com.korit.sa_one_back.util.PageUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminStoreService {

    private final AdminStoreMapper adminStoreMapper;

    public PageRespDto<AdminStoreListItemRespDto> list(AdminStoreListReqDto dto) {
        PageParam pageParam = PageUtil.resolve(dto.getPage(), dto.getSize());

        int page = pageParam.getPage();
        int size = pageParam.getSize();
        int offset = pageParam.getOffset();

        String keyword = (dto.getKeyword() == null || dto.getKeyword().isBlank())
                ? null
                : dto.getKeyword().trim();

        int total = adminStoreMapper.countStores(keyword);
        List<AdminStoreListItemRespDto> items = adminStoreMapper.findStores(keyword, offset, size);

        return PageRespDto.<AdminStoreListItemRespDto>builder()
                .items(items)
                .page(page)
                .size(size)
                .total(total)
                .build();
    }

    public AdminStoreDetailRespDto detail(Long storeId) {
        AdminStoreDetailRespDto dto = adminStoreMapper.findStoreDetail(storeId);
        if (dto == null) throw new IllegalArgumentException("매장을 찾을 수 없습니다.");
        return dto;
    }
}