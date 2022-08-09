import BaseAxios from "./BaseAxios";
import UserService from "./UserService";
import axios from "axios";

export const addUser = async (first_name, last_name, user_name, password, email) => {
    var data = JSON.stringify({
        "first_name": first_name,
        "last_name": last_name,
        "user_name": user_name,
        "password": password,
        "email": email
    });
    var config = {
        method: 'post',
        url: 'https://dpaapigw.apps.xplat.fis.com.vn/dpzapipub/api/v1/useraccount/',
        headers: {
            'Authorization': `Bearer ${UserService.getToken()}`,
            'Content-Type': 'application/json'
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
}

export const accountByUsername = async (user_name) => {
    let response
    const router = '/useraccount/accountbyusername'

    return response = await BaseAxios({
        method: 'get',
        params: {
            username: user_name
        },
        url: router,
        headers: { "Authorization": `Bearer ${UserService.getToken()}` },
    })
}

const UserAccount = {
    addUser,
};

export default UserAccount;