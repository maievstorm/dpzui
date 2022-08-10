import BaseAxios from "./BaseAxios";
import config from "config";
import UserService from "./UserService";



export const getUserSubscription = async () => {
    let response
    const router = '/subscription/userSubscription'

    return response = await BaseAxios({
        method: 'get',
        params: {
            userName: UserService.getUsername()
        },
        url: router,
        headers: { "Authorization": `Bearer ${UserService.getToken()}` },
    })
}

export const createRequestsub = async (user_name, fullname, email, upassword) => {

    let response
    const router = '/requestsub'

    var today = new Date().toLocaleString()

    return response = await BaseAxios({
        method: 'post',
        data: {
            user_account_id: null,
            user_name: user_name,
            'fullname': fullname,
            email: email,
            upassword: upassword,
            'offer_id': null,
            'plan_id': null,
            'request_date': today,
            'request_status': 0,
            'request_type': 0
        },
        url: router,
        headers: { "Authorization": `Bearer ${UserService.getToken()}` },
    })
}