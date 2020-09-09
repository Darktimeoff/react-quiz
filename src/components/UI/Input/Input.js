import React from 'react';
import classes from './Input.module.css';

const Input = props => {
    const cls = [classes.Input];
    const htmlFor = `${props.Type}-${Math.random()}`

    return (
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input
                type={props.type || 'text'} 
                id={htmlFor}
                required={props.required || false}
                value={props.value || ''}
                placeholder={props.placeholder || ''}
                onChange={props.onChange}
            />
            <span>{props.errorMessage}</span>
        </div>
    )
}

export default Input;