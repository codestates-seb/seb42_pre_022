import styled from "styled-components";
import { BasicBlueButton } from "../Styles/Buttons";
import { Link, useLocation } from "react-router-dom";
import { SearchInput } from "./SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { signupActions } from "../Reducers/signupReducer";

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

  // TODO 1: Signup 버튼에 구현할 함수 만들기
  // TODO 1-1: 유효성 검사(이메일 형식, 이름 공백X, 비밀번호 최소 8자, 영문, 숫자 포함) -> 비밀번호 유효성 검사 생성
  // TODO 1-1-1: 맞지 않으면 input 스타일 변경, 메시지 띄우기
  // TODO 1-2: 유효성 검사를 통과하면 서버에 GET 요청 통해 회원정보 조회해 기존 회원에 있던 이메일인지 확인
  // TODO 1-3: 기존 회원이 아니면 통과 -> 서버에 POST 요청
  // DONE 2: input 입력 상태로 관리하기
  // TODO Question: display name 겹치면 안 되는가???

  const signupButtonHandler = () => {
    const emailTest = /^[a-zA-Z0-9]*[@]{1}[a-zA-Z0-9]+[a-zA-Z0-9]*[.]{1}[a-zA-Z]{1,3}$/;
    const passwordTest = 123;
  }

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

  console.log(state);
  return (
    <LoginFormContainer>
      <LoginForm>
        {(pathname === "/users/signup") ? (
          <LoginFormDiv>
            <label htmlFor="displayname" className="login-title">
              Display name
            </label>
            <LoginInput id="displayname" value={state.displaynameValue} onChange={displaynameInputHandler} />
          </LoginFormDiv>
        ) : null}
        <LoginFormDiv>
          <label htmlFor="email" className="login-title">
            Email
          </label>
          <LoginInput id="email" value={state.emailValue} onChange={emailInputHandler} />
        </LoginFormDiv>
        <LoginFormDiv>
          <label htmlFor="password" className="login-title">
            Password
          </label>
          <LoginInput type="password" id="password" value={state.passwordValue} onChange={passwordInputHandler} />
        </LoginFormDiv>
        {(pathname === "/users/signup") ? (
          <FormNoticeDiv>
            Passwords must contain at least eight characters, including at least 1 alphabet and 1 number.
          </FormNoticeDiv>
        ) : null}
        {/*Log in: 로그인 서버로 넘겨서 응답 잘 받으면 홈으로 페이지 넘기기, 없다는 응답 시 alert 띄우기*/}
        {/*Sign up: display name, email, password 형식에 맞지 않으면 alert, 맞으면 페이지 넘기기*/}
        {(pathname === "/users/signup") ? (
          <LoginButton>
            Sign up
          </LoginButton>
        ) : (
          <LoginButton>
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