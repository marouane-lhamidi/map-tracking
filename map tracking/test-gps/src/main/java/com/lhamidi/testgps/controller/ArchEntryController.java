package com.lhamidi.testgps.controller;

import com.lhamidi.testgps.dto.ArchEntryResponse;
import com.lhamidi.testgps.service.archEntryService.ArchEntryService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController @AllArgsConstructor
@CrossOrigin("*")
public class ArchEntryController {
    ArchEntryService service;

    @GetMapping(path = "/getArchEntries")
    public List<ArchEntryResponse> getArchEntries(){
        return service.getArchEntries();
    }
}
