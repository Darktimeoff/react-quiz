import React from 'react';
import classes from './FinishQuiz.module.css';
import FinishQuizList from './FinishQuizList/FinishQuizList';

const FinishQuiz = (props) => {
    return (
        <div className={classes.FinishQuiz}>
            <FinishQuizList results={props.results} quiz={props.quiz} onRetryClick={props.onRetryClick}/>
        </div>
    )
}

export default FinishQuiz;
