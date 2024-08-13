import { Access } from 'payload/types';
export const selfOrAdmin: Access =({req:{user}})=>{
    if(user?.collection === 'users'){
        return true
    }
    return{
        id:{
            equals:user?.id
        }
    }
}