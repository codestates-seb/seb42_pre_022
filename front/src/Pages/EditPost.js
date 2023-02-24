import styled from "styled-components";
import Aside from "../Components/Aside";
import TagsDiv from "../Components/TagsDiv";
import CommentsDiv from "../Components/CommentsDiv";
import WriteBoard from "../Components/WriteBoard";
import { SearchInput } from "../Components/SearchBar";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { BasicBlueButton } from "../Styles/Buttons";
import patchData from "../util/patchData";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editPostActions } from "../Reducers/editPostReducer";

const EditContainerMain = styled.main`
  width: 100%;
  > div:nth-child(2) {
    float: right;
    margin-top: 15px;
  }
  @media only screen and (max-width: 980px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    > div {
      float: none !important;
    }
    > div:nth-child(2) {
      margin: 5px 0;
    }
  }
`
const EditPostDiv = styled.div`
  width: calc(100% - 326px);
  float: left;
  min-width: 0;
  white-space: normal;
  p {
    overflow-wrap: break-word;
    font-size: 15px;
    margin-bottom: 1.1em;
  }
  label, h2 {
    display: inline-block;
    margin-top: 16px;
    margin-bottom: 4px;
    font-size: 1.15rem;
    color: var(--black-900);
    font-weight: 600;
  }
  input {
    width: 100%;
    padding-left: 0.7em;
  }
  .hardQuestion {
    padding-bottom: 30px;
    border-bottom:1px solid var(--black-075);
    > h2 {
      margin-top: 0;
      margin-bottom: 16px;
    }
  }
  .submit {
    display: flex;
    align-items: center;
    padding-top: 12px;
    padding-bottom: 16px;
    > a {
      padding: 8px 0.8em;
      margin-right: 8px;
    }
  }
  @media only screen and (max-width: 980px) {
    width: 100% !important;
  }
`
function EditPost() {
  const { pathname } = useLocation()
  const isAnswer = pathname.includes("answers")
  const { editPost } = useSelector(state => state.editPostReducer);
  const { nowQ: question, nowA: answer } = editPost
  const [editTitle, setEditTitle] = useState('')
  const [editBody, setEditBody] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const patchPost = () => {
    const url = isAnswer ? "answers" : "questions"
    const editData = {
      body: editBody
    }
    if (!isAnswer) {
      editData.userId = question.userId
      editData.questionId = question.questionId
      editData.title = editTitle
      // TODO 서버 연결 후 path 수정 /questions/1/edit
      patchData(`/${url}/${question.questionId}`, editData)
    } else {
      editData.answerId = answer.answerId
      patchData(`/${url}`, editData)
    }
    dispatch(editPostActions.deleteNowQA())
  }

  useEffect(() => {
    if (!isAnswer) {
      setEditTitle(question.title)
      setEditBody(question.body)
    } else {
      setEditBody(answer.body)
    }
  }, [editPost])

  return (
    <div className="content">
      <EditContainerMain>
        <EditPostDiv>
          {isAnswer ?
            <div className="hardQuestion">
              <h2><a onClick={() => navigate(-1)} className="linktext">{question.title}</a></h2>
              <div dangerouslySetInnerHTML={{ __html: question.body }}></div>
            </div>
            : <div>
              <label htmlFor="title">Title</label>
              <SearchInput id="title" defaultValue={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
            </div>}
          <div>
            <label htmlFor="body">Body</label>
            <WriteBoard id="body" postBody={editBody} inputHandler={(p) => setEditBody(p)} />
            <div dangerouslySetInnerHTML={{ __html: editBody }} />
          </div>
          <div>
            <label>Tags</label>
            <TagsDiv />
          </div>
          <div className="submit">
            <BasicBlueButton onClick={patchPost} to={`/questions/${question.questionId}`}>Save edits</BasicBlueButton>
            <Link className="linktext" onClick={() => navigate(-1)}>Cancel</Link>
          </div>
          <CommentsDiv />
        </EditPostDiv>
        <Aside />
      </EditContainerMain>
    </div>
  )
}

export default EditPost;