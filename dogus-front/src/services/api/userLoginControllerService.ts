import axiosService from "../../utils/axiosService";
import { UserLoginDto} from "./model/userLoginDto";


export default async function loginUserUsingPost(body:UserLoginDto , token :string|null= null ){
const endpoint:string = "/login";
const method = "POST"
const {data , error , loading} = await axiosService({endpoint , method ,  body , token  } )
const result = {
    data: data,
    error : error,
    loading : loading
 }  
 return result;
} 

