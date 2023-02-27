import styled from "styled-components";
import { LogoDiv } from "../Components/Footer";
import sprites from "../assets/sprites.svg";
import LoginWith from "../Components/LoginWith";
import LoginSignupForm from "../Components/LoginSignupForm";
import HelmetTitle from "../Components/HelmetTitle";

//TODO: Footer에 있는 LogoDiv Styles로 옮기고 경로 수정하기

const LoginContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--black-050);
  display: flex;
  padding: 24px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .login-logo {
    margin-bottom: 16px;
  }
`

function Login() {

  return (
    <>
    <HelmetTitle title="Log In - Stack Overflow" />
    <LoginContainer>
      <div className="login-logo">
        <LogoDiv url={sprites} />
      </div>
      <LoginWith />
      <LoginSignupForm />
    </LoginContainer>
    </>
  );
}

export default Login;