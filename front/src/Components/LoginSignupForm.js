import styled from "styled-components";
import { BasicBlueButton } from "../Styles/Buttons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SearchInput } from "./SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { signupActions } from "../Reducers/signupReducer";
import { useState } from "react";
import { ReactComponent as ErrorIcon } from "../assets/errorIcon.svg";
// import useGET from "../util/useGET";


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
  .invalid-password {
    margin-bottom: 12px;
  }
`

const LoginInput = styled(SearchInput)`
  padding-left: 0.7em;
  margin: 2px 0;
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
  const { pathname } = useLocation();
  const state = useSelector(state => state.signupReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [data, error] = useGET("/users?page=1");

  // invalid css를 위한 상태 설정
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const emailTest = /^[a-zA-Z0-9]*[@]{1}[a-zA-Z0-9]+[a-zA-Z0-9]*[.]{1}[a-zA-Z]{1,3}$/;
  const passwordTest = /^[a-zA-Z]{1,}[0-9]{1,}|[0-9]{1,}[a-zA-Z]{1,}$/;

  // TODO 1: Signup 버튼에 구현할 함수 만들기
  // TODO 1-2: 유효성 검사를 통과하면 서버에 GET 요청 통해 회원정보 조회해 기존 회원에 있던 이메일인지 확인
  // TODO 1-3: 기존 회원이 아니면 통과 -> 서버에 POST 요청

  // TODO Question: display name 겹치면 안 되는가??? -> 지금은 가능

  // signup, login 버튼을 눌렀을 때 실행되는 함수 (유효성 검사, 서버 요청 실행)
  const signupButtonHandler = (e) => {
    e.preventDefault();
    if (!emailTest.test(state.emailValue) || !passwordTest.test(state.passwordValue)) {
      if (!emailTest.test(state.emailValue)) {
        setEmailValid(false);
      } else {
        setEmailValid(true);
      };

      if (!passwordTest.test(state.passwordValue)) {
        setPasswordValid(false);
      } else {
        setPasswordValid(true);
      };
    } else {
      setEmailValid(true);
      setPasswordValid(true);
      // body에 보낼 객체 설정
      const req = {
        "displayName": state.displaynameValue.length === 0 ? null : state.displaynameValue,
        "email": state.emailValue,
        "password": state.passwordValue
      }
      console.log(req);
      // TODO: value 비우기 전에 서버에 먼저 POST 요청
      const data = "";
      dispatch(signupActions.changeDisplaynameValue({ data }));
      dispatch(signupActions.changeEmailValue({ data }));
      dispatch(signupActions.changePasswordValue({ data }));
      // TODO: 회원가입이 완료되었습니다 alert 띄우기
      alert("Your Sign up is Completed!")
      navigate("/users/login");
    }
  }
  
  const loginButtonHandler = (e) => {
    e.preventDefault();
    if (!emailTest.test(state.loginEmail) || !passwordTest.test(state.loginPassword)) {
      if (!emailTest.test(state.loginEmail)) {
        setEmailValid(false);
      } else {
        setEmailValid(true);
      };

      if (!passwordTest.test(state.loginPassword)) {
        setPasswordValid(false);
      } else {
        setPasswordValid(true);
      };
    } else {
      setEmailValid(true);
      setPasswordValid(true);
      const req = {
        "username": state.loginEmail,
        "password": state.loginPassword
      }
      console.log(req);
      //TODO: 서버에 POST로 로그인 요청
      const data = "";
      dispatch(signupActions.changeLoginEmail({ data }));
      dispatch(signupActions.changeLoginPassword({ data }));
      // navigate("/");
    }
  }

  // input값을 상태로 관리하는 함수
  const displaynameInputHandler = (e) => {
    const data = e.target.value;
    dispatch(signupActions.changeDisplaynameValue({ data }));
  }

  const emailInputHandler = (e) => {
    const data = e.target.value;
    dispatch(signupActions.changeEmailValue({ data }));
  }

  const passwordInputHandler = (e) => {
    const data = e.target.value;
    dispatch(signupActions.changePasswordValue({ data }));
  }

  const loginEmailHandler = (e) => {
    const data = e.target.value;
    dispatch(signupActions.changeLoginEmail({ data }));
  }

  const loginPasswordHandler = (e) => {
    const data = e.target.value;
    dispatch(signupActions.changeLoginPassword({ data }));
  }


  return (
    <LoginFormContainer>
      <LoginForm>
        {(pathname === "/users/signup") ? (
          <LoginFormDiv>
            <label htmlFor="displayname" className="login-title">
              Display name
            </label>
            <div className="invalid-wrap">
              <LoginInput id="displayname" value={state.displaynameValue} onChange={displaynameInputHandler} />
            </div>
          </LoginFormDiv>
        ) : null}
        <LoginFormDiv>
          <label htmlFor="email" className="login-title">
            Email
          </label>
          <div className="invalid-wrap">
            <LoginInput id="email" value={(pathname === "/users/signup") ? state.emailValue : state.loginEmail}
            onChange={(pathname === "/users/signup") ? emailInputHandler : loginEmailHandler} className={emailValid ? "" : "invalid"} />
            {emailValid ? null : <ErrorIcon className="error-icon" />}
          </div>
          {emailValid ? null : (
              <div className="invalid-notice">
                Not a valid email address.
              </div>
            )}
        </LoginFormDiv>
        <LoginFormDiv>
          <label htmlFor="password" className="login-title">
            Password
          </label>
          <div className="invalid-wrap">
          <LoginInput type="password" id="password" value={(pathname === "/users/signup") ? state.passwordValue : state.loginPassword}
          onChange={(pathname === "/users/signup") ? passwordInputHandler : loginPasswordHandler} className={passwordValid ? "" : "invalid"} />
          {passwordValid ? null : <ErrorIcon className="error-icon" />}
          </div>
          {passwordValid ? null : (
              <div className="invalid-notice invalid-password">
                Not a valid password.
              </div>
            )}
        </LoginFormDiv>
        {(pathname === "/users/signup") ? (
          <FormNoticeDiv>
            Passwords must contain at least eight characters, including at least 1 alphabet and 1 number.
          </FormNoticeDiv>
        ) : null}
        {(pathname === "/users/signup") ? (
          <LoginButton onClick={signupButtonHandler}>
            Sign up
          </LoginButton>
        ) : (
          <LoginButton onClick={loginButtonHandler}>
            Log in
          </LoginButton>)}
        {(pathname === "/users/signup") ? (
          <FormNoticeDiv>
            By clicking “Sign up”, you agree to our <span>terms of service</span>, <span>privacy policy</span> and <span>cookie policy</span>
          </FormNoticeDiv>
        ) : null}
      </LoginForm>
      {(pathname === "/users/signup") ? (
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