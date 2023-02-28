import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { ReactComponent as EditCommentIcon } from "../assets/editCommentIcon.svg"
import { CommentTextarea } from "../Styles/Divs";
import deleteData from "../util/deleteData";
import patchData from "../util/patchData";
import dateTimeFormat from "../util/dateTimeFormat";

const CmtLi = styled.li`
  padding: 6px;
  border-bottom: 1px solid var(--black-050);
  color: var(--black-800);
  > span {
    margin-right: 4px;
  }
  .hidden {
    display:none;
  }
`
const WriterSpan = styled.span`
  display: inline-block;
  white-space: nowrap;
  padding: 1px 5px;
  border-radius: 3px;
  background-color: var(${props => props.writer ? "--powder" : null});
`
const DateSpan = styled.span`
  display: inline-flex;
  align-items: center;
  color: var(--black-400);
  cursor: pointer;
  > svg {
    fill: var(--black-400);
    cursor: default;
    margin-left: 4px;
  }
`
const EditCmtSpan = styled.span`
  cursor: pointer;
  color: var(--black-500);
  text-decoration: none;
  :hover {
    color: var(--black-400);
  }
`

function CommentLi({ comment }) {
  const { login, userInfo } = useSelector(state => state.loginInfoReducer);
  const { editPost } = useSelector(state => state.editPostReducer);
  const { nowQ } = editPost
  const [editMode, setEditMode] = useState(false)
  const [editComment, setEditComment] = useState(comment.body)
  const textareaRef = useRef();

  const handleResizeHeight = () => {
    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
  }
  const handleEditButton = () => {
    if (editMode) {
      const data = {
        commentId: comment.commentId,
        body: editComment
      }
      patchData("/comments", data)
        .then(() => setEditMode(false))
        .then(() => window.location.reload())
    } else {
      setEditMode(true)
    }
  }
  const handleComment = (e) => {
    if (e.key === "Enter") {
      handleEditButton()
    } else {
      setEditComment(e.target.value);
      handleResizeHeight();
    }
  }
  const deleteComment = () => {
    if (window.confirm("정말 삭제하시겠습니까?") === true) {
      deleteData(`/comments/${comment.commentId}`)
        .then(() => alert("삭제되었습니다!"))
        .then(() => window.location.reload())
    }
  }

  return (
    <CmtLi writer={nowQ.userId === comment.user.userId ? 1 : null}>
      <CommentTextarea className={editMode ? "textarea" : "hidden"} ref={textareaRef} defaultValue={editComment} onClick={handleResizeHeight} onKeyUp={handleComment} />
      <span className={editMode ? "hidden" : ""}>{editComment}</span>
      –&nbsp;<WriterSpan className="linktext">{comment.user.displayName}</WriterSpan>
      <DateSpan>{comment.modifiedDate ? (<>{dateTimeFormat(comment.modifiedDate)}<EditCommentIcon /></>) : dateTimeFormat(comment.createdDate)}</DateSpan>
      {userInfo?.userId === comment.user.userId ?
        <>
          <EditCmtSpan onClick={handleEditButton}>{editMode ? "Save" : "Edit"}</EditCmtSpan>
          <EditCmtSpan onClick={deleteComment}>Delete</EditCmtSpan>
        </>
        : null}
    </CmtLi>
  )
}

export default CommentLi;