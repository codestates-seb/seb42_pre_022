import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { BasicBlueButton } from "../Styles/Buttons";
import Aside from "../Components/Aside";
import QandAPost from "../Components/QandAPost";
import TagsDiv from "../Components/TagsDiv";
import WriteBoard from "../Components/WriteBoard";
import LoginWith from "../Components/LoginWith";
import useGET from "../util/useGET";

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
    }
  }
  > div {
    display: flex;
    align-items: baseline;
  }
  > div:nth-child(2) {
    border-bottom: 1px solid var(--black-075);
    margin-bottom: 16px;
    padding-bottom: 8px;
  }
  > div:nth-child(4) {
    float: right;
  }

  @media only screen and (max-width: 980px) {
    div {
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
  const [question, error] = useGET(`/questions/${question_id}`)
  // console.log(question)
  const {login} = useSelector(state => state.loginReducer);
  // TODO 날짜 계산기 만들기 today, yesterday, 2 days ago~ 한달, 3 months ago ... */
  const calculateDate = (date) => {
    const today = new Date()
    // const day = today.getDate() - date.getDate()
    // const month = today.getMonth() - date.getMonth()
    // const year = today.getFullYear() - date.getFullYear()

    return date
  }
  // console.log(login)
  // TODO 편집 버튼 누르면 아이디, 타이틀, 바디, 태그 상태에 저장하고 edit으로 이동 Link, 편집 후 id값 참고해서 Question 리..다이렉트?


  return (
    <div className="content">
      {error && <div>{error}</div>}
      {question &&
        <QuestionContainerMain >
          <div>
            <h1><a href="www.naver.com">{question.title}</a></h1>
            <BasicBlueButton to="/askquestion">Ask Question</BasicBlueButton>
          </div>
          <div>
            <QuestionDetailDiv><span>Asked</span><span>{calculateDate(question.createdAt)}</span></QuestionDetailDiv>
            {/* TODO 가장 최근에 달린 답변의 날짜 */}
            <QuestionDetailDiv><span>Modified</span><span>{calculateDate(question.modifiedAt)}</span></QuestionDetailDiv>
            <QuestionDetailDiv><span>Viewed</span><span>{question.viewCount} times</span></QuestionDetailDiv>
          </div>
          <QuestionDiv>
            <div>
              <QandAPost body={question.body} name={question.displayName} id={question_id} answerCount={question.answerCount}/>
            </div>
            <div className="answerpart">
              <div>
                <h2>{6} Answers</h2>
                <QandAPost type="answer">답변 map함수</QandAPost>
              </div>
              <div>
                <h2>Your Answer</h2>
                <WriteBoard />
                {login ? null : <LoginWith />}
                <div className="postanswer">
                  <BasicBlueButton to="/questions/detail">Post your Answer</BasicBlueButton>
                  {login ? null : <em>By clicking "Post Your Answer", you agree to our <span className="linktext">terms of service</span>, <span className="linktext">privacy policy</span> and <span className="linktext">cookie policy</span></em>}
                </div>
              </div>
              <h2>{login ? "Not the answer you're looking for? " : null}Browse other questions tagged <TagsDiv /> or <Link className="linktext" to="/askquestion">ask your own question.</Link></h2>
            </div>
          </QuestionDiv>
          <Aside />
        </QuestionContainerMain>
      }
    </div>
  );
}

export default Question;