import React, { Component } from 'react';
import classes from './QuizList.module.css';
import {NavLink} from 'react-router-dom';
import Loader from '../../components/UI/Loader/Loader';
import axios from './../../axios/axios-quiz';

export default class QuizList extends Component {
    state = {
        quizes: [],
        isLoading: true
    }

    renderQuizes () {
        if(this.props.quizes) return;
        return this.state.quizes.map((quiz, i) => {
            return (
                <li key={quiz.id}>
                    <NavLink to={'quiz/' + quiz.id}>
                        {i+1}.&nbsp;{quiz.name}
                    </NavLink>
                </li>
            )
        });
    }

    async componentDidMount() {
        try{
            const {data} = await axios.get('quizes.json');
    
            if(!data) {
                this.setState({
                    isLoading: false,
                });
                return;
            };

            const quizes = []
            Object.keys(data).forEach((key, i)  => {
                quizes.push({
                    id: key,
                    name: `Test №${i + 1}`
                });

                this.setState({
                    quizes,
                    isLoading: false,
                })
            });
        } catch (err) {
            console.error(err);
        }
         
    }

    render() {
        return (
            <div className={classes.QuizList}>
               <div>
                   <h1>Список тестов</h1>
                   {this.state.quizes.length ? null:<div style={{textAlign: 'center'}}>Тестов пока что нету</div>}
                    {
                    this.state.isLoading 
                        ? <Loader /> 
                        : <ul>
                            {this.renderQuizes()}
                          </ul>
                    }
               </div>
            </div>
        )
    }
}