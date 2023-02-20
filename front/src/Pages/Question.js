import styled from "styled-components";
import { BasicBlueButton } from "../Styles/Buttons";
import Aside from "../Components/Aside";
import UserCard from "../Components/UserCard";
import { ReactComponent as UpVoteIcon } from "../assets/upVoteIcon.svg";
import { ReactComponent as DownVoteIcon } from "../assets/downVoteIcon.svg";
import { ReactComponent as BookmarkIcon } from "../assets/bookmarkIcon.svg";
import { ReactComponent as HistoryIcon } from "../assets/historyIcon.svg";

const QuestionContainerMain = styled.main`
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
const QuestionDiv = styled.div`
  display: flex;
  flex-direction: column;
`
const QAWrapDiv = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  > div:first-child {
    padding-right: 16px;
    vertical-align: top;
    grid-column: 1;
  }
`
const VoteContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  > div {
    display:flex;
    justify-content: center;
    color: var(--black-500);
    margin: 2px;
    font-size: 1.5rem;
  }
  .bookmark {
    padding: 4px 0;
  }
  
  .history {
    padding: 6px 0;
    margin: 0 auto;
    > svg {
      margin-left: -2px;
    }
  }
`
const VoteButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  margin: 2px;
  > svg {
    fill: var(--black-200);
    vertical-align: bottom;
  }

`
const WriterRelatedDiv = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 16px 0;
  font-size: 13px;
  color: var(--black-500);
  > div {
    margin: 4px 0;
    > span {
      display:inline-block;
      cursor:pointer;
    }
  }
  .qapost {
    flex: 1 auto;
    margin-left: -4px;
    > span {
      margin: -4px 4px;
    }
    > span:hover {
      color: var(--black-400);
    }
  }
  .qamodified {
    padding: 0 6px;
    > span {
      font-size: 12px;
      color: var(--blue);
    }
    > span:hover {
      color: var(--blue-500);
    }
  }
  .qawriter {
    margin-top: 0;
    padding: 6px;
    border-radius: 3px;
    width: 200px;
    background-color: var(--powder);
    font-size: 12px;
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
        <h1>(제목)Cursor Resize on scroll bar of div</h1>
        <BasicBlueButton to="/questions/ask">Ask Question</BasicBlueButton>
      </div>
      <div>
        <QuestionDetailDiv><span>Asked</span><span>{calculateDate("today")}</span></QuestionDetailDiv>
        {/* TODO 가장 최근에 달린 답변의 날짜 */}
        <QuestionDetailDiv><span>Modified</span><span>{calculateDate("today")}</span></QuestionDetailDiv>
        <QuestionDetailDiv><span>Viewed</span><span>{"7"} times</span></QuestionDetailDiv>
      </div>
      <QuestionDiv>
        <div>
          <QAWrapDiv>
            <div>
              <VoteContainerDiv>
                <VoteButton><UpVoteIcon></UpVoteIcon></VoteButton>
                <div>0</div>
                <VoteButton><DownVoteIcon></DownVoteIcon></VoteButton>
                <VoteButton className="bookmark"><BookmarkIcon></BookmarkIcon></VoteButton>
                <VoteButton className="history"><HistoryIcon></HistoryIcon></VoteButton>
              </VoteContainerDiv>
            </div>
            <div>
              <div>
                본문 내용
                <p>I'm starting a new Kotlin project, and I used Gradle 7.2 to generate the project structure and the buildSrc scripts. I'm not including them here because I have not changed them - I'm just using whatever Gradle generated.</p>
                <p>I'm getting the following message as part of the build:</p>
                <p>'compileJava' task (current target is 17) and 'compileKotlin' task (current target is 1.8) jvm target compatibility should be set to the same Java version.</p>
                <p>I can't find where in the buildSrc and the generated Gradle files the 1.8 target is set. How can I tell the Kotlin compiler to use the Java 17 target?</p>
                <p>I'm starting a new Kotlin project, and I used Gradle 7.2 to generate the project structure and the buildSrc scripts. I'm not including them here because I have not changed them - I'm just using whatever Gradle generated.</p>
                <p>I'm getting the following message as part of the build:</p>
                <p>'compileJava' task (current target is 17) and 'compileKotlin' task (current target is 1.8) jvm target compatibility should be set to the same Java version.</p>
                <p>I can't find where in the buildSrc and the generated Gradle files the 1.8 target is set. How can I tell the Kotlin compiler to use the Java 17 target?</p>
              </div>
              <div>
                태그 컴포넌트
              </div>
              <WriterRelatedDiv>
                <div className="qapost"><span>Share</span><span>Edit</span><span>Follow</span></div>
                <div className="qamodified"><span>수정됐으면 ? 수정한 날짜 edited Feb 13 at 6:24 : null</span></div>
                <div className="qawriter">
                  <div>asked {"Feb 10 at 18:04"}</div>
                  <UserCard></UserCard>
                </div>
              </WriterRelatedDiv>
            </div>
            <span>코멘트 개수- 화면엔 안나옴</span>
            <div>코멘트 구역</div>
          </QAWrapDiv>
        </div>
        <div>
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
      </QuestionDiv>
      <Aside>
      </Aside>
    </QuestionContainerMain>
  );
}

export default Question;