import styled from "styled-components";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { ReactComponent as GoogleIcon } from "../assets/googleicon.svg";
import { useLocation } from "react-router-dom";
import postData from "../util/postData";

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

  // 구글 로그인 -> POST 요청
  // const googleHandler = () => {
  //   postData("/oauth2/authorization/google")
  // }

  return (
    <LoginWithContainer>
      <LoginWithButton hover="--black-025" font="--black">
        <GoogleIcon className="logo-icon" />
        {pathname === "/users/login" ? "Log in" : "Sign up"} with Google
      </LoginWithButton>
      {/* <LoginWithButton color="--black-750" hover="--black-800">
        <FontAwesomeIcon icon={faGithub} className="logo-icon" />
        {pathname === "/users/login" ? "Log in" : "Sign up"} with Github
      </LoginWithButton> */}
    </LoginWithContainer>
  )
}

export default LoginWith;