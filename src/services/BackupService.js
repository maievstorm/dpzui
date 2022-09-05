import BaseAxios from "./BaseAxios";
import config from "config";
import UserService from "./UserService";



export const PostgresBackupRestore = async (host,port,user,password,database,file_name,type) => {
    let response
    let router ='http://openshiftbackup-fis-mbf-dplat.apps.xplat.fis.com.vn/'
    if (type ==='backup'){
        router += 'postgresql_backup'
    }
    else{
        router += 'postgresql_restore'
    }

    return response = await BaseAxios({
        method: 'post',
        data: {
            "host": host,
            "port": port,
            "user": user,
            "password": password,
            "database": database,
            "file_name": file_name
        },
        url: router,
        headers: { "Authorization": `Bearer ${UserService.getToken()}` },
    })
}