import styled from "styled-components";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import quillModule from "../quillModule";
import { useSelector, useDispatch } from "react-redux";
import { askquestionActions } from "../Reducers/askquestionReducer";

const QuestionForm = styled.div`
  width: 100%;
  height: 300px;

`

function WriteBoard({setQuestionDone}) {
  const state = useSelector(state => state.askquestionReducer);
  const dispatch = useDispatch();

  const questionInputHandler = (question) => {
    const data = question;
    const originData = data.replaceAll(/<[^>]*>/g, '');
    dispatch(askquestionActions.changeQuestionValue({data}));
    if(originData.length >= 20) {
      setQuestionDone(true);
    } else {
      setQuestionDone(false);
    }
  }

  // console.log(state.questionValue);

  return (
    <QuestionForm>
      <ReactQuill theme="snow" modules={quillModule} style={{ width: "100%", height: "230px"}} value={state.questionValue} onChange={questionInputHandler} />
    </QuestionForm>
  )
}

export default WriteBoard;