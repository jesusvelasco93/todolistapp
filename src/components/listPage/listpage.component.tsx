import React, { useEffect, useState } from 'react';

import Api from '../../services/api';
import Enviroment from '../../services/enviroment';

import IQuestion from '../../schemas/IQuestion';
import IResponseQuestions from '../../schemas/IResponseQuestions';

import TableComponent from '../listPage/table/table.component';
import PaginationComponent from '../listPage/pagination/pagination.component';

const numQuestionPage = Enviroment.getEnviromentVariable("REACT_APP_NUMQUESTION");
const numPageInitial = Enviroment.getEnviromentVariable("REACT_APP_NUMPAGE_INITIAL");

function ListPageComponent() {
    const maxPageLoaded = numPageInitial;
    const [listPageState, setListPageState] = useState({
        currentPage: 0,
        error: false,
        loading: true,
        questions: [] as IQuestion[]
    });
    // Only in didmount
    useEffect(() => {
        (async ()=> {
            const initalQuestions = numQuestionPage * Enviroment.getEnviromentVariable("REACT_APP_NUMPAGE_INITIAL");
            const result: IResponseQuestions = await Api.getQuestions(initalQuestions);
            setListPageState({
                currentPage: 1,
                error: !result.result,
                loading: false,
                questions: listPageState.questions.concat(result.data),
            });
        })();
    }, []);

    function generateTextTitle() {
        return listPageState.loading ? "Loading app.." : (listPageState.error) ? "An error happend" : "Browse Questions";
    }
    function generateQuestionInView(): IQuestion[] {
        let questionsInView: IQuestion[] = [];
        try {
            if (listPageState.currentPage > 0) {
                const firstQuestion = (listPageState.currentPage-1) * numQuestionPage;
                // const lastQuestion = listPageState.currentPage * numQuestionPage;
                const auxQuestions = [...listPageState.questions];
                console.log(firstQuestion, auxQuestions);
                questionsInView = auxQuestions.length > numQuestionPage ? auxQuestions.splice(firstQuestion, numQuestionPage) : [];
            }
        } catch (err) {
            console.error("An error happend while the questions were paginating");
        } finally {
            return questionsInView;
        }
    }
    async function moveTo(page: number): Promise<void> {
        console.log(page);
        if (page > maxPageLoaded) {
            const numQuestionToLoad = numQuestionPage * (page-maxPageLoaded);
            // Tengo que cargar y moverme
            const result: IResponseQuestions = await Api.getQuestions(numQuestionToLoad);
            setListPageState({ ...listPageState, currentPage: page, questions: listPageState.questions.concat(result.data) });
        } else {
            setListPageState({...listPageState, currentPage: page});
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
