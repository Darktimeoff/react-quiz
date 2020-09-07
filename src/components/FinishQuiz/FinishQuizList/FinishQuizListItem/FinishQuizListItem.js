import React from 'react';
import classes from './FinishQuizListItem.module.css';

const FinishQuizListItem = props => (
    <li className={classes.FinishQuizListItem}>
        <strong>{props.index + 1}</strong>.&nbsp;
            {props.question}
        <i className={props.iconCls} />
    </li>
)

export default FinishQuizListItem;