import styled from "styled-components";
import askbackground from "../assets/askbackground.svg";
import { BasicBlueButton } from "../Styles/Buttons";
import WriteBoard from "../Components/WriteBoard";
import { SearchInput } from "../Components/SearchBar";

//TODO: 제목 간격 조정
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
  .form-title {
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
  }
  .textarea-div {width: 100%; margin: 0; border: 1px solid var(--black-200); border-radius: 3px;}
  @media only screen and (max-width: 1050px) {width: 100%;}
`

// input창 Header에서 재활용 가능 -> styles에 옮기기
const FormInput = styled(SearchInput)`
  padding-left: 0.7em;
  margin: 2px 0;
  ::placeholder {color: var(--black-200)}
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
    cursor: pointer;
  }
`

function Askquestion() {

  console.log(String(window.location.href).slice(21))
  //TODO: textarea에 작성된 글자 효과 주기 -> 굵게, 기울기, ...
  //TODO: 나머지 레이아웃 먼저 구성하고 textarea 구성하기

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
        <FormInput type="text" id="title" placeholder="e.g Is there an R function for finding the index of an element in a vector?" />
        <BasicBlueButton className="button">Next</BasicBlueButton>
      </FormDiv>
      <FormDiv>
        <div>
          <div className="form-title">What are the details of your problem?</div>
          <div>Introduce the problem and expand on what you put in the title. Minimum 20 characters.</div>
        </div>
        <WriteBoard />
        <BasicBlueButton className="button">Next</BasicBlueButton>
      </FormDiv>
      <FormDiv>
        <div>
          <label htmlFor="tags" className="form-title">Tags</label>
          <div>Add up to 5 tags to describe what your question is about. Start typing to see suggestions.</div>
        </div>
        <FormInput type="text" id="tags" placeholder="e.g. (ajax iphone string)" />
      </FormDiv>
      <PostDiv>
        <BasicBlueButton>Post your question</BasicBlueButton>
        <div className="discard">Discard draft</div>
      </PostDiv>
    </AskContainer>
  );
}

export default Askquestion;