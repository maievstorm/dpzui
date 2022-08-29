import BaseAxios from "./BaseAxios";
import config from "config";
import UserService from "./UserService";
import axios from "axios";
// import { wrapper } from 'axios-cookiejar-support';
// import { CookieJar } from 'tough-cookie';



export const getCsrfToken = async (superset_token) => {
    // let response
    // const router = 'http://dpadv.apps.xplat.fis.com.vn/api/v1/security/csrf_token/'

    // const jar = new CookieJar();
    // const client = wrapper(axios.create({ jar }));

    // return await client({
    //     method: 'get',
    //     url: router,
    //     headers: {
    //         "Authorization": `Bearer ${superset_token}`,
    //         withCredentials: true
    //     },
    // });

    // return response = await BaseAxios({
    //     method: 'get',
    //     url: router,
    //     headers: {
    //         "Authorization": `Bearer ${superset_token}`,
    //         withCredentials: true
    //     },
    // })
}


// export const getCsrfToken = async (superset_token) => {
//     let response
//     const router = 'http://dpadv.apps.xplat.fis.com.vn/api/v1/security/csrf_token/'

//     return response = await fetch(router,{
//         method: 'get',
//         headers: {
//             "Authorization": `Bearer ${superset_token}`,
//         },
//         credentials: 'include'
//     })
// }


export const login1 = async () => {
    let response
    const router = 'http://localhost:8000/login'

    return response = await BaseAxios({
        method: 'get',
        url: router,
        params:{
            oidc_id_token : UserService.getToken()
        },
        // headers: {
        //     "Authorization": `Bearer ${UserService.getToken()}`,
        //     // withCredentials: true
        // },
        // data: data
    })
}

export const login = async () => {
    let response
    const router = 'http://dpadv.apps.xplat.fis.com.vn/api/v1/security/login'

    var data = {
        "password": "admin",
        "provider": "db",
        "refresh": true,
        "username": "admin"
    };

    return response = await BaseAxios({
        method: 'post',
        url: router,
        headers: {
            "Authorization": `Bearer ${UserService.getToken()}`,
            // withCredentials: true
        },
        data: data
    })
}



export const createDatabase = async () => {
    // let response
    // const router = 'http://dpadv.apps.xplat.fis.com.vn/api/v1/database/'
    // let csrf_token = 'IjkxNDhhYjk2NmI4NDBjZDg2MmRhMWQ2NDU4MDAwN2IzZjAzMTNhYjgi.YwXlHw.evATbSlwFGoyLD4vLgBnGN8E5vM'

    // return response = await axios({
    //     method: 'get',
    //     url: router,
    //     headers: {
    //         // "Authorization": `Bearer ${UserService.getToken()}`,
    //         "Cookie": '3146e3af32fe060976c22114350cd5a5=45ceba07825adcb3043e503f8f004d84; session=.eJxVkE1LA0EMhv_LnLeQzCTz0VuLaP0AKULV0zKbydBicWW3RUT8707x5CEv5IUnPOTb9HXSeW-Wp-msnekPxSwNeg7cxlaskVMJLUUcDi62woUQvfVsa8ahiCohFAESEFAfI1zWBLZCYCBQV0qiGFOuXLM6HSjnlNiGVHBINVggSkQYcs3sGK2Yzsg81f40vul78wFO1pIIwoBRhuAUCclDgKheMos2D_QX7jhKPmpjGtiZ8VCk_3dKb1cPG9k9fbwu9rvnzfXL9gbXi6-r7ePn3eo-U4POs05_f3Dm5xcIBlME.YwSrHQ.EsVHUxo41go3bSBZZdbAdCBEXOA; 3146e3af32fe060976c22114350cd5a5=56f7ae0d733a94f831836c682ac9284b; session=.eJxVkLFqAzEMht_FcwbJlmw5a2mH0iV0y3LYstyEXHJw1w6h9N3r0KmDftAPn_jQt5v6atvJ7XuZN9u56dzc3mHkxGN8xy6cWxqpGrAGGUVISaKP7HvB2tSMEJoCKShYFIHHmsF3SAwEFlrLJJJL514sWKVScmafcsOae_JAlIkwlV44MHp1O6fb2qfP5WK34QOcvSdVhIqiNQVDQoqQQCxqYbXhgfHBzYuW2QYzwJ1bzk2nf6dallo_XvHyJu0GfGj399PRDke5P1-vT9vLgL42W__-ENzPL2-hVBg.YwXqTQ.elHY3HG-bTn00v5mRmaHeXgRfYg',
    //         "X-CSRFToken": csrf_token,
    //     },

    // });
    var config = {
        method: 'get',
        url: 'http://dpadv.apps.xplat.fis.com.vn/api/v1/database/',
        headers: {
            'Cookie': '3146e3af32fe060976c22114350cd5a5=45ceba07825adcb3043e503f8f004d84; session=.eJxVkE1LA0EMhv_LnLeQzCTz0VuLaP0AKULV0zKbydBicWW3RUT8707x5CEv5IUnPOTb9HXSeW-Wp-msnekPxSwNeg7cxlaskVMJLUUcDi62woUQvfVsa8ahiCohFAESEFAfI1zWBLZCYCBQV0qiGFOuXLM6HSjnlNiGVHBINVggSkQYcs3sGK2Yzsg81f40vul78wFO1pIIwoBRhuAUCclDgKheMos2D_QX7jhKPmpjGtiZ8VCk_3dKb1cPG9k9fbwu9rvnzfXL9gbXi6-r7ePn3eo-U4POs05_f3Dm5xcIBlME.YwSrHQ.EsVHUxo41go3bSBZZdbAdCBEXOA; 3146e3af32fe060976c22114350cd5a5=56f7ae0d733a94f831836c682ac9284b; session=.eJxVkLFqAzEMht_FcwbJlmw5a2mH0iV0y3LYstyEXHJw1w6h9N3r0KmDftAPn_jQt5v6atvJ7XuZN9u56dzc3mHkxGN8xy6cWxqpGrAGGUVISaKP7HvB2tSMEJoCKShYFIHHmsF3SAwEFlrLJJJL514sWKVScmafcsOae_JAlIkwlV44MHp1O6fb2qfP5WK34QOcvSdVhIqiNQVDQoqQQCxqYbXhgfHBzYuW2QYzwJ1bzk2nf6dallo_XvHyJu0GfGj399PRDke5P1-vT9vLgL42W__-ENzPL2-hVBg.YwXqTQ.elHY3HG-bTn00v5mRmaHeXgRfYg; 3146e3af32fe060976c22114350cd5a5=56f7ae0d733a94f831836c682ac9284b; session=.eJxVkMtKBEEMRf-l1i0kVanXbEVw3Am-cNNUpRJsbG2mexQc8d-twZWLXMiFEw75NqOusr2YnZZ5k8GMUzM7g8FH38cqavK5xZ7MDqtLvXAxpmCDt1qwNhYhhMZADAwSUoLzmsEqRA8E4lrLlFIu6rWIk0ql5OxtzA1r1miBKBNhLFq882jZDIa3Vcfj8irv3Qd8tpaYESomrtEJElKACEkCF8_SPTCcuXnhMktnOjiYZWo8_jt1Oemtpv0XPx4PV_u3u9PTxfPp_qGFw4Y38fqzQx-brH9_cObnF4MOVHU.YwXssQ.tDCJOc24qj5BKh-bzs2PhFY84Ng'
        },
        data: 'asdas',
        withCredentials: true
    };
    // axios.defaults.withCredentials = true;

    return axios(config)


}