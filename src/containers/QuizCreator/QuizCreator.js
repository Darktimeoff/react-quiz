import React, { Component } from 'react';
import classes from './QuizCreator.module.css';
import Button from './../../components/UI/Button/Button';
import Input from './../../components/UI/Input/Input';
import Select from '../../components/UI/Select/Select';
import {connect} from 'react-redux';
import { onClickCreateQuizHandler, onClickAddQuestionHandler,  onChangeInputHandler, onChangeSelectHandler} from './../../store/actions/createQuiz';

class QuizCreator extends Component {
    renderInputs() {
        return Object.keys(this.props.formControls).map((controlName, i) => {
            const control = this.props.formControls[controlName];
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
                        onChange={event => this.props.onChangeInputHandler(event.target.value, controlName)}
                    />
                    {i === 0 ? <hr/>: null}
                </React.Fragment>
            )
        });
    }

    onSubmitFormHandler(event) {
        event.preventDefault();
    }

    render() {
        const select = <Select 
            label='Выберете правильный ответ'
            value={this.props.rightAnswerId}
            onChangeSelect={this.props.onChangeSelectHandler}
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
                    <form onSubmit={event => this.onSubmitFormHandler(event)}>
                        {this.renderInputs()}
                        {select}
                        <Button type="primary" disabled={!this.props.isFormValid} onClick={this.props.onClickAddQuestionHandler}>Добавить вопрос</Button>
                        <Button type="success" disabled={this.props.quiz.length === 0} onClick={this.props.onClickCreateQuizHandler}>Создать тест</Button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        quiz: state.createQuiz.quiz,
        isFormValid: state.createQuiz.isFormValid,
        rightAnswerId: state.createQuiz.rightAnswerId,
        formControls: state.createQuiz.formControls
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onClickCreateQuizHandler: () => dispatch(onClickCreateQuizHandler()),
        onClickAddQuestionHandler: () => dispatch(onClickAddQuestionHandler()),
        onChangeInputHandler: (value, controlName) => dispatch(onChangeInputHandler(value, controlName)),
        onChangeSelectHandler: (event) => dispatch(onChangeSelectHandler(event)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)