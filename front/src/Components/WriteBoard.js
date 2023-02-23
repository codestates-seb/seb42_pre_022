import styled from "styled-components";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import quillModule from "../quillModule";

const QuestionForm = styled.div`
  width: 100%;
  height: 300px;
  .ql-editor:focus {
    border: 1px solid var(--blue-300);
    box-shadow: 0 0 0 4px hsla(206, 100%, 40%, .15);
    padding: 11.2px 14.2px;
  }
`

function WriteBoard({postBody, inputHandler}) {
  
  return (
    <QuestionForm>
      <ReactQuill theme="snow" modules={quillModule} style={{ width: "100%", height: "230px"}} value={postBody} onChange={inputHandler} />
    </QuestionForm>
  )
}

export default WriteBoard;