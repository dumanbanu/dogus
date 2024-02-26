package com.example.dogus_backend.Dto;

import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Data
@RequiredArgsConstructor
@Getter
@Setter
public class NoteDto {

    private UUID id;
    private String content;
    private String title;
}
