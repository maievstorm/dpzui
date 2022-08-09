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