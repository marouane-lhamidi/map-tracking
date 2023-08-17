package com.lhamidi.testgps.service;

import com.lhamidi.testgps.dto.ArchEntryResponse;
import com.lhamidi.testgps.mapper.ArchEntryMapper;
import com.lhamidi.testgps.repository.ArchEntryRepository;
import com.lhamidi.testgps.service.archEntryService.ArchEntryService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service @AllArgsConstructor
public class ArchEntryServiceImpl implements ArchEntryService {
    ArchEntryRepository repository;
    ArchEntryMapper mapper;

    @Override
    public List<ArchEntryResponse> getArchEntries() {
        return repository.findAll().stream().map(archEntry -> mapper.fromArchToResponse(archEntry)).toList();
    }
}
