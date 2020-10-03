export default class Enviroment {
    private static env:any = {
        REACT_APP_URLAPI: (process.env.REACT_APP_URLAPI || ""),
        REACT_APP_NUMQUESTION: parseInt(process.env.REACT_APP_NUMQUESTION || "10"),
        REACT_APP_NUMPAGE_INITIAL: parseInt(process.env.REACT_APP_NUMPAGE_INITIAL || "4")
    };

    public static getEnviromentVariable(name:string): any {
        return this.env[name];
    }
}