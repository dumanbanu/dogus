import {NoteDto} from "./noteDto"


export interface CreateNoteDto {
    userId: number;
    note : NoteDto
}