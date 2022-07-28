import BaseAxios from "./BaseAxios";
import UserService from "./UserService";


export const GetKafkaConnector = async (connectorname) => {
    let response
    const router = '/kafka/kafkaconnector';
    try {
        response = await BaseAxios({
            method: 'get',
            url: router,
            headers: { "Authorization": `Bearer ${UserService.getToken()}` },
            params: {
                connector: connectorname
            }
        });
    } catch (err) {
        console.log(err);
    }
    return response
}
export const GetKafkaConnectorStatus = async (connectorname) => {
    let response
    const router = '/kafka/connectorstatus';
    try {
        response = await BaseAxios({
            method: 'get',
            url: router,
            headers: { "Authorization": `Bearer ${UserService.getToken()}` },
            params: {
                connector: connectorname
            }
        });
    } catch (err) {
        console.log(err);
    }
    return response
}

export const pauseKafkaConnector = async (connectorname) => {
    let response
    const router = '/kafka/pauseconnector';
    try {
        response = await BaseAxios({
            method: 'put',
            url: router,
            headers: { "Authorization": `Bearer ${UserService.getToken()}` },
            params: {
                connector: connectorname
            }
        });
    } catch (err) {
        console.log(err);
    }
    return response
}


export const restarKafkaConnector = async (connectorname) => {
    let response
    const router = '/kafka/restartconnector';
    try {
        response = await BaseAxios({
            method: 'post',
            url: router,
            headers: { "Authorization": `Bearer ${UserService.getToken()}` },
            params: {
                connector: connectorname
            }
        });
    } catch (err) {
        console.log(err);
    }
    return response
}


export const createKafkaConnector = async (body) => {
    const baseUrl = 'https://dpaapigw.apps.xplat.fis.com.vn/dpzapipub/api/v1';

    var axios = require('axios');
    var config = {
        method: 'post',
        url: `${baseUrl}/kafka/createkafkaconnector`,
        headers: {
            "Authorization": `Bearer ${UserService.getToken()}`,
            'Content-Type': 'application/json',
        },
        data: body
    };
    axios(config)
        .then(function (response) {
            //debugger
            console.log("response ", response);
        })
        .catch(function (error) {
            console.log(error);
        });

}

const Kafkaconnect = {
    GetKafkaConnector,
    pauseKafkaConnector,
    restarKafkaConnector,
    createKafkaConnector,
    GetKafkaConnectorStatus

};

export default Kafkaconnect;