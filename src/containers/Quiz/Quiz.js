import React, { Component } from 'react';
import classes from './Quiz.module.css'
import ActiveQuiz from './../../components/ActiveQuiz/ActiveQuiz';
import FinishQuiz from './../../components/FinishQuiz/FinishQuiz';
import Loader from './../../components/UI/Loader/Loader';
import { connect } from 'react-redux';
import { fetchQuizeById, onAnswerClickHandler,  onRetryClickHandler} from './../../store/actions/quiz';

class Quiz extends Component {
    componentDidMount() {
        this.props.fetchQuizeById(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.onRetryClickHandler();
    }

    checkQuizIsFinish() {
        const activeQuestion = this.props.activeQuestion;

        if(this.props.isFinished) {
            return  <FinishQuiz 
                        results={this.props.results}
                        quiz={this.props.quiz}
                        onRetryClick={this.props.onRetryClickHandler}
                    />
        } else {
            return <ActiveQuiz 
                answers={this.props.quiz[activeQuestion].answers} 
                question={this.props.quiz[activeQuestion].question}
                onAnswerClick={this.props.onAnswerClickHandler}
                quizLength={this.props.quiz.length}
                answerNumber={this.props.activeQuestion + 1}
                state={this.props.answerState}
            />
        }
    }

    render() {
        return (
            <div className={classes.Quiz}> 
                <div className={classes.QuizWrapper}>
                <h1>Ответьте на все вопросы</h1>
                {
                    this.props.isLoading && !this.props.quiz
                        ? <Loader />
                        : this.checkQuizIsFinish()
                }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        results: state.quiz.results,
        isFinished: state.quiz.isFinished,
        isLoading: state.quiz.isLoading,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState,
		quiz: state.quiz.quiz,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizeById: id => dispatch(fetchQuizeById(id)),
        onAnswerClickHandler: answerId => dispatch(onAnswerClickHandler(answerId)),
        onRetryClickHandler: () => dispatch(onRetryClickHandler())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
