import axiosService from "../../utils/axiosService";
import {CreateUserDto} from "./model/createUserDto";


export default async function createUserUsingPost(body:CreateUserDto | null , token :string|null= null ){
const endpoint:string = "/user/create";
const method = "POST"
const {data , error , loading} = await axiosService({endpoint , method ,  body , token  } )
const result = {
    data: data,
    error : error,
    loading : loading
 }  
 return result;
} 

    



