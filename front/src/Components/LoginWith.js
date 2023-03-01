import styled from "styled-components";
import { ReactComponent as GoogleIcon } from "../assets/googleicon.svg";
import { useLocation } from "react-router-dom";

const LoginWithContainer = styled.div`
  margin-bottom: 16px;
  width: 90%;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const LoginWithButton = styled.button`
  flex: 1 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin: 4px 0;
  width: 100%;
  border-radius: 5px;
  border: 1px solid var(${props => props.color ? props.color : "--black-100"});
  background-color: var(${props => props.color ? props.color : "--white"});
  color: var(${props => props.color ? "--white" : "--black-800"});
  cursor: pointer;
  :hover {
    background-color: var(${props => props.hover});
    color: var(${props => props.font ? props.font : "--white"});
  }
  .logo-icon {
    margin-right: 4px;
  }
`

function LoginWith() {
  const { pathname } = useLocation();

  // 구글 로그인 -> 서버의 구글 로그인 담당하는 주소로 이동시킴
  const googleHandler = (e) => {
    e.preventDefault();
    return window.location.assign(
      "http://ec2-15-164-213-223.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/google"
    );
  }

  return (
    <LoginWithContainer>
      <LoginWithButton hover="--black-025" font="--black" onClick={googleHandler}>
        <GoogleIcon className="logo-icon" />
        {pathname === "/users/login" ? "Log in" : "Sign up"} with Google
      </LoginWithButton>
    </LoginWithContainer>
  )
}

export default LoginWith;