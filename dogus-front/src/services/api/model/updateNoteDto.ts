import { NoteDto } from "./noteDto"




export interface UpdateNoteDto {
    userId: string | null | number;
    note: NoteDto
}