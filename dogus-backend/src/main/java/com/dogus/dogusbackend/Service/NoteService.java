package com.dogus.dogusbackend.Service;


import com.dogus.dogusbackend.Dto.NoteDto;
import com.dogus.dogusbackend.Entity.NoteEntity;
import com.dogus.dogusbackend.Repository.NoteRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import java.util.UUID;

@Service
@RequiredArgsConstructor
public class NoteService {

    private final NoteRepository noteRepository;

    public Page<NoteDto> getNotes(Pageable pageable){
        Page<NoteEntity> noteEntities = noteRepository.findAll(pageable);
        return noteEntities.map(noteEntity -> new ModelMapper().map(noteEntity, NoteDto.class));
    }

    public NoteDto getNote(String id){
        NoteEntity noteEntity = noteRepository.findById(UUID.fromString(id)).orElseThrow();
        return new ModelMapper().map(noteEntity, NoteDto.class);
    }

    public NoteDto createNote(NoteDto noteDto){
        NoteEntity noteEntity = noteRepository.save(new ModelMapper().map(noteDto, NoteEntity.class));
        return  new ModelMapper().map(noteEntity, NoteDto.class);
    }

    public Boolean deleteNote(String id){

        NoteEntity noteEntity = noteRepository.findById(UUID.fromString(id)).orElseThrow();
        noteRepository.delete(noteEntity);
        return true;
    }

    public NoteDto updateNote(String id, NoteDto noteDto){
        NoteEntity noteEntity = noteRepository.findById(UUID.fromString(id)).orElseThrow();
        noteEntity.setTitle(noteDto.getTitle());
        noteEntity.setContent(noteDto.getContent());
        return  new ModelMapper().map(noteRepository.save(noteEntity), NoteDto.class);
    }

}
