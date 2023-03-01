import { useState, useRef, useEffect } from "react";
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
  const textareaRef = useRef();

  const handleResizeHeight = () => {
    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
  }
  const handleWriteButton = () => {
    if (writeMode) {
      if (writeComment.length === 0) setWriteMode(false)
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
    if (writeComment.length < 100) {
      setWriteComment(e.target.value);
      handleResizeHeight();
    }
  }

  useEffect(() => {
    if (writeMode) {
      textareaRef.current.focus();
    }
  }, [writeMode])
  console.log(writeComment)
  return (
    <CmtDiv>
      {comments.length !== 0 &&
        <ul>
          {comments.map(comment => <CommentLi key={comment.commentId} comment={comment} />)}
        </ul>
      }
      {writeMode && <>
        <CommentTextarea ref={textareaRef} value={writeComment} onChange={handleComment} onKeyUp={e => e.key === "Enter" && handleWriteButton()} />
        {writeComment.length >= 100 && <p className="error">코멘트는 100자까지 입력할 수 있습니다</p>}
      </>}
      <span className={writeMode ? "addCmt" : ""} onClick={handleWriteButton}>Add a comment</span>
    </CmtDiv>
  )
}

export default CommentsDiv;
