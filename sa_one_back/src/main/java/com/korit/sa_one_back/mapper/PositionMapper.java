package com.korit.sa_one_back.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface PositionMapper {
    Long findPositionIdByName(@Param("positionName") String positionName);
}
