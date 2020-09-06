import React from 'react';
import classes from './FinishQuizList.module.css';
import FinishQuizListItem from './FinishQuizListItem/FinishQuizListItem';

const FinishQuizList = props => {
    return (
        <ul className={classes.FinishQuizList}>
            <FinishQuizListItem />

            <p>Правильно 4 из 10</p>
            <div>
                <button>Повторить</button>
            </div>
        </ul>
    )
};

export default FinishQuizList;