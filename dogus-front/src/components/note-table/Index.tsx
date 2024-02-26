import React, { useLayoutEffect, useState } from "react";
import {FaEdit , FaTrash} from "react-icons/fa"
import { NoteDto } from "../../services/api/model/noteDto";
import Swal from "sweetalert2"
import { deleteNoteUsingDelete, getNotesUsingGet } from "../../services/api/noteControllerService";
import StandardButton from "../standart-buton/Index";
import {FaPlus} from "react-icons/fa"





function NoteTable () : JSX.Element {



const handlerClickNotError = (field:string) => {
    console.log(field)
}

const [notes , setNotes] = useState<NoteDto[] |null>(null)


useLayoutEffect(() => {

  getNotesUsingGet("c123e7d8-3b97-43e8-84bf-7998e60cfac6").then((data) => {
    setNotes(data.data.content)
  }) 
} , [])


const deleteNoteEventHandler =(noteID: number , title : string ,  event: React.MouseEvent<HTMLTableCellElement>):void =>  {
   event.stopPropagation();

    const text = ` "<strong>${title}</strong>" başlıklı notu silmek istediğinize emin misiniz` 
   Swal.fire({
    title: "Emin misiniz?",
    html: text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Evet",
    cancelButtonText:"Vazgeç"
  }).then((result) => {
    if (result.isConfirmed) {
     const result =  deleteNoteUsingDelete(noteID)
    
     result.then((data) => {
      if(data.error) {
        console.log(data.error)
      }
     })
    }
  });

}





    return(
        <section className="dream-diary-container">
        <div className="col-10">
          <table className= {'table'}>
            <thead>
              <tr>
                <th>Başlık</th>
                <th>Not</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {notes?.map((note:NoteDto) => {
                return (
                  <tr className="pointer" key={note.id}>
                    <th
                      scope="row"
                      onClick={() => {handlerClickNotError("row")}}
                    >
                      {note.title.slice(0, 40) + "..."}
                    </th>
                    <td
                      onClick={() => {handlerClickNotError("note")}}
                      key={note.id}
                    >
                     {note.content}
                    </td>
      
                    <td   onClick={(event) => {deleteNoteEventHandler(note.id ,  note.title , event)}}>
                      <FaTrash/>
                    </td>
                    <td    onClick={() => {handlerClickNotError("edit")}}>
                      <FaEdit/>
                    </td>
                 
                  </tr>
                );
              })}
            </tbody>
          </table>
      
        </div>
      
      <div><StandardButton
      bg="green"
      color="white"
      size="xsmall"
      content={<FaPlus/>}
      onClickEventHandler={()=> console.log("selamlar")}
      /></div>
      </section>
    );
}

export default NoteTable;