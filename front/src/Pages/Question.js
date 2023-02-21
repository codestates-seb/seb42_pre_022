import styled from "styled-components";
import { BasicBlueButton } from "../Styles/Buttons";
import Aside from "../Components/Aside";
import QandADiv from "../Components/QandADiv";

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
`
const QuestionDiv = styled.div`
  display: flex;
  flex-direction: column;
  float: left;
  width: calc(100% - 326px);
  .answerpart {
    padding-top: 10px;
    >h2 {
      font-size: 1.4rem;
      margin: 10px 0 8px 0;
      line-height: 1.3;
      font-weight: 400;
    }
  }
  .answer {
    padding: 16px 0 !important;
    border-bottom: 1px solid var(--black-075);
  }
  @media screen and (max-width: 980px) {
    width: 100%;
  }
`
function Question() {
  // TODO 날짜 계산기 만들기 today, yesterday, 2 days ago~ 한달, 3 months ago ... */
  const calculateDate = (date) => {
    return date
  }

  return (
    <QuestionContainerMain>
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
          <h2>{6} Answers</h2>
          <QandADiv className="answer">답변 map함수</QandADiv>
          <div>답변 작성 구역</div>
          <div>(비로그인 시) 로그인 디브</div>
          <div>
            <BasicBlueButton to="/questions/detail">Post your Answer</BasicBlueButton>
            <p>(비로그인 시)By clicking "Post Your Answer", you agree to our terms of service, privacy policy and cookie policy</p>
          </div>
        </div>
      </QuestionDiv>
      <Aside>
      </Aside>
    </QuestionContainerMain>
  );
}

export default Question;