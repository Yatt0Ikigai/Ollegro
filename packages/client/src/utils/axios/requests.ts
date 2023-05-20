import axios from "axios";

type apiEndpoints = `crt`;

type userCredentials = {
    userdata: {
        login: string,
        password: string,
    }
}

interface IData extends userCredentials {
    [key: string]: any
}

export const postRequest = async (route: apiEndpoints, data: IData) => {
    return await axios.post(`http://127.0.0.1:8080/${route}`, 
    JSON.stringify(data),
    {
       headers: {
        "Content-Type": "application/json",
       } 
    });
}