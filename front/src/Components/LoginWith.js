import styled from "styled-components";

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

function LoginWith() {
  return (
    <>
      <LoginWithButton>Log in with Google</LoginWithButton>
      <LoginWithButton color="--black-750">Log in with Github</LoginWithButton>
    </>
  )
}

export default LoginWith;