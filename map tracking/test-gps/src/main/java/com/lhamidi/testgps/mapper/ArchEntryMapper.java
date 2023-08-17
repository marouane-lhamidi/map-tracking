package com.lhamidi.testgps.mapper;

import com.lhamidi.testgps.dto.ArchEntryResponse;
import com.lhamidi.testgps.model.ArchEntry;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ArchEntryMapper {
    @Mapping(source = "latitude", target = "position.lat")
    @Mapping(source = "longitude", target = "position.lan")
    ArchEntryResponse fromArchToResponse(ArchEntry archEntry);
}
