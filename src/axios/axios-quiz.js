import axios from 'axios';

export default axios.create({
    baseURL: 'https://react-quiz-35da0.firebaseio.com/'
});