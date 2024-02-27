


export const  getAuthUser = ():string|null => {
const user = window.localStorage.getItem('user_id');
return user;
}


export const setAuthUser = (userId:string):void => {
    window.localStorage.setItem('user_id' , userId)
}

export const deleteAuthUser = ():boolean => {
    window.localStorage.removeItem('user_id');
    if(getAuthUser()){
        return false;
    }
    return true;
}
