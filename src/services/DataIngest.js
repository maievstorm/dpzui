import BaseAxios from "./BaseAxios";
import config from "config";
import UserService from "./UserService";



export const getSubcription = async () => {
    let response
    const router = '/subscription/subbyusername/' + UserService.getUsername();
    return response = await BaseAxios({
            method: 'get',
            url: router,
            headers: { "Authorization": `Bearer ${UserService.getToken()}` },
            
        });
    
}


const getLoginfo = async (DagId) => {
    let router = config.airflowapi + '/dags/' + DagId + '/dagRuns?limit=40&order_by=-start_date'
    let response
    try {
        response = await BaseAxios({
            method: 'get',
            url: router,
            auth: {
                username: 'hung',
                password: '123456a@'
            }
        });
    } catch (err) {
        console.log(err);
    }
    return response
}


const Logdetail = async (DagIdnDagrunId) => {
    let router = config.airflowapi + '/dags/' + DagIdnDagrunId + '/taskInstances?limit=100';
    let response
    try {
        response = await BaseAxios({
            method: 'get',
            url: router,
            auth: {
                username: 'hung',
                password: '123456a@'
            }
        });
    } catch (err) {
        console.log(err);
    }
    return response
}

export const GetProcess = async (item_type) => {
    let response
    const router = '/invoice/usernamentype';
    try {
        response = await BaseAxios({
            method: 'get',
            url: router,
            headers: { "Authorization": `Bearer ${UserService.getToken()}` },
            params: {
                user_name: UserService.getUsername(),
                item_type: item_type
            }
        });
    } catch (err) {
        console.log(err);
    }
    return response
}


export const CreateInvoiceProcess = async (body) => {
    let response
    const router = '/invoice';
    try {
        response = await BaseAxios({
            method: 'post',
            url: router,
            headers: { "Authorization": `Bearer ${UserService.getToken()}` },
            data: body

        });
    } catch (err) {
        console.log(err);
    }
    return response
}

export const UpdateInvoiceProcess = async (item_name, body) => {
    let response
    const router = '/invoice/itemname/' + item_name;
    try {
        response = await BaseAxios({
            method: 'put',
            url: router,
            headers: { "Authorization": `Bearer ${UserService.getToken()}` },
            data: body

        });
    } catch (err) {
        console.log(err);
    }
    return response
}






const DataIngest = {
    getLoginfo,
    Logdetail,
    CreateInvoiceProcess,
    UpdateInvoiceProcess,
    getSubcription


};

export default DataIngest;