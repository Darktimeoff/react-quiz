import React, { Component } from 'react';
import classes from './Quiz.module.css'
import ActiveQuiz from './../../components/ActiveQuiz/ActiveQuiz';
import FinishQuiz from './../../components/FinishQuiz/FinishQuiz';


class Quiz extends Component {
	state = {
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
		quiz: [
            {
                question: 'Какого цвета небо?',
                rightAnswerId: 2,
                id: 1,
                answers: [
                    {text: 'Черный', id: 1},
                    {text: 'Синий', id: 2},
                    {text: 'Красный', id: 3},
                    {text: 'Зеленый', id: 4}
                ]
            },
            {
                question: 'В каком году основали Сант-Петербург?',
                rightAnswerId: 3,
                id: 2,
                answers: [
                    {text: '1700', id: 1},
                    {text: '1702', id: 2},
                    {text: '1703', id: 3},
                    {text: '1603', id: 4}
                ]
            }    
        ],
        
	}

    onAnswerClickHandler = answerId => {
        if(this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]; 
            if(this.state.answerState[key] === 'success') {
                return;
            }
        }

        const results = this.state.results;
        const question = this.state.quiz[this.state.activeQuestion];

        if(answerId === question.rightAnswerId) {
           if(!results[question.id]) {
               results[question.id] = 'success'
           }

            this.setState({
                answerState: {[answerId]: 'success',
                results
            }});


            const timeout = window.setTimeout(() => {
                if(this.isQuizfinish()) {
                    this.setState({isFinished: true})
                } else {
                    this.setState(prevState => {
                        return {
                           activeQuestion: prevState.activeQuestion + 1,
                           answerState: null
                        }
                    });
                }
                window.clearTimeout(timeout)
            }, 1000);
        } else {
            results[question.id] = 'error';
            this.setState({
                answerState: {[answerId]: 'error',
                results
            }});
        }
    }

    onRetryClickHandler = () => {
        this.setState({
            isFinished: false,
            activeQuestion: 0,
            results: {}, 
            answerState: null
        });
    }

    isQuizfinish() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    checkQuizIsFinish() {
        const activeQuestion = this.state.activeQuestion;

        if(this.state.isFinished) {
            return  <FinishQuiz 
                        results={this.state.results}
                        quiz={this.state.quiz}
                        onRetryClick={this.onRetryClickHandler}
                    />
        } else {
            return <ActiveQuiz 
                answers={this.state.quiz[activeQuestion].answers} 
                question={this.state.quiz[activeQuestion].question}
                onAnswerClick={this.onAnswerClickHandler}
                quizLength={this.state.quiz.length}
                answerNumber={this.state.activeQuestion + 1}
                state={this.state.answerState}
            />
        }
    }

    render() {
        return (
            <div className={classes.Quiz}> 
                <div className={classes.QuizWrapper}>
                <h1>Ответьте на все вопросы</h1>
                    {this.checkQuizIsFinish()}
                </div>
            </div>
        )
    }
}

export default Quiz;
