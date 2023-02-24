import styled from "styled-components";
import askbackground from "../assets/askbackground.svg";
import { BasicBlueButton } from "../Styles/Buttons";
import WriteBoard from "../Components/WriteBoard";
import { SearchInput } from "../Components/SearchBar";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { askquestionActions } from "../Reducers/askquestionReducer";
import { useState, useEffect } from "react";
import { ReactComponent as ErrorIcon } from "../assets/errorIcon.svg";

// TODO: 기능 구현
// DONE 1. 글자 수 조건이 맞아야 다음 칸 작성 가능(tag는 생각해보기)
// DONE 1-1. 제목 redux 상태 관리 구현
// DONE 1-2. 이전 작업이 적합하게 완료되어야 다음 화면 열림
// DONE 1-3. 질문 상세 내용 redux 상태 관리 구현
// DONE 1-4. 질문 상세 내용 20자 이상이어야 다음 화면 열림 -> 버튼 유무는 구현
// DONE 1-5. tag 구현
// TODO 2. 로그인 되어있고 모든 value가 작성되면 질문 등록 버튼을 눌렀을 때 질문 등록
// -> askquestion 버튼 눌렀을 때 로그인을 체크하면 이 과정을 생략할 수 있음
// -> 어쨌든 구현해야 함
// DONE 3. Discard draft 눌렀을 경우 모든 value를 비우고 홈으로 이동 -> localstorage 비우기
// DONE 3-1. Discard draft 눌렀을 때 확인창 띄우기 (alert 또는 window.confirm 활용)
// DONE 4. 다른 페이지로 이동 시 작성 중인 데이터 저장 -> localstorage에 저장
// DONE Question: 서버에서 질문 작성 받을 때 tags도 저장할 수 있도록

const AskContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1264px;
  display: flex;
  padding: 0 24px 24px 24px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 48px;
  color: var(--black-800);
  .disabled {
    pointer-events: none;
    cursor: not-allowed;
    background-color: var(--black-050);
    z-index: 999;
    color: var(--black-200);
  }
`

const TitleNotice = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const QuestionTitle = styled.div`
  margin-bottom: 12px;
  padding: 24px;
  display: flex;
  align-items: center;
  h1 {margin: 24px 0; line-height: 1.3; font-size: 24px; font-weight: 600;}
  @media only screen and (min-width: 1050px) {height: 130px; background-image: url(${props => props.url}); background-repeat: no-repeat; background-position: right bottom;}
`

const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const NoticeDiv = styled.div`
  width: 70%;
  padding: 24px;
  background-color: var(--blue-050);
  border: 1px solid var(--powder-400);
  border-radius: 3px;
  color: var(--black-700);
  h2 {font-weight: 400; font-size: 20px; margin-bottom: 8px;}
  div {font-size: 14px; span {color: var(--blue-600);}} .p-end {margin-bottom: 12px;}
  h5 {margin-bottom: 8px;} ul {margin-left: 30px; font-size: 12px;}
  @media only screen and (max-width: 1050px) {width: 100%;}
`

const FormDiv = styled.div`
  width: 70%;
  height: max-content;
  padding: 24px;
  margin-top: 16px;
  border: 1px solid var(--black-075);
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 12px;
  div {
    margin: 2px 0;
  }
  .button {
    margin-top: 8px;
  }
  .button-disabled {
    pointer-events: none;
    opacity: 0.5;
  }
  .form-title {
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
  }
  .textarea-div {width: 100%; margin: 0; border: 1px solid var(--black-200); border-radius: 3px;}
  @media only screen and (max-width: 1050px) {width: 100%;}
`

const FormInput = styled(SearchInput)`
  padding-left: 0.7em;
  margin: 2px 0;
  ::placeholder {color: var(--black-200)}
`

const TagInput = styled.div`
  flex: 1;
  display: flex;
  width: 100%;
  padding: 0.6em 0.5em;
  color: var(--black-700);
  line-height: calc(15/13);
  border: 1px solid var(--black-200);
  border-radius: 3px;
  font-size: 13px;
  background-color: var(--white);
  input {
    border-style: none;
    outline: none;
  }
  :focus-within {
    border-color: var(--blue-300);
    box-shadow: 0 0 0 4px hsla(206, 100%, 40%, .15);
  }
  ul {
    list-style: none;
    display: flex;
    align-items: center;
    margin-right: 6px;
  }
  li {
    margin: 0 4px;
    padding: 4px;
    background-color: var(--powder-100);
    border-radius: 3px;
    color: var(--powder-700);
  }
  span {
    padding: 4px;
  }
  button {
    padding: 0 4px;
    margin-left: 4px;
    font-size: 13px;
    font-weight: bold;
    background-color: transparent;
    border-style: none;
    border-radius: 3px;
    color: var(--powder-700);
    cursor: pointer;
    :hover {
      background-color: var(--powder-800);
      color: var(--white);
    }
  }
`

const PostDiv = styled.div`
  width: 70%;
  padding: 16px 0;
  font-size: 12px;
  display: flex;
  justify-content: flex-start;
  .discard {
    padding: 8px;
    margin-left: 8px;
    color: var(--red);
    border-radius: 3px;
    border: 4px solid var(--white);
    cursor: pointer;
    :hover {background-color: var(--red-050);}
    :active {background-color: var(--red-100); border: 4px solid var(--red-100);}
  }
  @media only screen and (max-width: 1050px) {width: 100%;}
`

function Askquestion() {
  const state = useSelector(state => state.askquestionReducer);
  const navigate = useNavigate();
  // 작성 가능 상태를 제어하는 상태는 useState 활용
  const [titleDone, setTitleDone] = useState(() => {
    const titleDoneData = localStorage.getItem("titleDone");
    if (titleDoneData !== null && state.titleValue !== "") {
      return JSON.parse(titleDoneData);
    } else {
      return false;
    }
  })
  const [questionDone, setQuestionDone] = useState(() => {
    const questionDoneData = localStorage.getItem("questionDone");
    if (questionDoneData !== null && state.questionValue.replaceAll(/<[^>]*>/g, '') !== "") {
      return JSON.parse(questionDoneData);
    } else {
      return false;
    }
  });
  const [tagStart, setTagStart] = useState(false);

  // invalid css를 위한 상태 설정
  const [titleValid, setTitleValid] = useState(true);
  const [questionValid, setQuestionValid] = useState(true);

  const dispatch = useDispatch();

  // 삭제 버튼 핸들러
  const discardPost = () => {
    if (window.confirm("Are you sure you want to discard this question?")) {
      localStorage.removeItem("titleValue"); localStorage.removeItem("questionValue"); localStorage.removeItem("titleDone"); localStorage.removeItem("questionDone"); localStorage.removeItem("tagStart");
      window.scrollTo(0,0);
      window.location.reload();
    }
  }

  // 작성 버튼 핸들러
  const postButtonHandler = (e) => {
    e.preventDefault();
    if ((state.titleValue === "" || state.titleValue === null) || (state.questionValue === null || state.questionValue.replaceAll(/<[^>]*>/g, '').length < 20)) {
      if (state.titleValue === "" || state.titleValue === null) {
        setTitleValid(false);
      } else {
        setTitleValid(true);
      };

      if (state.questionValue === null || state.questionValue.replaceAll(/<[^>]*>/g, '').length < 20) {
        setQuestionValid(false);
      } else {
        setQuestionValid(true);
      };
    } else {
      if (window.confirm("Are you sure you want to post this question?")) {
        const req = {
          "userId": "",
          "title": state.titleValue,
          "body": state.questionValue,
          "tags": state.tags
        }
        console.log(req);
        // TODO: 서버에 req 객체 담아 POST 요청 보내기
        // TODO: 200 OK 시 상태 모두 비우고 alert 질문 등록 완료 / error 시 alert 오류 발생 -> 원래 자리로 돌아오기
        // navigate("/");
      }
    }
  }

  // 제목 관련 함수 -> 입력 값 상태 관리, 다음으로 넘어가기
  const titleInputHandler = (e) => {
    const data = e.target.value;
    dispatch(askquestionActions.changeTitleValue({ data }));
  }

  const titleNextHandler = () => {
    if (state.titleValue.length > 0) {
      setTitleDone(true);
      localStorage.setItem("titleDone", true);
    } else {
      setTitleDone(false);
      localStorage.setItem("titleDone", false);
    }
  }

  // 질문 본문 관련 함수 -> 입력 값 상태 관리, 다음으로 넘어가기
  const questionNextHandler = () => {
    setTagStart(true);
    localStorage.setItem("tagStart", true);
  }
  const questionInputHandler = (question) => {
    const data = question;
    const originData = data.replaceAll(/<[^>]*>/g, '');
    dispatch(askquestionActions.changeQuestionValue({ data }));
    if (originData.length >= 20) {
      setQuestionDone(true);
      localStorage.setItem("questionDone", true)
    } else {
      setQuestionDone(false);
      localStorage.setItem("questionDone", false)
    }
  }
  
  // 상태 잘 저장되는지 확인
  console.log(state);

  return (
    <AskContainer>
      <TitleNotice>
        <QuestionTitle url={askbackground}>
          <h1>Ask a public question</h1>
        </QuestionTitle>
        <FlexCenter>
          <NoticeDiv>
            <h2>Writing a good question</h2>
            <div>You’re ready to <span>ask</span> a <span>programming-related question</span> and this form will help guide you through the process.</div>
            <div className="p-end">Looking to ask a non-programming question? See <span>the topics here</span> to find a relevant site.</div>
            <h5>Steps</h5>
            <ul>
              <li>Summarize your problem in a one-line title.</li>
              <li>Describe your problem in more detail.</li>
              <li>Describe what you tried and what you expected to happen.</li>
              <li>Add “tags” which help surface your question to members of the community.</li>
              <li>Review your question and post it to the site.</li>
            </ul>
          </NoticeDiv>
        </FlexCenter>
      </TitleNotice>
      <FormDiv className="title">
        <div>
          <label htmlFor="title" className="form-title">Title</label>
          <div>Be specific and imagine you’re asking a question to another person.</div>
        </div>
        <div className="invalid-wrap">
          <FormInput type="text" id="title" placeholder="e.g Is there an R function for finding the index of an element in a vector?"
            value={state.titleValue} onChange={titleInputHandler}
            className={titleValid ? "" : "invalid"} />
          {titleValid ? null : <ErrorIcon className="error-icon" />}
        </div>
        {titleValid ? null : (
          <div className="invalid-notice">
            Title is missing.
          </div>
        )}
        <BasicBlueButton className="button" onClick={titleNextHandler}>Next</BasicBlueButton>
      </FormDiv>
      <FormDiv className={titleDone ? "" : "disabled"}>
        <div>
          <div className="form-title">What are the details of your problem?</div>
          <div>Introduce the problem and expand on what you put in the title. Minimum 20 characters.</div>
        </div>
        <WriteBoard postBody={state.questionValue} inputHandler={questionInputHandler} />
        {questionValid ? null : (
          <div className="invalid-notice">
            Question must be at least 20 characters.
          </div>
        )}
        {titleDone ? (<BasicBlueButton className={questionDone ? "button" : "button button-disabled"} onClick={questionNextHandler}>Next</BasicBlueButton>) : null}
      </FormDiv>
      <FormDiv className={(titleDone && tagStart) ? "" : "disabled"}>
        <div>
          <label htmlFor="tags" className="form-title">Tags</label>
          <div>Add up to 5 tags to describe what your question is about. Start typing to see suggestions.</div>
        </div>
        <TagInput>
          <ul>
            {state.tags.map((tag, index) => (
              <li key={index}>
                <span>{tag}
                  <button onClick={() => {
                    const indexToRemove = index;
                    dispatch(askquestionActions.removeTag({ indexToRemove }))
                  }}>x</button>
                </span>
              </li>
            ))}
          </ul>
          <input type="text" id="tags" placeholder={state.tags.length === 0 ? "e.g. (ajax iphone string)" : ""}
            onKeyUp={(event) => {
              if (event.key === "Enter") {
                const data = event.target.value;
                dispatch(askquestionActions.addTag({ data }));
                event.target.value = "";
              }
            }} />
        </TagInput>
      </FormDiv>
      <PostDiv>
        <BasicBlueButton onClick={postButtonHandler}>Post your question</BasicBlueButton>
        <div className="discard" onClick={discardPost}>Discard draft</div>
      </PostDiv>
    </AskContainer>
  );
}

export default Askquestion;