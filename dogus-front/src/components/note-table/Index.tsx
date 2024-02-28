import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa"
import { NoteDto } from "../../services/api/model/noteDto";
import Swal, { SweetAlertResult } from "sweetalert2"
import { createNoteUsingPost, deleteNoteUsingDelete, getNotesUsingGet, getSingleNoteUsingGet, updateNoteUsingPost } from "../../services/api/noteControllerService";
import StandardButton from "../standart-buton/Index";
import { FaPlus } from "react-icons/fa"
import { CreateNoteDto } from "../../services/api/model/createNoteDto";
import { getAuthUser } from "../../utils/authService/Index";
import { UpdateNoteDto } from "../../services/api/model/updateNoteDto";
import Spinner from "../spinner";





function NoteTable(): JSX.Element {

  const [notes, setNotes] = useState<NoteDto[] | null>(null)
  const [loading, setLoading] = useState(true);


  useEffect(():void => {
    getNotes();
  }, [])


  const getNotes = (): void => {
    getNotesUsingGet(getAuthUser()).then((data): any => {
      if (data.data) {
        setLoading(data.data.loading)
        setNotes(data.data.content)
      }
    })
  }

  const deleteNoteEventHandler = (noteID: string, title: string, event: any): void => {
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
      cancelButtonText: "Vazgeç"
    }).then((result) => {
      if (result.isConfirmed) {
        const result = deleteNoteUsingDelete(noteID)

        result.then((data) => {
          if (data.error) {
            console.log(data.error)
          } else {
            getNotes();
          }
        })
      }
    });

  }

  const addNoteButtonEventHandler = (): void => {


    Swal.fire<any>({
      title: 'Yeni Not Ekle',
      html:
        '<input  id= "swal-input1" class="swal2-input" placeholder="Başlık">' +
        '<textarea  id= "swal-input2" class="swal2-textarea" placeholder="Not Ekleyin..."></textarea>',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Ekle",
      cancelButtonText: "Vazgeç",
      customClass: {
        popup: "create-note-swal-popup",
        confirmButton: "create-note-swal-confirm-button",
        title: "create-note-swal-title",
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
    }).then((result : SweetAlertResult<any>) => {
      if (result.value) {
        const createNoteReqObject: CreateNoteDto = {
          userId: getAuthUser() as string,
          title: result.value.title,
          content: result.value.content
        }

        createNoteUsingPost(createNoteReqObject).then((data) => {
          if (data.error) {
            Swal.fire({
              title: "Error!",
              text: "Unknown error accured",
              icon: "error"
            })
          } else {
            getNotes()
          }
        })
      }
    });


  }

  const editContent = (id: string) => {

    getSingleNoteUsingGet(id).then((data) => {
      Swal.fire<any>({
        title: "Update",
        html:
          ` <input value= "${data.data.title}"  id= "swal-input1" class="swal2-input" placeholder="Title"> ` +
          `<textarea  id= "swal-input2" class="swal2-textarea" placeholder="Update Note"> ${data.data.content}</textarea>`,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Update",
        cancelButtonText: "Cancel",
        customClass: {
          popup: "create-note-swal-popup",
          confirmButton: "create-note-swal-confirm-button",
          title: "create-note-swal-title",
        },
        preConfirm: () => {
          let title = (document.getElementById('swal-input1') as HTMLInputElement).value as string;
          let content = (document.getElementById('swal-input2') as HTMLInputElement).value as string;
          if (!title || !content) {
            Swal.showValidationMessage('Başlık ve içerik alanları gereklidir');
            return false;
          }
          return { title: title, content: content };
        }
      }).then((result : SweetAlertResult<any>) => {
        if (result.value) {
          const updateNoteObject: UpdateNoteDto = {
            id: id,
            title: result.value.title,
            content: result.value.content,
            userId: getAuthUser() as string,
          }

          updateNoteUsingPost(updateNoteObject).then((data) => {
            if (data.error) {
              console.log(data)
              Swal.fire({
                title: "Error!",
                text: "Unknown error accured",
                icon: "error"
              })
            } else {
              getNotes()
            }
          })
        }
      });

    })


  }


  return (
    <>
      {
        loading ? <Spinner/> : <section className="list-container">
          <div className="col-8">
            <table className={'table'}>
              <thead>
                <tr>
                  <th>Başlık</th>
                  <th>Not</th>
                  <th>
                    <div className="create-note-button-wrapper"><StandardButton
                      bg="green"
                      color="white"
                      size="xsmall"
                      content={<FaPlus />}
                      onClickEventHandler={addNoteButtonEventHandler}
                    /></div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {notes?.map((note: NoteDto) => {
                  return (
                    <tr className="pointer" key={note.id}>
                      <th
                        scope="row"
                      >
                        {note.title.slice(0, 40)}
                      </th>
                      <td
                        key={note.id}
                      >
                        {note.content}
                      </td>

                      <td>
                        <div className="list-table-icons-wrapper">
                          <FaTrash onClick={(event) => { deleteNoteEventHandler(note.id, note.title, event) }} />
                          <FaEdit onClick={() => { editContent(note.id) }} />
                        </div>

                      </td>



                    </tr>
                  );
                })}
              </tbody>
            </table>

          </div>
        </section>
      }
    </>
  );
}

export default NoteTable;