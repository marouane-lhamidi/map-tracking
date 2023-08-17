package com.lhamidi.testgps.repository;

import com.lhamidi.testgps.model.ArchEntry;
import com.lhamidi.testgps.model.ArchEntryId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface ArchEntryRepository extends JpaRepository<ArchEntry, ArchEntryId> {
 }