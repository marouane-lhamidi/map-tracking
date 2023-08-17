package com.lhamidi.testgps.model;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
@Entity
@Table(name = "arch_1004901")
@Getter @Setter @AllArgsConstructor @NoArgsConstructor @Builder @IdClass(ArchEntryId.class)
public class ArchEntry {
    @Id
    @Column(name = "date")
    private Date date;

    @Id
    @Column(name = "id_device")
    private int idDevice;

    @Column(name = "speed", nullable = false)
    private int speed;

    @Column(name = "fuel", nullable = false)
    private int fuel;

    @Column(name = "temp", nullable = false, length = 5)
    private String temp;

    @Column(name = "X", nullable = false)
    private int x;

    @Column(name = "Y", nullable = false)
    private int y;

    @Column(name = "Z", nullable = false)
    private int z;

    @Column(name = "ignition", nullable = false)
    private int ignition;

    @Column(name = "rpm", nullable = false, columnDefinition = "integer default 0")
    private int rpm;

    @Column(name = "fuel_rate", nullable = false, columnDefinition = "double precision default 0")
    private double fuelRate;

    @Column(name = "tfu", nullable = false, columnDefinition = "double precision default 0")
    private double tfu;

    @Column(name = "odo", nullable = false, columnDefinition = "double precision default 0")
    private double odo;

    @Column(name = "satinview", nullable = false, columnDefinition = "integer default 0")
    private int satInView;

    @Column(name = "signal", nullable = false, columnDefinition = "integer default 0")
    private int signal;

    @Column(name = "heading", nullable = false)
    private int heading;

    @Column(name = "charger", nullable = false)
    private int charger;

    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "longitude")
    private Double longitude;

    @Column(name = "state")
    private Integer state;

    @Column(name = "tram_id")
    private Integer tramId;

    @Column(name = "validity")
    private Integer validity;

    @Column(name = "temp_engine")
    private Integer tempEngine;

    @Column(name = "accum_odo")
    private Float accumOdo;

    @Column(name = "do1")
    private Integer do1;

    @Column(name = "do2")
    private Integer do2;

    @Column(name = "do3")
    private Integer do3;

    @Column(name = "do4")
    private Integer do4;

    @Column(name = "di1")
    private Integer di1;

    @Column(name = "di2")
    private Integer di2;

    @Column(name = "di3")
    private Integer di3;

    @Column(name = "di4")
    private Integer di4;

    @Column(name = "an1")
    private Integer an1;

    @Column(name = "an2")
    private Integer an2;

    @Column(name = "an3")
    private Integer an3;

    @Column(name = "an4")
    private Integer an4;

}