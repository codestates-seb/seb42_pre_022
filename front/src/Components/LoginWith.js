import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { ReactComponent as GoogleIcon } from "../assets/googleicon.svg";

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

// const GoogleIcon = styled.img`
//   width: 13px;
//   height: 13px;
//   margin-right: 4px;
// `

function LoginWith() {
  return (
    <LoginWithContainer>
      <LoginWithButton hover="--black-025" font="--black">
        <GoogleIcon className="logo-icon" />
        Log in with Google
      </LoginWithButton>
      <LoginWithButton color="--black-750" hover="--black-800">
        <FontAwesomeIcon icon={faGithub} className="logo-icon" />
        Log in with Github
      </LoginWithButton>
    </LoginWithContainer>
  )
}

export default LoginWith;