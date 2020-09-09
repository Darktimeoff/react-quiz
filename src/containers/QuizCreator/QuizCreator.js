import React, { Component } from 'react';
import classes from './QuizCreator.module.css';
import Button from './../../components/UI/Button/Button';
import { createControl, validate, validateForm } from './../../form/FormLibrary';
import Input from './../../components/UI/Input/Input';
import Select from '../../components/UI/Select/Select';


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
        isFormValid: false,
        rightAnswerId: 1,
        formControls: initFormControl()
    }

    onSubmitFormHandler(event) {
        event.preventDefault();
    }

    onClickAddQuestionHandler = () => {
        const quiz = [...this.state.quiz];
        const index = quiz.length + 1;

        const {question, option1, option2, option3, option4} = this.state.formControls;

        const questionItem ={
            question: question.value, 
            id: index,
            rightAnswerId: this.state.rightAnswerId,
            answer: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id}
            ]
        }

        quiz.push(questionItem);

        this.setState({
            quiz,
            isFormValid: false,
            rightAnswerId: 1,
            formControls: initFormControl()
        });
    }

    onClickCreateQuizHandler = event => {
        console.log(this.state.quiz)
    }

    onChangeInputHandler = (value, controlName) => {
        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}

        control.touched = true;
        control.value = value;
        control.valid = validate(control.value, control.validation);

        formControls[controlName] = control;

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })
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
    onChangeSelectHandler = (event) => {
        this.setState({
           rightAnswerId: +event.target.value
        })
    }


    render() {
        const select = <Select 
            label='Выберете правильный ответ'
            value={this.state.rightAnswerId}
            onChangeSelect={this.onChangeSelectHandler}
            options={[
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4}
            ]}
        />
        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Создание теста</h1>
                    <form onSubmit={this.onSubmitFormHandler}>
                        {this.renderInputs()}
                        {select}
                        <Button type="primary" disabled={!this.state.isFormValid} onClick={this.onClickAddQuestionHandler}>Добавить вопрос</Button>
                        <Button type="success" disabled={this.state.quiz.length === 0} onClick={this.onClickCreateQuizHandler}>Создать тест</Button>
                    </form>
                </div>
            </div>
        )
    }
}