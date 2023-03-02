import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import CommentLi from "./CommentLi";
import { CommentTextarea } from "../Styles/Divs";
import postData from "../util/postData";

const CmtDiv = styled.div`
  font-size: 13px;
  padding-right: 16px;
  ul {
    border-top: 1px solid var(--black-075);
    margin-top: 12px;
    padding-bottom: 10px;
    list-style: none;
  }
  > span {
    cursor: pointer;
    color: var(--black-400);
    opacity: .6;
  }
  > span:hover {
    color: var(--blue-500);
  }
  .addCmt {
    opacity: 1;
    color: var(--blue);
  }
`

function CommentsDiv({ comments, answerId, questionId }) {
  const { login } = useSelector(state => state.loginInfoReducer);
  const [writeMode, setWriteMode] = useState(false)
  const [writeComment, setWriteComment] = useState('')
  const textarea = useRef();

  const handleResizeHeight = () => {
    textarea.current.style.height = 'auto';
    textarea.current.style.height = textarea.current.scrollHeight + 'px'
  }
  const handleWriteButton = () => {
    if (writeMode) {
      if (writeComment.length === 0) alert("코멘트를 입력하세요")
      else if (window.confirm("코멘트를 등록합니다") === true) {
        const data = { body: writeComment }
        if (answerId) {
          data.answerId = answerId
        } else {
          data.questionId = questionId
        }
        postData("/comments", data)
        .then(() => setWriteMode(false))
        .then(() => window.location.reload())
      }
    } else if (!login) alert("코멘트를 등록하려면 로그인해야 합니다") 
    else setWriteMode(true)

  }
  const handleComment = (e) => {
    if (e.key === "Enter") {
      handleWriteButton()
    } else {
      setWriteComment(e.target.value);
      handleResizeHeight();
    }
  }
  return (
    <CmtDiv>
      {comments.length !== 0 &&
        <ul>
          {comments.map(comment => <CommentLi key={comment.commentId} comment={comment} />)}
        </ul>
      }
      {writeMode ?
        <CommentTextarea ref={textarea} onClick={handleResizeHeight} onKeyUp={handleComment} />
        : null}
      <span className={writeMode ? "addCmt" : ""} onClick={handleWriteButton}>Add a comment</span>
    </CmtDiv>
  )
}

export default CommentsDiv;
