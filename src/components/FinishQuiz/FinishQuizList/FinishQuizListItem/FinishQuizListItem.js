import React from 'react';
import classes from './FinishQuizListItem.module.css';

const FinishQuizListItem = props => (
    <li className={classes.FinishQuizListItem}>
        <strong>1. </strong>
            How are you
        <i className={'fa fa-check ' + classes.success} />
    </li>
)

export default FinishQuizListItem;