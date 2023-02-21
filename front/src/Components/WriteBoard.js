import styled from "styled-components";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import quillModule from "../quillModule";

const QuestionForm = styled.div`
  width: 100%;
  height: 300px;
`

function WriteBoard() {
  return (
    <QuestionForm>
      <ReactQuill theme="snow" modules={quillModule} style={{ width: "100%", height: "230px" }} />
    </QuestionForm>
  )
}

export default WriteBoard;