import { NoteDto } from "./noteDto"




export interface UpdateNoteDto {
    id: string;
    userId: string;
    title : string;
    content: string;
}