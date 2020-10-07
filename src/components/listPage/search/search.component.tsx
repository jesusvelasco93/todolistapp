import React, { ChangeEvent, Dispatch, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeSearch } from '../../../store/actions';
import { QuestionPageState } from '../../../store/type';

// Initial page, this go to router component
function SearchComponent() {
    const textSearched: string = useSelector((state: QuestionPageState) => state.textSearch);
    const [searchText, setSearchText] = useState('');
    const dispatch: Dispatch<any> = useDispatch();
    
    function changeTextSearch(e: ChangeEvent<HTMLInputElement>) {
        setSearchText(e.target.value || '');
    }

    function search(event:any) {
        dispatch(changeSearch(searchText));
        setSearchText('');
    }
    function removeTextSearch(event:any) {
        dispatch(changeSearch(''));
    }
    return (
        <div style={{display: true ? "block" : "none" }}>
            <h1 className="titleApp">Search</h1>
            <div id="searchForm" className="form-group">
                <label htmlFor="searchTextInput">Search question:
                    { textSearched ? 
                        <span className="searchedBox" onClick={removeTextSearch}>{textSearched} <span className="removeSearch">x</span></span> 
                    : null}
                </label>
                <div className="row">
                    <div className="col">
                        <input type="text" className="form-control" id="searchTextInput" placeholder="Type text..." value={searchText} onChange={changeTextSearch}/>
                    </div>
                    <div className="col-auto">
                        <button type="button" className="btn btn-primary" onClick={search}><span className="oi oi-magnifying-glass"></span></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchComponent;
