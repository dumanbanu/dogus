import {NoteDto} from "./noteDto"


export interface CreateNoteDto {
    userId: string;
    title : string;
    content: string;
}