import React from 'react';
import classes from './Input.module.css';

function isInvalid({valid, touched, shouldValidate}) {
    return !valid && shouldValidate && touched;
}

const Input = props => {
    const cls = [classes.Input];
    const htmlFor = `${props.Type}-${Math.random()}`;

    if(isInvalid(props)) {
        cls.push(classes.invalid);
    }

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
            {isInvalid(props)
                ? <span>{props.errorMessage || `Введите верное значение ${props.label}`}</span>
                : null
            }
        </div>
    )
}

export default Input;