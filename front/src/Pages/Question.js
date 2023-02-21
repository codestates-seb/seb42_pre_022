import styled from "styled-components";
import { BasicBlueButton } from "../Styles/Buttons";
import Aside from "../Components/Aside";
import QandADiv from "../Components/QandADiv";
import TagsDiv from "../Components/TagsDiv";
import { Link } from "react-router-dom";
import WriteBoard from "../Components/WriteBoard";
import { useSelector } from "react-redux";
import LoginWith from "../Components/LoginWith";

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
      margin: 0;
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
  const state = useSelector(state => state.loginReducer);
  // TODO 날짜 계산기 만들기 today, yesterday, 2 days ago~ 한달, 3 months ago ... */
  const calculateDate = (date) => {
    return date
  }

  return (
    <div className="content">
      <QuestionContainerMain >
        <div>
          <h1><a href="www.naver.com">(제목)Cursor Resize on scroll bar of div</a></h1>
          <BasicBlueButton to="/askquestion">Ask Question</BasicBlueButton>
        </div>
        <div>
          <QuestionDetailDiv><span>Asked</span><span>{calculateDate("today")}</span></QuestionDetailDiv>
          {/* TODO 가장 최근에 달린 답변의 날짜 */}
          <QuestionDetailDiv><span>Modified</span><span>{calculateDate("today")}</span></QuestionDetailDiv>
          <QuestionDetailDiv><span>Viewed</span><span>{"7"} times</span></QuestionDetailDiv>
        </div>
        <QuestionDiv>
          <div>
            <QandADiv />
          </div>
          <div className="answerpart">
            <div>
              <h2>{6} Answers</h2>
              <QandADiv type="answer">답변 map함수</QandADiv>
            </div>
            <div>
              <h2>Your Answer</h2>
              <WriteBoard />
              {state.login ? null : <LoginWith />}
              <div className="postanswer">
                <BasicBlueButton to="/questions/detail">Post your Answer</BasicBlueButton>
                {state.login ? null : <em>By clicking "Post Your Answer", you agree to our <span className="linktext">terms of service</span>, <span className="linktext">privacy policy</span> and <span className="linktext">cookie policy</span></em>}
              </div>
            </div>
            <h2>{state.login ? "Not the answer you're looking for? " : null}Browse other questions tagged <TagsDiv /> or <Link className="linktext" to="/askquestion">ask your own question.</Link></h2>
          </div>
        </QuestionDiv>
        <Aside />
      </QuestionContainerMain>
    </div>
  );
}

export default Question;