import styled from "styled-components";
import { useCallback, useEffect, useState } from "react";
import { Link, useParams, useBeforeUnload } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { editPostActions } from "../Reducers/editPostReducer";
import { BasicBlueButton } from "../Styles/Buttons";
import Aside from "../Components/Aside";
import QandAPost from "../Components/QandAPost";
import TagsDiv from "../Components/TagsDiv";
import WriteBoard from "../Components/WriteBoard";
import LoginWith from "../Components/LoginWith";
import HelmetTitle from "../Components/HelmetTitle";
import useGET from "../util/useGET";
import postData from "../util/postData";
import dateTimeFormat from "../util/dateTimeFormat";
import preventClose from "../util/preventClose";

const QuestionContainerMain = styled.main`
  display: table;
  h1 {
    font-size: 2rem;
    font-weight: normal;
    line-height: 1.35;
    margin-bottom: 8px;
    flex: 1 auto;
    > a {
      color: var(--black-700);
      text-decoration: none;
      cursor: pointer;
    }
  }
  > div {
    display: flex;
  }
  .questionTitle {
    align-items: flex-start;
  }
  > div:nth-child(2) {
    border-bottom: 1px solid var(--black-075);
    margin-bottom: 16px;
    padding-bottom: 8px;
  }
  > div:nth-child(4) {
    float: right;
    margin-top: 15px;
  }

  @media only screen and (max-width: 980px) {
    > div {
      float: none !important;
    }
    > div:nth-child(4) {
      width: 100%;
      margin: 5px 0;
    }
  }
`
const QuestionDetailDiv = styled.div`
  white-space: nowrap;
  margin-bottom: 8px;
  margin-right: 16px;
  font-size: 13px;
  > span:first-child {
    color: var(--black-500);
    margin-right: 2px;
  }
  @media only screen and (max-width: 980px) {
    font-size: 11px !important;
  }
`
const QuestionDiv = styled.div`
  display: flex;
  flex-direction: column;
  float: left;
  width: calc(100% - 326px);
  color: var(--black-800);
  .answerpart {
    padding-top: 10px;
    > div {
      padding: 10px 0;
      > h2 {
        font-size: 1.46rem;
      }
    }
    h2 {
      margin: 1rem 0 0.8rem 0;
      line-height: 1.3;
      font-weight: 400;
      font-size: 1.3rem;
      > div {
        display: inline;
      }
    }
  }
  .postanswer {
    display: flex;
    padding: 10px 0;
    > em {
      margin: 1em 0;
      margin-left: 2px;
    }
  }

  @media screen and (max-width: 980px) {
    width: 100%;
  }
`
function Question() {
  const { question_id } = useParams()
  const [question, Qerror] = useGET(`/questions/${question_id}`)
  const [answerUrl, setAnswerUrl] = useState(null)
  const [answers, Aerror] = useGET(answerUrl)
  const { login } = useSelector(state => state.loginInfoReducer);
  const [createAnswer, setCreateAnswer] = useState("")
  const dispatch = useDispatch()
  const checkAnswerBlankToPreventClose = useCallback((e) => {
    if (createAnswer.replaceAll(/<[^>]*>/g, '').length !== 0) {
      preventClose(e)
    }
  },[createAnswer])

  useBeforeUnload(checkAnswerBlankToPreventClose)

  const postAnswer = () => {
    window.removeEventListener("beforeunload", checkAnswerBlankToPreventClose)
    if (createAnswer.replaceAll(/<[^>]*>/g, '').length === 0) alert("답변 내용을 입력하세요")
    else if (window.confirm("답변을 등록합니다") === true) {
      postData(`/answers`, { questionId: question_id, body: createAnswer })
      .then(() => {
          window.location.reload()
        })
    }
  }
  const recentModified = () => {
    if (!question.createdDate) return;
    let recentDate = question.createAnswer !== question.modifiedDate ? new Date(question.modifiedDate) : new Date(question.createdDate)
    if (answers) {
      recentDate = answers.reduce((acc, answer) => {
        const recentAnswerDate = answer.createAnswer !== answer.modifiedDate ? new Date(answer.modifiedDate) : new Date(answer.createdDate)
        return recentAnswerDate > acc ? recentAnswerDate : acc
      }, recentDate)
    }
    return recentDate
  }
  const recentModifiedDate = recentModified()

  const wirteAnswer = (p) => {
    if (!login) alert("답변을 등록하려면 로그인해야 합니다")
    else setCreateAnswer(p)
  }
  useEffect(() => {
    dispatch(editPostActions.changeNowQ(question))
    if (question.answerCount) {
      setAnswerUrl(`/answers?questionId=${question_id}`)
    }
  }, [question])

  return (
    <div className="content">
      <HelmetTitle title={`${question && question.tagList[0]?.tagName} - ${question.title}`} />
      {Qerror && <h1 className="error">Question ERROR</h1>}
      {question &&
        <QuestionContainerMain >
          <div className="questionTitle">
            <h1><a onClick={() => window.location.reload()}>{question.title}</a></h1>
            <BasicBlueButton to={login ? "/askquestion": "/users/login"}>Ask Question</BasicBlueButton>
          </div>
          <div>
            <QuestionDetailDiv>
              <span>Asked</span>
              <span>{dateTimeFormat(question.createdDate, true)}</span>
            </QuestionDetailDiv>
            <QuestionDetailDiv>
              <span>Modified</span>
              <span>{dateTimeFormat(recentModifiedDate, true)}</span>
            </QuestionDetailDiv>
            <QuestionDetailDiv><span>Viewed</span><span>{question.viewCount + 1} times</span></QuestionDetailDiv>
          </div>
          <QuestionDiv>
            <div>
              <QandAPost question={question} qwriter={question.user.userId} />
            </div>
            <div className="answerpart">
              <div>
                {question.answerCount !== 0 &&
                  (Aerror ?
                    <h1 className="error">Answer ERROR</h1>
                    : (<>
                      <h2>{answers?.length} Answers</h2>
                      {answers.length !== 0 && answers?.map(answer => <QandAPost key={answer.answerId} answer={answer} qwriter={question.user.userId} />)}
                    </>))
                  }
              </div>
              <div>
                <h2>Your Answer</h2>
                <WriteBoard postBody={createAnswer} inputHandler={wirteAnswer} />
                {!login && <LoginWith />}
                <div className="postanswer">
                  <BasicBlueButton onClick={postAnswer} to={`/questions/${question_id}`}>Post your Answer</BasicBlueButton>
                  {!login && <em>By clicking "Post Your Answer", you agree to our <span className="linktext">terms of service</span>, <span className="linktext">privacy policy</span> and <span className="linktext">cookie policy</span></em>}
                </div>
              </div>
              <h2>{login && "Not the answer you're looking for? "}Browse other questions tagged <TagsDiv tags={question.tagList}/> or <Link className="linktext" to="/askquestion">ask your own question.</Link></h2>
            </div>
          </QuestionDiv>
          <Aside />
        </QuestionContainerMain>
      }
    </div>
  );
}

export default Question;