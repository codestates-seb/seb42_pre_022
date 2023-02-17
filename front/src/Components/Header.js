import styled from "styled-components";
import { ReactComponent as SearchIcon } from "../assets/searchIcon.svg";

const ContainerDiv = styled.div`
  display: flex;
  z-index:5050;
  align-items: center;
  position: fixed;
  width: 100vw;
  height: 50px;
  border-top:3px solid var(--orange);
  background-color: var(--black-025);
  box-shadow:0 1px 2px hsla(0,0%,0%,0.05), 0 1px 4px hsla(0, 0%, 0%, 0.05), 0 2px 8px hsla(0, 0%, 0%, 0.05);
  `

const HeadButton = styled.button`
  background-color: inherit;
  border: none;
  :hover {
  background-color: var(--black-075);
  }
`
const HeadLogoButton = styled(HeadButton)`
  width:150px;
  height:30px;
  background-image: url("./images/sprites.svg");
  background-position: 0 -500px;
`

const HeadTextButton = styled(HeadButton)`
  padding: 6px 12px;
  border-radius: 20px;
  color: var(--black-600);
  :hover {
  color: black;
  }
`
const BasicBlueButton = styled(HeadButton)`
  cursor: pointer;
  padding: .8em;
  box-shadow: inset 0 1px 0 0 hsla(0,0%,100%,0.7);
  border: 1px solid transparent;
  border-radius: 3px;
  font-size: 13px;
  line-height: calc(15/13);
  background-color: var(${props => props.skyBlue ? "--powder-100" : "--blue-500"});
  border-color: var(${props => props.skyBlue ? "--powder-500" : "--blue-500"});
  color: var(${props => props.skyBlue ? "--powder-700" : "--white"});

  :hover {
    background-color: var(${props => props.skyBlue ? "--powder-300" : "--blue-600"});
    border-color: var(${props => props.skyBlue && "--powder-500"});
    color: var(${props => props.skyBlue && "--powder-800"});
  }
`

const SearchInput = styled.input`
  display: block;
  width: 100%;
  padding: 0.6em 0.7em;
  color: var(--black-700);
  line-height: calc(15/13);
  border: 1px solid var(--black-200);
  border-radius: 3px;
  -webkit-appearance: none;
  font-size: 13px;
  background-color: var(--white);
`

const SearchBox = styled.div`
  > svg {
    position: absolute;
    top: 50%;
    right: auto;
    left: 0.7em;
    color:var(--black-400);
  }
`

function Header() {
  return (
    <>
      <ContainerDiv>
        <HeadLogoButton />
        <div>
          <HeadTextButton>About</HeadTextButton>
          <HeadTextButton>Products</HeadTextButton>
          <HeadTextButton>For Teams</HeadTextButton>
        </div>
        <SearchBox>
          <SearchInput type="text" maxLength={240} placeholder="Search..." />
          <SearchIcon />
        </SearchBox>
        <div>
          <BasicBlueButton skyBlue>Log in</BasicBlueButton>
          <BasicBlueButton>Sign up</BasicBlueButton>
        </div>
      </ContainerDiv>
    </>
  );
}

export default Header;
