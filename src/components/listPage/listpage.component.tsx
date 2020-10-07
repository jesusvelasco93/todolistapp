import React, { useEffect } from 'react';
/* Redux */
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { setInitialCharge } from '../../store/actions';
/* Services */
import Api from '../../services/api';
import { QuestionPageState } from '../../store/type';
/* Interfaces */
import IResponseQuestions from '../../schemas/IResponseQuestions';
/* Components */
import TableComponent from '../listPage/table/table.component';
import PaginationComponent from '../listPage/pagination/pagination.component';
/* ENV variables */
import Enviroment from '../../services/enviroment';
const numQuestionPage = Enviroment.getEnviromentVariable("REACT_APP_NUMQUESTION");

// Initial page, this go to router component
function ListPageComponent() {
    const listPageState: QuestionPageState = useSelector((state: QuestionPageState) => state);
    const dispatch: Dispatch<any> = useDispatch();

    // Only in didmount - first load
    useEffect(() => {
        (async ()=> {
            const initalQuestions = numQuestionPage * Enviroment.getEnviromentVariable("REACT_APP_NUMPAGE_INITIAL");
            const result: IResponseQuestions = await Api.getQuestions(initalQuestions);
            dispatch(setInitialCharge(!result.result, result.data));
        })();
    }, []);
    /* funtion to generate title text */
    function generateTextTitle() {
        return listPageState.loading ? "Loading app.." : (listPageState.error) ? "An error happend" : "Browse Questions";
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1 className="titleApp">{generateTextTitle()}</h1>
                    {   !listPageState.loading && !listPageState.error ?
                            <div>
                                <TableComponent/>
                                <PaginationComponent/>
                            </div>
                        : 
                            null
                    }
                </div>
            </div>
        </div>
    );
}

export default ListPageComponent;
