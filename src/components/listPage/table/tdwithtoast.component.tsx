import React, { useState } from 'react';
import { Toast } from 'react-bootstrap';
import IQuestion from '../../../schemas/IQuestion';

// Initial page, this go to router component
function TDWithToastComponent(props:{text: string, question:IQuestion}) {
    const [show, setShow] = useState(false);
    const toggleShow = (e:any, shouldShow: boolean) => {
        e.preventDefault();
        e.stopPropagation();
        setShow(shouldShow);
    }

    return (
        <td className='fatherToast' onClick={(e)=>{toggleShow(e, true)}}>
            {props.text}
            <Toast className="resultQuestion" show={show} onClick={(e:any)=>{toggleShow(e, false)}}>
                <Toast.Header>
                    <strong className="mr-auto">{decodeURIComponent(props.question.category)}</strong>
                    <small className="smallLetter">{decodeURIComponent(props.question.difficulty)}</small>
                </Toast.Header>
                <Toast.Body>{decodeURIComponent(props.question.correct_answer)}</Toast.Body>
            </Toast>
        </td>
    );
}

export default TDWithToastComponent;
