import styled from "styled-components";
import { BasicBlueButton } from "../Styles/Buttons";
import { Link, useLocation } from "react-router-dom";

const LoginFormContainer = styled.div`
  margin-bottom: 16px;
  width: 90%;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const SignupLink = styled.div`
  padding: 24px;
  display: flex;
  .signup-link-notice {
    margin-right: 6px;
  }
  a {text-decoration: none;color: var(--blue-600);}a:visited {background: none;}a:active {background: none;}a:hover {color: var(--blue-500)}
`

const LoginForm = styled.div`
  width: 100%;
  max-width: 300px;
  padding: 0 24px 24px 24px;
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

export const FormNoticeDiv = styled.div`
  font-size: 12px;
  color: var(--fc-light);
  span {color: var(--blue-600);cursor: pointer;:hover{color: var(--blue-500)}}
`

const LoginFormDiv = styled.div`
  margin-top: 24px;
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
  margin: 24px 0;
  display: block;
  text-align: center;
`

function LoginSignupForm() {
  const location = useLocation();
  return (
    <LoginFormContainer>
      <LoginForm>
        {(location.pathname === "/users/signup") ? (
          <LoginFormDiv>
            <label htmlFor="displayname" className="login-title">
              Display name
            </label>
            <LoginInput id="displayname" />
          </LoginFormDiv>
        ) : null}
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
        {(location.pathname === "/users/signup") ? (
          <FormNoticeDiv>
            Passwords must contain at least eight characters, including at least 1 letter and 1 number.
          </FormNoticeDiv>
        ) : null}
        {/*Log in: 로그인 서버로 넘겨서 응답 잘 받으면 홈으로 페이지 넘기기, 없다는 응답 시 alert 띄우기*/}
        {/*Sign up: display name, email, password 형식에 맞지 않으면 alert, 맞으면 페이지 넘기기*/}
        {(location.pathname === "/users/signup") ? (
          <LoginButton>
            Sign up
          </LoginButton>
        ) : (
          <LoginButton>
            Log in
          </LoginButton>)}
        {(location.pathname === "/users/signup") ? (
          <FormNoticeDiv>
            By clicking “Sign up”, you agree to our <span>terms of service</span>, <span>privacy policy</span> and <span>cookie policy</span>
          </FormNoticeDiv>
        ) : null}
      </LoginForm>
      {(location.pathname === "/users/signup") ? (
        <SignupLink>
          <div className="signup-link-notice">Already have an account?</div>
          <Link to="/users/login">Log in</Link>
        </SignupLink>
      ) : (
        <SignupLink>
          <div className="signup-link-notice">Don’t have an account?</div>
          <Link to="/users/signup">Sign up</Link>
        </SignupLink>
      )}
    </LoginFormContainer>
  )
}

export default LoginSignupForm;