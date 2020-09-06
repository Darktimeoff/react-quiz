import React from 'react';
import classes from './FinishQuiz.module.css';
import FinishQuizList from './FinishQuizList/FinishQuizList';

const FinishQuiz = (props) => {
    return (
        <div className={classes.FinishQuiz}>
            <FinishQuizList />
        </div>
    )
}

export default FinishQuiz;
