import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { ReactComponent as EditCommentIcon } from "../assets/editCommentIcon.svg"
import deleteData from "../util/deleteData";
import patchData from "../util/patchData";
import dateTimeFormat from "../util/dateTimeFormat";
import CommentTextarea from "./CommentTextarea";

const CmtLi = styled.li`
  padding: 6px;
  border-bottom: 1px solid var(--black-050);
  color: var(--black-800);
  > span {
    margin-right: 4px;
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
  const { userInfo } = useSelector(state => state.loginInfoReducer);
  const { editPost } = useSelector(state => state.editPostReducer);
  const { nowQ } = editPost
  const [editMode, setEditMode] = useState(false)
  const [editComment, setEditComment] = useState(comment.body)

  const handleEditButton = () => {
    if (editMode) {
      if (comment.body === editComment) alert("변경된 내용이 없습니다")
      else if (editComment.length > 100) alert("코멘트는 100자 이하여야 합니다")
      else if (window.confirm("코멘트를 등록합니다") === true) {
        const data = {
          commentId: comment.commentId,
          body: editComment
        }
        patchData("/comments", data)
          .then(() => setEditMode(false))
          .then(() => window.location.reload())
      }
    } else {
      setEditMode(true)
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
    <CmtLi>
      {editMode ?
        <CommentTextarea setComment={setEditComment} writeMode={editMode} writeComment={editComment} />
        : <span>{editComment}</span>}

      –&nbsp;<WriterSpan writer={nowQ?.user?.userId === comment.user.userId && 1} className="linktext">{comment.user.displayName}</WriterSpan>
      <DateSpan>{comment.createdDate !== comment.modifiedDate ? (<>{dateTimeFormat(comment.modifiedDate)}<EditCommentIcon /></>) : dateTimeFormat(comment.createdDate)}</DateSpan>
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