import { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, Link, useNavigate, useBeforeUnload } from "react-router-dom";
import { sanitize } from 'dompurify'
import styled from "styled-components";
import Aside from "../Components/Aside";
import CommentsDiv from "../Components/CommentsDiv";
import WriteBoard from "../Components/WriteBoard";
import TagEditor from "../Components/TagEditor";
import HelmetTitle from "../Components/HelmetTitle";
import { SearchInput } from "../Components/SearchBar";
import { BasicBlueButton } from "../Styles/Buttons";
import { editPostActions } from "../Reducers/editPostReducer";
import { QAbodydiv } from "../Components/QandAPost";
import patchData from "../util/patchData";
import preventClose from "../util/preventClose";

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
  .tags {
    > div {
      width: 100%;
      margin: 0;
      > input {
        width: normal;
      }
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
  const [editTags, setEditTags] = useState(() => {
    return question?.tagList ? question?.tagList.map(tag => tag.tagName) : []
  })

  const isChanged = () => {
    const titleChanged = editTitle !== post.title
    const bodyChanged = editBody.replaceAll(/<[^>]*>/g, '') !== post.body.replaceAll(/<[^>]*>/g, '')
    const olderTag = question?.tagList.map(tag => tag.tagName).sort()
    let tagChanged = olderTag.length !== editTags.length
    if (!tagChanged) {
      const nowTag = editTags.slice().sort()
      tagChanged = olderTag.some((tag, i) => tag !== nowTag[i])
    }
    return titleChanged || bodyChanged || tagChanged
  }

  const checkChangingToPreventClose = useCallback((e) => {
    const change = isChanged()
    if (change) {
      preventClose(e)
    }
  }, [editTitle, editBody, editTags])
  useBeforeUnload(checkChangingToPreventClose)

  const patchPost = () => {
    window.removeEventListener("beforeunload", checkChangingToPreventClose)
    const change = isChanged()
    if (!change) alert("변경 사항이 없습니다")
    else if (window.confirm("질문/답변을 수정합니다") === true) {
      const url = isAnswer ? "/answers" : `/questions/${question.questionId}`
      const editData = {
        body: editBody
      }
      if (!isAnswer) {
        editData.userId = post.userId
        editData.questionId = post.questionId
        editData.title = editTitle
        editData.tagList = editTags
      } else {
        editData.answerId = post.answerId
      }
      patchData(url, editData)
        .then(() => { dispatch(editPostActions.deleteNowQA()) })
        .then(() => navigate(`/questions/${question.questionId}`))
    }
  }

  return (
    <div className="content">
      <HelmetTitle title={"Edit - Stack Overflow"} />
      {!question && !answer ? <h1 className="error">Page Not Found</h1>
        :
        <EditContainerMain>
          <EditPostDiv>
            {isAnswer ?
              <div className="hardQuestion">
                <h2><a onClick={() => navigate(-1)} className="linktext">{question.title}</a></h2>
                <QAbodydiv dangerouslySetInnerHTML={{ __html: sanitize(question.body) }} />
              </div>
              : <div>
                <label htmlFor="title">Title</label>
                <SearchInput id="title" defaultValue={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
              </div>}
            <div>
              <label htmlFor="body">{isAnswer ? "Answer" : "Body"}</label>
              <WriteBoard id="body" postBody={editBody} inputHandler={(p) => setEditBody(p)} />
              <QAbodydiv dangerouslySetInnerHTML={{ __html: sanitize(editBody) }} />
            </div>
            <div className="tags">
              {!isAnswer && <>
                <label>Tags</label>
                <TagEditor tags={editTags} setTags={setEditTags} />
                {editTags?.length >= 5 && <span className="error">Please enter no more than 5 tags.</span>}
              </>}
            </div>
            <div className="submit">
              <BasicBlueButton onClick={patchPost}>Save edits</BasicBlueButton>
              <Link className="linktext" onClick={() => navigate(-1)}>Cancel</Link>
            </div>
            {post.comments?.length !== 0 &&
              <CommentsDiv comments={post.comments} questionId={!isAnswer && post.questionId} answerId={isAnswer && post.answerId} />
            }
          </EditPostDiv>
          <Aside />
        </EditContainerMain>
      }
    </div>
  )
}

export default EditPost;