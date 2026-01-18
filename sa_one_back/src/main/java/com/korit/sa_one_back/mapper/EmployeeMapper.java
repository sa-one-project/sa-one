package com.korit.sa_one_back.mapper;

import com.korit.sa_one_back.dto.response.EmployeeListRespDto;
import com.korit.sa_one_back.entity.StoreEmployeeEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDate;
import java.util.List;

@Mapper
public interface EmployeeMapper {
    boolean existsActiveEmployee(@Param("storeId") Long storeId,
                                 @Param("userId") Long userId);

    int insertStoreEmployee(StoreEmployeeEntity entity);

    List<EmployeeListRespDto> selectEmployees(@Param("storeId") Long storeId,
                                              @Param("today") LocalDate today);

    int countBelonging(@Param("storeId") Long storeId,
                       @Param("ids") List<Long> ids);

    int updateWorkStatus(@Param("storeEmployeeId") Long storeEmployeeId,
                         @Param("workStatus") String workStatus);
}
