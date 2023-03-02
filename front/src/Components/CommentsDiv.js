import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import CommentLi from "./CommentLi";
import postData from "../util/postData";
import CommentTextarea from "./CommentTextarea";

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

  const handleWriteButton = () => {
    if (writeMode) {
      if (writeComment.length === 0) setWriteMode(false)
      else if (writeComment.length > 100) alert("코멘트는 100자 이하여야 합니다")
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

  return (
    <CmtDiv>
      {comments.length !== 0 &&
        <ul>
          {comments.map(comment => <CommentLi key={comment.commentId} comment={comment} />)}
        </ul>
      }
      {writeMode && <CommentTextarea setComment={setWriteComment} writeMode={writeMode} writeComment={writeComment} />}
      <span className={writeMode ? "addCmt" : ""} onClick={handleWriteButton}>Add a comment</span>
    </CmtDiv>
  )
}

export default CommentsDiv;
