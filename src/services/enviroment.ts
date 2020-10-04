const Enviroment = {
    /* Properties can returned */
    _env: {
        REACT_APP_URLAPI: (process.env.REACT_APP_URLAPI || ""),
        REACT_APP_NUMQUESTION: parseInt(process.env.REACT_APP_NUMQUESTION || "10"),
        REACT_APP_NUMPAGE_INITIAL: parseInt(process.env.REACT_APP_NUMPAGE_INITIAL || "4")
    } as any,

    /* Method to avoid check and typing */
    getEnviromentVariable: (name:string): any => {
        return Enviroment._env[name];
    }
}
export default Enviroment;