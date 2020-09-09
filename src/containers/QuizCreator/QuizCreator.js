import React, { Component } from 'react';
import classes from './QuizCreator.module.css';
import Button from './../../components/UI/Button/Button';
import { createControl } from './../../form/FormLibrary';
import Input from './../../components/UI/Input/Input';

function createOptionControl(number) {
    return createControl({
        label: `Вариант ${number}`,
        errorMessage: 'Значение не может быть пустым',
        id: number
    }, {required: true});
}

function initFormControl() {
    return {
        question: createControl({
            label: 'Введите вопрос',
            errorMessage: 'Введите не может быть пустым',     
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4)
    }
}

export default class QuizCreator extends Component {

    state = {
        quiz: [],
        formControls: initFormControl()
    }

    onSubmitFormHandler(event) {
        event.preventDefault();
    }

    onClickAddQuestionHandler = () => {

    }

    onClickCreateQuizHandler = () => {

    }

    onChangeInputHandler = (value, controlName) => {
        console.log(`${controlName}`, value);
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, i) => {
            const control = this.state.formControls[controlName];
            return (
                <React.Fragment key={controlName + i} >
                    <Input 
                        type={control.type}
                        value={control.value}
                        placeholder={control.placeholder}
                        valid={control.valid}
                        touched={control.touched}
                        label={control.label}
                        errorMessage={control.errorMessage}
                        shouldValidate={Boolean(control.validation)}
                        onChange={event => this.onChangeInputHandler(event.target.value, controlName)}
                    />
                    {i === 0 ? <hr/>: null}
                </React.Fragment>
            )
        });
    }

    render() {
        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Создание теста</h1>
                    <form onSubmit={this.onSubmitFormHandler}>
                        {this.renderInputs()}
                        <Button type="primary" onClick={this.onClickAddQuestionHandler}>Добавить вопрос</Button>
                        <Button type="success" onClick={this.onClickCreateQuizHandler}>Создать тест</Button>
                    </form>
                </div>
            </div>
        )
    }
}