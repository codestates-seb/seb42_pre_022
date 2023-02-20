import styled from "styled-components";
import { BasicBlueButton } from "../Styles/Buttons";
import Aside from "../Components/Aside";

const QuestionContainerDiv = styled.div`
  display: table;
  > div {
    display: flex;
  }
  > div:nth-child(2) {
    border-bottom: 1px solid var(--black-075);
    margin-bottom: 16px;
    padding-bottom: 8px;
  }
  > div:nth-child(3) {
    float: left;
    width: calc(100% - 326px);
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
const QuestionMain = styled.main`
  display: flex;
  flex-direction: column;
`
const QAWrapDiv = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
`



function Question() {
  // TODO 날짜 계산기 만들기 today, yesterday, 2 days ago~ 한달, 3 months ago ... */
  const calculateDate = (date) => {
    return date
  }

  return (
    <QuestionContainerDiv>
      <div>
        <h1>(제목)Cursor Resize on scroll bar of div</h1>
        <BasicBlueButton to="/questions/ask">Ask Question</BasicBlueButton>
      </div>
      <div>
        <QuestionDetailDiv><span>Asked</span><span>{calculateDate("today")}</span></QuestionDetailDiv>
        {/* TODO 가장 최근에 달린 답변의 날짜 */}
        <QuestionDetailDiv><span>Modified</span><span>{calculateDate("today")}</span></QuestionDetailDiv>
        <QuestionDetailDiv><span>Viewed</span><span>{"7"} times</span></QuestionDetailDiv>
      </div>
      <QuestionMain>
        <div>
          <QAWrapDiv>
            <div>보트 구역</div>
            <div>질문 구역</div>
            <span>알수 없음</span>
            <div>코멘트 구역</div>
          </QAWrapDiv>
        </div>
        <div>
          답변 블록
          <div>6 Answers 필터 생략</div>
          <QAWrapDiv>첫 번째 답변 map함수</QAWrapDiv>
          <QAWrapDiv>두 번째 답변</QAWrapDiv>
          <div>답변 작성 구역</div>
          <div>(비로그인 시) 로그인 디브</div>
          <div>
            <BasicBlueButton to="/questions/detail">Post your Answer</BasicBlueButton>
            <p>(비로그인 시)By clicking "Post Your Answer", you agree to our terms of service, privacy policy and cookie policy</p>
          </div>
        </div>
      </QuestionMain>
      <Aside>
      </Aside>
    </QuestionContainerDiv>
  );
}

export default Question;