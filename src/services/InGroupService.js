import BaseAxios from "./BaseAxios";
import UserService from "./UserService";
import axios from "axios";

export const addSubscription = async (user_group_id,user_account_id,isAdmin) => {
    let response
    const router = '/ingroup'

    var d = new Date();

    return response = await BaseAxios({
        method: 'post',
        data: {
            user_group_id: user_group_id,
            user_account_id: user_account_id,
            time_added: d.toLocaleString(),
            time_removed: undefined,
            group_admin: isAdmin
        },
        url: router,
        headers: { "Authorization": `Bearer ${UserService.getToken()}` },
    })
}


export const deleteInGroup = async (user_group_id,user_account_id) => {
    let response
    const router = '/ingroup/deleteInGroup'

    var d = new Date();

    return response = await BaseAxios({
        method: 'delete',
        data: {
            user_group_id: user_group_id,
            user_account_id: user_account_id
        },
        url: router,
        headers: { "Authorization": `Bearer ${UserService.getToken()}` },
    })
}