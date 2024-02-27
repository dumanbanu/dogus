import React, { useEffect, useState } from "react";
import {FaEdit , FaTrash} from "react-icons/fa"
import { NoteDto } from "../../services/api/model/noteDto";
import Swal from "sweetalert2"
import { createNoteUsingPost, deleteNoteUsingDelete, getNotesUsingGet } from "../../services/api/noteControllerService";
import StandardButton from "../standart-buton/Index";
import {FaPlus} from "react-icons/fa"
import { CreateNoteDto } from "../../services/api/model/createNoteDto";





function NoteTable () : JSX.Element {



const handlerClickNotError = (field:string) => {
    console.log(field)
}

const [notes , setNotes] = useState<NoteDto[] |null>(null)


useEffect(() => {

  getNotesUsingGet("c123e7d8-3b97-43e8-84bf-7998e60cfac6").then((data) => {
    setNotes(data.data.content)
  }) 
} , [])


const deleteNoteEventHandler =(noteID: string , title : string ,  event: React.MouseEvent<HTMLTableCellElement>):void =>  {
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
     const result =  deleteNoteUsingDelete(noteID )
    
     result.then((data) => {
      if(data.error) {
        console.log(data.error)
      }
     })
    }
  });

}

const addNoteButtonEventHandler = ():void => {


  Swal.fire({
    title: 'Yeni Not Ekle',
    html:
      '<input  id= "swal-input1" class="swal2-input" placeholder="Başlık">' +
      '<textarea  id= "swal-input2" class="swal2-textarea" placeholder="Not Ekleyin..."></textarea>',
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText : "Ekle",
    cancelButtonText : "Vazgeç",
    customClass : {
      popup : "create-note-swal-popup",
      confirmButton :"create-note-swal-confirm-button",
      title : "create-note-swal-title",
    },
    preConfirm: () => {
      const title = (document.getElementById('swal-input1') as HTMLInputElement).value;
      const content = (document.getElementById('swal-input2') as HTMLInputElement).value;
      if (!title || !content) {
        Swal.showValidationMessage('Başlık ve içerik alanları gereklidir');
        return false;
      }
      return { title: title, content: content };
    }
  }).then((result) => {
    if (result.value) {
      const defaultUserID: string = "c123e7d8-3b97-43e8-84bf-7998e60cfac6"
      const createNoteReqObject : CreateNoteDto =  {
        userId :defaultUserID,
        title : result.value.title,
        content: result.value.content
      }

      createNoteUsingPost(createNoteReqObject).then((data) => {
        console.log(data)
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
                <th>      
      <StandardButton
      bg="green"
      color="white"
      size="xsmall"
      content={<FaPlus/>}
      onClickEventHandler={addNoteButtonEventHandler}
      /></th>
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
                      {note.title.slice(0, 40)}
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
      </section>
    );
}

export default NoteTable;