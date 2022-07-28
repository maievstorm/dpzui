import BaseAxios from "./BaseAxios";
import UserService from "./UserService";



export const addLog = async ( action, detail ) => {
    let response
    const router = '/logs/addLog' ;
    try {
        response = await BaseAxios({
            method: 'post',
            url: router,
            data:{
                username:UserService.getUsername(),
                action:action,
                detail:detail
            } ,  
            headers: { "Authorization": `Bearer ${UserService.getToken()}` },         
        });
    } catch (err) {
        console.log(err);
    }
    return response
}

export const searchLog = async (username,action) => {
    let response
    const router = '/logs/search'
    try {
        response = await BaseAxios({
            method: 'get',
            url: router,
            params:{
                username:username,
                action:action
            },
            headers: { "Authorization": `Bearer ${UserService.getToken()}` },
            
        });
    } catch (err) {
        console.log(err);
    }
    return response
}

const LogService = {
    addLog,
    searchLog

};

export default LogService;