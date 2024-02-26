package com.example.dogus_backend.Repository;

import com.example.dogus_backend.Entity.NoteEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface NoteRepository extends JpaRepository<NoteEntity, UUID> {

    Page<NoteEntity> findAllByUserId(String uuid, Pageable pageable);
}
