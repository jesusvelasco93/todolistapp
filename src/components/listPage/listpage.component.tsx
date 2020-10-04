import React, { useEffect, useState } from 'react';
/* Services */
import Api from '../../services/api';
import Utils from '../../services/utils';
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
    const [listPageState, setListPageState] = useState({
        sort: 'none',
        currentPage: 0,
        error: false,
        loading: true,
        questions: [] as IQuestion[]
    });
    // Only in didmount - first load
    useEffect(() => {
        (async ()=> {
            const initalQuestions = numQuestionPage * Enviroment.getEnviromentVariable("REACT_APP_NUMPAGE_INITIAL");
            const result: IResponseQuestions = await Api.getQuestions(initalQuestions);
            setListPageState({
                sort: 'none',
                currentPage: 1,
                error: !result.result,
                loading: false,
                questions: listPageState.questions.concat(result.data)
            });
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
                const auxQuestions = [...listPageState.questions];
                if (listPageState.sort !== "none") { questionsInView = Utils.sortObjects(auxQuestions, "category", listPageState.sort); }
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
            setListPageState({ ...listPageState, currentPage: page, questions: listPageState.questions.concat(result.data) });
        // If page is loaded only move
        } else {
            setListPageState({...listPageState, currentPage: page});
        }
    }
    /* function to change sort */
    function changeSort() {
        const toSort = listPageState.sort === "none" ? "dsc" : (listPageState.sort === "dsc" ? "asc" : "none");
        setListPageState({...listPageState, sort:toSort});
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1 className="titleApp">{generateTextTitle()}</h1>
                    {   !listPageState.loading && !listPageState.error ?
                            <div>
                                {/* Table */}
                                <TableComponent data={generateQuestionInView()} sort={listPageState.sort} changeSort={changeSort}/>
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
