import styled from "styled-components";
import { LogoDiv } from "../Components/Footer";
import sprites from "../assets/sprites.svg";

//TODO: Footer에 있는 LogoDiv Styles로 옮기고 경로 수정하기
const LoginContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1264px;
  display: flex;
  padding: 24px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  background-color: var(--black-050);
  .login-logo {
    margin-bottom: 16px;
  }
  .login-with, .login-form {
    margin-bottom: 16px;
    width: 90%;
    max-width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`

const LoginWithButton = styled.button`
  flex: 1 auto;
  padding: 10px;
  margin: 4px 0;
  width: 100%;
  border-radius: 5px;
  border: 1px solid var(${props => props.color ? props.color : "--black-100"});
  background-color: var(${props => props.color ? props.color : "--white"});
  color: var(${props => props.color ? "--white" : "--black-800"});
  cursor: pointer;
`

const LoginForm = styled.div`
  width: 100%;
  max-width: 300px;
  padding: 24px;
  background-color: var(--white);
  border-radius: 7px;
  box-shadow: var(--bs-xl);
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
  font-size: 13px;
  background-color: var(--white);
  outline: 0;
  :focus {
    border-color: var(--blue-300);
    box-shadow: 0 0 0 4px hsla(206, 100%, 40%, .15);
  }
  ::placeholder {color: var(--black-200)}
`

function Login() {

  return (
    <LoginContainer>
      <div className="login-logo">
        <LogoDiv url={sprites} />
      </div>
      <div className="login-with">
        <LoginWithButton>Log in with Google</LoginWithButton>
        <LoginWithButton color="--black-750">Log in with Github</LoginWithButton>
      </div>
      <div className="login-form">
        <LoginForm>
          Login
          <LoginInput />
        </LoginForm>
      </div>
    </LoginContainer>
  );
}

export default Login;