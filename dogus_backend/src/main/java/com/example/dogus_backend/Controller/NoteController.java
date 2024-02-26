package com.example.dogus_backend.Controller;


import com.example.dogus_backend.Dto.NoteDto;
import com.example.dogus_backend.Service.NoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RequiredArgsConstructor
@RequestMapping(value = "/notes")
@Controller
public class NoteController {
    private final NoteService noteService;

    @GetMapping("/all/{userId}")
    public ResponseEntity<Page<NoteDto>> getNotes(@PathVariable UUID userId, Pageable pageable) {
        try {
            return ResponseEntity.ok(noteService.getNotes(userId, pageable));
        }
        catch(Exception validationException) {
            validationException.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<NoteDto> getNote(@PathVariable String id) {
        try {
            return ResponseEntity.ok(noteService.getNote(id));
        }
        catch(Exception validationException) {
            validationException.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<NoteDto> createNote(NoteDto noteDto) {
        try {
            return ResponseEntity.ok(noteService.createNote(noteDto));
        }
        catch(Exception validationException) {
            validationException.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Boolean> deleteNote(@PathVariable String id) {
        try {
            return ResponseEntity.ok(noteService.deleteNote(id));
        }
        catch(Exception validationException) {
            validationException.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PatchMapping("/update/{id}")
    public ResponseEntity<NoteDto> updateNote(@PathVariable String id,
                                              @RequestBody NoteDto noteDto) {
        try {
            return ResponseEntity.ok(noteService.updateNote(id, noteDto));
        }
        catch(Exception validationException) {
            validationException.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


}

