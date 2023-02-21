import styled from "styled-components";
import { LogoDiv } from "../Components/Footer";
import sprites from "../assets/sprites.svg";
import { BasicBlueButton } from "../Styles/Buttons";
import LoginWith from "../Components/LoginWith";
import { Link } from "react-router-dom";

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
  .login-form {
    margin-bottom: 16px;
    width: 90%;
    max-width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .signup-link {
    padding: 24px;
    display: flex;
    .signup-link-notice {
      margin-right: 6px;
    }
    a {text-decoration: none;color: var(--blue-600);}a:visited {background: none;}a:active {background: none;}a:hover {color: var(--blue-500)}
  }
`

const LoginForm = styled.div`
  width: 100%;
  max-width: 300px;
  padding: 24px;
  background-color: var(--white);
  border-radius: 7px;
  box-shadow: var(--bs-xl);
  .login-title {
    margin: 4px 0;
    font-size: 14px;
    font-weight: 600;
    color: var(--black-900);
    cursor: pointer;
  }
`

const LoginFormDiv = styled.div`
  margin: 24px 0;
`

const LoginInput = styled.input`
  display: block;
  width: 100%;
  margin: 2px 0;
  padding: 0.6em 0.7em;
  color: var(--black-700);
  line-height: calc(15/13);
  border: 1px solid var(--black-200);
  border-radius: 3px;
  background-color: var(--white);
  outline: 0;
  :focus {
    border-color: var(--blue-300);
    box-shadow: 0 0 0 4px hsla(206, 100%, 40%, .15);
  }
  ::placeholder {color: var(--black-200)}
`

const LoginButton = styled(BasicBlueButton)`
  width: 100%;
  padding: 12px;
  display: block;
  text-align: center;
`

function Login() {

  return (
    <LoginContainer>
      <div className="login-logo">
        <LogoDiv url={sprites} />
      </div>
      <LoginWith />
      <div className="login-form">
        <LoginForm>
          <LoginFormDiv>
            <label htmlFor="email" className="login-title">
              Email
            </label>
            <LoginInput id="email" />
          </LoginFormDiv>
          <LoginFormDiv>
            <label htmlFor="password" className="login-title">
              Password
            </label>
            <LoginInput type="password" id="password" />
          </LoginFormDiv>
          <LoginButton>Log in</LoginButton>
        </LoginForm>
        <div className="signup-link">
          <div className="signup-link-notice">Don’t have an account?</div>
          <Link to="/users/signup">Sign up</Link>
        </div>
      </div>
    </LoginContainer>
  );
}

export default Login;