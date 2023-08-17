package com.lhamidi.testgps.dto;

import lombok.*;

@Getter @Setter @AllArgsConstructor @NoArgsConstructor @Builder
public class PositionResponse {
    private double lat;
    private double lan;
}
