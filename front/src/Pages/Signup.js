import styled from "styled-components";
import LoginSignupForm from "../Components/LoginSignupForm";
import LoginWith from "../Components/LoginWith";
import { FormNoticeDiv } from "../Components/LoginSignupForm";
import { ReactComponent as SignupBubbleIcon } from "../assets/signupbubbleicon.svg";
import { ReactComponent as SignupUnlockIcon } from "../assets/signupunlockicon.svg";
import { ReactComponent as SignupTagIcon } from "../assets/signuptagicon.svg";
import { ReactComponent as SignupAchieveIcon } from "../assets/signupachieveicon.svg";
import HelmetTitle from "../Components/HelmetTitle";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const SignupContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--black-050);
  display: flex;
  flex-wrap: wrap;
  padding: 24px;
  justify-content: center;
  align-items: center;
`

const NoticeDiv = styled.div`
  max-width: 420px;
  display: flex;
  flex-direction: column;
  margin: 0 48px 128px 0;
  h1 {
    font-size: 26px;
    font-weight: 500;
    margin-bottom: 32px;
  }
  @media only screen and (max-width: 816px) {
    display: none;
    }
`

const ShortNoticeDiv = styled.div`
  max-width: 420px;
  .shortnotice-title {
    font-size: 20px;
    text-align: center;
    font-weight: 500;
    margin-bottom: 32px;
  }
  @media only screen and (min-width: 817px) {
    display: none;
    }
`

const CommunityDiv = styled.div`
  display: flex;
  margin-bottom: 24px;
  .signup-icon {
    margin-right: 8px;
    color: var(--blue-500);
  }
`

const SignupFormDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const SignupFormNotice = styled(FormNoticeDiv)`
  white-space: pre-wrap;
`

function Signup() {
  const navigate = useNavigate();
  const { login } = useSelector(state => state.loginInfoReducer);

  // 로그인 되어있으면 메인 페이지로 강제 이동시키기
  useEffect(() => {
    if (login) {
      navigate("/");
    }
  }, [login]);

  return (
    <>
      <HelmetTitle title="Sign Up - Stack Overflow" />
      <SignupContainer>
        <NoticeDiv>
          <h1>Join the Stack Overflow community</h1>
          <CommunityDiv>
            <SignupBubbleIcon className="signup-icon" />
            Get unstuck — ask a question
          </CommunityDiv>
          <CommunityDiv>
            <SignupUnlockIcon className="signup-icon" />
            Unlock new privileges like voting and commenting
          </CommunityDiv>
          <CommunityDiv>
            <SignupTagIcon className="signup-icon" />
            Save your favorite tags, filters, and jobs
          </CommunityDiv>
          <CommunityDiv>
            <SignupAchieveIcon className="signup-icon" />
            Earn reputation and badges
          </CommunityDiv>
          <SignupFormNotice>
            {`Collaborate and share knowledge with a private group for FREE.\n`}
            <span>Get Stack Overflow for Teams free for up to 50 users</span>.
          </SignupFormNotice>
        </NoticeDiv>
        <SignupFormDiv>
          <ShortNoticeDiv>
            <div className="shortnotice-title">Create your Stack Overflow account. It’s free and only takes a minute.</div>
          </ShortNoticeDiv>
          <LoginWith />
          <LoginSignupForm />
        </SignupFormDiv>
      </SignupContainer>
    </>
  );
}

export default Signup;