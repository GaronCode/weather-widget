import axios from "axios";

interface IResponce {
    data: any,
    status: any
}

export const requestSender = async (url: string, params: object): Promise<any>=>{
    const {data, status} = await axios.get<any>(url, {params});  

    return data;
}