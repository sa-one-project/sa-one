package com.korit.sa_one_back.mapper.admin;

import com.korit.sa_one_back.entity.StoreApplicationEntity;
import com.korit.sa_one_back.entity.StoreEntity;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.data.repository.query.Param;

import java.util.List;

@Mapper
public interface AdminStoreApplicationMapper {

    int countByStatus(@Param("status") String status);

    List<StoreApplicationEntity> findByStatus(
            @Param("status") String status,
            @Param("offset") int offset,
            @Param("size") int size
    );

    StoreApplicationEntity findById(@Param("id") Long id);

    int updateApproved(@Param("id") Long id);

    int updateRejected(@Param("id") Long id, @Param("reason") String reason);

    int insertStore(StoreEntity store);

    int insertStoreBusinessInfo(@Param("storeId") Long storeId);
}
