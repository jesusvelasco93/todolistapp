import axios from "axios";
import IResponse from "../schemas/IResponse";
import IResponseQuestions from "../schemas/IResponseQuestions";
import Enviroment from "./enviroment";

const Api = {
    // Endpoint that can be called and prepare the data/url to send
    getQuestions:  async(numQuest: number = Enviroment.getEnviromentVariable("REACT_APP_NUMQUESTION")): Promise<IResponseQuestions> => {
        const url = `${Enviroment.getEnviromentVariable("REACT_APP_URLAPI")}?encode=url3986&amount=${numQuest}`;
        const response = await Api._get(url);
        return {
            result: response.result,
            data: response.data && response.data.data ? (response.data.data.results || []) : []
        }
    },

    // Generic get http call -> If app grow it must be in another file
    _get: (url:string): Promise<IResponse> => {
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
export default Api;