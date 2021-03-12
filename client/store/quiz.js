import axios from 'axios'
const getToken = () => window.localStorage.getItem('token');

/**
 * ACTION TYPES
 */
const SET_QUIZ = 'SET_QUIZ'
const UPDATE_QUIZ = "UPDATE_QUIZ"
/**
 * ACTION CREATORS
 */
export const setQuiz = (quiz) => {
 return {
   type: SET_QUIZ,
   quiz
 }
}

export const _updateQuiz = (quiz) => {
  return {
    type: UPDATE_QUIZ
  }
}


/* AXIOS CALL */
export const pullQuiz = () => {
  return axios.get("/api/quiz/")
}


/**
 * THUNK CREATORS
 */

export const fetchQuiz = () =>  {
  return function(dispatch){
    return pullQuiz().then(result => dispatch(setQuiz(result.data)))
  }

};

export const updateQuiz = (quizObj) => async (dispatch) => {
  const token = getToken();
  const result = (
    await axios.post('/api/quiz/:id',
    {quizObj},
    {
      headers: {
        authorization: token,
      },
    })
  ).data;
  return dispatch(_updateQuiz(result));
};

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case SET_QUIZ:
      return action.quiz;
    default:
      return state;
  }
}