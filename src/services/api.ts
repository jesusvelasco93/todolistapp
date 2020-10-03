import axios from "axios";
import IResponse from "../schemas/IResponse";
import IResponseQuestions from "../schemas/IResponseQuestions";
import Enviroment from "./enviroment";

export default class Api {
    public static async getQuestions(numQuest: number = Enviroment.getEnviromentVariable("REACT_APP_NUMQUESTION")): Promise<IResponseQuestions> {
        const url = `${Enviroment.getEnviromentVariable("REACT_APP_URLAPI")}?encode=url3986&amount=${numQuest}`;
        const response = await this.get(url);
        return {
            result: response.result,
            data: response.data && response.data.data ? (response.data.data.results || []) : []
        }
    }

    private static get(url:string): Promise<IResponse>{
        return new Promise((resolve, reject) => {
            return axios.get(url).then((data)=> {
                return resolve({result: true, data:data});
            }).catch(err=> {
                console.error("An error happend when try to get the questions.", err);
                return resolve({result: false, data: []});
            });
        });
    }
}