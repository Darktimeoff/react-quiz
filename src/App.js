import React from 'react';
import Layout from './hoc/Layout/Layout';
import Quiz from './containers/Quiz/Quiz';
import {Route, Switch, Redirect} from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import QuizCreator from './containers/QuizCreator/QuizCreator';
import QuizList from './containers/QuizList/QuizList';
import { store } from './index';

function App() {
	const state = store.getState();
	console.log(state)
	return (
        <Layout>
			<Switch>
				<Route path="/" exact component={QuizList}></Route>
				<Route path="/auth" component={Auth}></Route>
				{state.auth.signIn ? <Route path="/quiz-creator" component={QuizCreator}></Route> : null}
				<Route path="/quiz/:id" component={Quiz}></Route>
				<Redirect to="/" />
			</Switch>
		</Layout>
  	);
}

export default App;
