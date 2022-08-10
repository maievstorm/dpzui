import BaseAxios from "./BaseAxios";
import UserService from "./UserService";



export const addKeycloakUser = async (username, firstName, lastName, email, password) => {
    let policy = 'readwrite'
    let response
    const router = '/keycloak/addUser'
    try {
        response = await BaseAxios({
            method: 'post',
            url: router,
            data: {
                username: username,
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                policy: policy

            },
            headers: { "Authorization": `Bearer ${UserService.getToken()}` },

        });
    } catch (err) {
        console.log(err);
    }
    return response
}

export const getUserInfor = async (username,email) => {
    console.log(username,email)

    let response
    const router = '/keycloak/userInfo'
    return response = await BaseAxios({
        method: 'post',
        data: {
            username: username,
            email: email,
            access_token: UserService.getToken(),        
        },
        url: router,
        headers: { "Authorization": `Bearer ${UserService.getToken()}` },
    })
}


export const resetPassword = async (userId,newPassword) => {
    let response
    const router = '/keycloak/changePassword'
    return response = await BaseAxios({
        method: 'put',
        data: {
            access_token: UserService.getToken(),
            userId: userId,
            newPassword: newPassword,
            
        },
        url: router,
        headers: { "Authorization": `Bearer ${UserService.getToken()}` },
    })
}


const KeycloakService = {
    addKeycloakUser
};

export default KeycloakService;