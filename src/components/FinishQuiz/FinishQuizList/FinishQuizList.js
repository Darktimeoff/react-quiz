import React from 'react';
import classes from './FinishQuizList.module.css';
import FinishQuizListItem from './FinishQuizListItem/FinishQuizListItem';
import Button from './../../UI/Button/Button';

const FinishQuizList = props => {
    let rightAnswer = 0;
  
    return (
        <ul className={classes.FinishQuizList}>
            {props.quiz.map((quiz, i) => {
                const cls = [
                    'fa',
                    props.results[quiz.id] === 'error' ? 'fa-times': 'fa-check',
                    classes[props.results[quiz.id]]
                ];

                rightAnswer += props.results[quiz.id] === 'error' ? 0 : 1;
              
                return (
                    <FinishQuizListItem key={i} index={i} question={quiz.question} iconCls={cls.join(' ')}/>
                )
            })}

            <p>Правильно {rightAnswer} из {props.quiz.length}</p>
            <div>
                <Button onClick={props.onRetryClick} type='primary'>Повторить</Button>
                <Button type='success'>перейти в список тестов</Button>
            </div>
        </ul>
    )
};

export default FinishQuizList;