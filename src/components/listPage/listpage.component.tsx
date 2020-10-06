import React, { useEffect } from 'react';
/* Redux */
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { setInitialCharge, addQuestionsAndMove, changePage } from '../../store/actions';
/* Services */
import Api from '../../services/api';
import Utils from '../../services/utils';
import { QuestionPageState } from '../../store/type';
/* Interfaces */
import IQuestion from '../../schemas/IQuestion';
import IResponseQuestions from '../../schemas/IResponseQuestions';
/* Components */
import TableComponent from '../listPage/table/table.component';
import PaginationComponent from '../listPage/pagination/pagination.component';
/* ENV variables */
import Enviroment from '../../services/enviroment';
const numQuestionPage = Enviroment.getEnviromentVariable("REACT_APP_NUMQUESTION");
const numPageInitial = Enviroment.getEnviromentVariable("REACT_APP_NUMPAGE_INITIAL");

// Property to save maxLoadPage
let maxPageLoaded = numPageInitial;
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
    /* funtion to filter questions in view */
    function generateQuestionInView(): IQuestion[] {
        let questionsInView: IQuestion[] = [];
        try {
            if (listPageState.currentPage > 0) {
                const firstQuestion = (listPageState.currentPage-1) * numQuestionPage;
                // const lastQuestion = listPageState.currentPage * numQuestionPage;
                const auxQuestions = [...listPageState.questionsSorted];
                questionsInView = auxQuestions.length > numQuestionPage ? auxQuestions.splice(firstQuestion, numQuestionPage) : [];
            }
        } catch (err) {
            console.error("An error happend while the questions were paginating");
        } finally {
            return questionsInView;
        }
    }
    /* funtion to move to other page */
    async function moveTo(page: number): Promise<void> {
        // If page is not loaded, load data and move
        if (page > maxPageLoaded) {
            const diffToLoad = page-maxPageLoaded;
            const numQuestionToLoad = numQuestionPage * diffToLoad;
            const result: IResponseQuestions = await Api.getQuestions(numQuestionToLoad);
            maxPageLoaded += diffToLoad; // Ajust num load pages
            dispatch(addQuestionsAndMove(!result.result, result.data, page));
        // If page is loaded only move
        } else {
            dispatch(changePage(page));
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1 className="titleApp">{generateTextTitle()}</h1>
                    {   !listPageState.loading && !listPageState.error ?
                            <div>
                                {/* Table */}
                                <TableComponent data={generateQuestionInView()}/>
                                {/* Pagination */}
                                <PaginationComponent currentPage={listPageState.currentPage} moveTo={moveTo}/>
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
