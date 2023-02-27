import styled from "styled-components";
import Aside from "../Components/Aside";
import TagsDiv from "../Components/TagsDiv";
import CommentsDiv from "../Components/CommentsDiv";
import WriteBoard from "../Components/WriteBoard";
import HelmetTitle from "../Components/HelmetTitle";
import { SearchInput } from "../Components/SearchBar";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { BasicBlueButton } from "../Styles/Buttons";
import patchData from "../util/patchData";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editPostActions } from "../Reducers/editPostReducer";
import { sanitize } from 'dompurify'
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
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const isAnswer = pathname.includes("answers")
  const { editPost } = useSelector(state => state.editPostReducer);
  const { nowQ: question, nowA: answer } = editPost
  const post = isAnswer ? answer : question
  const [editTitle, setEditTitle] = useState(post?.title)
  const [editBody, setEditBody] = useState(post?.body)

  const patchPost = () => {
    const url = isAnswer ? "answers" : "questions"
    const editData = {
      body: editBody
    }
    if (!isAnswer) {
      editData.userId = post.userId
      editData.questionId = post.questionId
      editData.title = editTitle
      patchData(`/${url}/${post.questionId}/edit`, editData)
    } else {
      editData.answerId = post.answerId
      patchData(`/${url}`, editData)
    }
    dispatch(editPostActions.deleteNowQA())
  }

  return (
    <div className="content">
      <HelmetTitle title={"Edit - Stack Overflow"}/>
      {!question && !answer ? <h1 className="error">Page Not Found</h1>
        :
        <EditContainerMain>
          <EditPostDiv>
            {isAnswer ?
              <div className="hardQuestion">
                <h2><a onClick={() => navigate(-1)} className="linktext">{question.title}</a></h2>
                <div dangerouslySetInnerHTML={{ __html: sanitize(question.body) }}></div>
              </div>
              : <div>
                <label htmlFor="title">Title</label>
                <SearchInput id="title" defaultValue={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
              </div>}
            <div>
              <label htmlFor="body">Body</label>
              <WriteBoard id="body" postBody={editBody} inputHandler={(p) => setEditBody(p)} />
              <div dangerouslySetInnerHTML={{ __html: sanitize(editBody) }} />
            </div>
            <div>
              <label>Tags</label>
              <TagsDiv />
            </div>
            <div className="submit">
              <BasicBlueButton onClick={patchPost} to={`/questions/${question.questionId}`}>Save edits</BasicBlueButton>
              <Link className="linktext" onClick={() => navigate(-1)}>Cancel</Link>
            </div>
            {post.comments?.length ?
              <CommentsDiv comments={post.comments} questionId={isAnswer ? null : post.questionId} answerId={isAnswer ? post.answerId : null} />
              : null}
          </EditPostDiv>
          <Aside />
        </EditContainerMain>
      }
    </div>
  )
}

export default EditPost;