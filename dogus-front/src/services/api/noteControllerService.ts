import axiosService from "../../utils/axiosService";
import { CreateNoteDto } from "./model/createNoteDto";
import { UpdateNoteDto } from "./model/updateNoteDto";




export async function createNoteUsingPost(body: CreateNoteDto, token: string | null = null) : Promise<any > {
    const endpoint: string = "/notes/create";
    const method = "POST"
    const { data, error, loading } = await axiosService({ endpoint, method, body, token })
    const result = {
        data: data,
        error: error,
        loading: loading
    }
    return result;
}


export async function deleteNoteUsingDelete(body: string, token: string | null = null) : Promise<any> {
    const endpoint: string = `/notes/delete/${body}`
    const method = "DELETE"
    const { data, error, loading } = await axiosService({ endpoint, method, body, token })
    const result = {
        data: data,
        error: error,
        loading: loading
    }
    return result;
}

export async function updateNoteUsingPost(body: UpdateNoteDto, token: string | null = null): Promise<any> {
    const endpoint: string = `/notes/update/${body.userId}`;
    const method = "PATCH"
    const { data, error, loading } =await  axiosService({ endpoint, method, body, token })
    const result = {
        data: data,
        error: error,
        loading: loading
    }
    return result;
}
export async function getNotesUsingGet(userId: string |null , token: string | null = null) : Promise<any> {
    const endpoint: string = `/notes/all/${userId}`;
    const method = "GET"
    const { data, error, loading } = await axiosService({ endpoint, method, token })
    const result = {
        data: data,
        error: error,
        loading: loading
    }
    return result;
}

export async function getSingleNoteUsingGet(body: string, token: string | null = null) : Promise<any> {
    const endpoint: string = `/notes/${body}`
    const method = "GET"
    const { data, error, loading } = await axiosService({ endpoint, method, body, token })
    const result = {
        data: data,
        error: error,
        loading: loading
    }
    return result;
}




