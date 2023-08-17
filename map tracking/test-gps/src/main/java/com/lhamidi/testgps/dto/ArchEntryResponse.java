package com.lhamidi.testgps.dto;

import lombok.*;

@Getter @Setter @AllArgsConstructor @NoArgsConstructor @Builder
public class ArchEntryResponse {
    private PositionResponse position;
}
