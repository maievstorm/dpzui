import BaseAxios from "./BaseAxios";
import UserService from "./UserService";
import axios from "axios";
import { TrendingUpTwoTone } from "@material-ui/icons";

export const addSubscription = async (user_group_id, user_account_id, isAdmin) => {
    let response
    const router = '/ingroup'

    var d = new Date();


    return response = await BaseAxios({
        method: 'post',
        data: {
            user_group_id: user_group_id,
            user_account_id: user_account_id,
            time_added: d.toLocaleString('id-ID', { hour12: false }),
            time_removed: undefined,
            group_admin: isAdmin === 'true' ? true : false
        },
        url: router,
        headers: { "Authorization": `Bearer ${UserService.getToken()}` },
    })
}


export const deleteInGroup = async (user_group_id, user_account_id) => {
    let response
    const router = '/ingroup/deleteInGroup'

    var d = new Date();

    return response = await BaseAxios({
        method: 'put',
        data: {
            user_group_id: user_group_id,
            user_account_id: user_account_id
        },
        url: router,
        headers: { "Authorization": `Bearer ${UserService.getToken()}` },
    })
}