package com.lhamidi.testgps.model;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import java.io.Serializable;
import java.util.Date;

@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class ArchEntryId implements Serializable {
    private Date date;
    private int idDevice;
}
