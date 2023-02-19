import styled from "styled-components";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { loginActions } from "../Reducers/loginReducer";
import { BasicBlueButton } from "../Styles/Buttons"
import { ReactComponent as SearchIcon } from "../assets/searchIcon.svg";
import { ReactComponent as InboxIcon } from "../assets/inboxIcon.svg";
import { ReactComponent as AchiveIcon } from "../assets/achiveIcon.svg";
import { ReactComponent as HelpIcon } from "../assets/helpIcon.svg";
import { ReactComponent as ExchangeIcon } from "../assets/exchangeIcon.svg";
import logo from "../assets/sprites.svg"

const Containerheader = styled.header`
    display: flex;
    z-index:5050;
    position: relative;
    justify-content: center;
    align-items: center;
    position: fixed;
    width: 97em;
    max-width: 100%;
    min-width: 425px;
    height: 50px;
    border-top:3px solid var(--orange);
    background-color: var(--black-025);
    box-shadow:0 1px 2px hsla(0,0%,0%,0.05), 0 1px 4px hsla(0, 0%, 0%, 0.05), 0 2px 8px hsla(0, 0%, 0%, 0.05);
    margin: 0 auto;
    > div, ul {
      display: flex;
      align-items: center;
      height: 100%;
    }
    ul:nth-child(2) {
      padding: 2px 0;
      li:not(:nth-child(2)) {
        display: ${props => props.login.login ? "none" : "block"};
        @media only screen and (max-width: 980px) {
          display: none;
        }
      }
    }
    ul:nth-child(4) {
      gap: 4px;
      list-style: none;
      padding-right: 12px;
      li:first-child {
        display: none;
        @media only screen and (max-width: 640px) {
          display: flex;
        }
      }
      @media only screen and (max-width: 640px) {
        margin-left: auto;
      }
    }
`
const HeadTabLi = styled.li`
  list-style: none;
  background-color: inherit;
  border: none;
  font-size: 13px;
  cursor: pointer;
  :hover {
    background-color: var(--black-075);
  }
`  
const HeadLogoI = styled.i`
  display: flex;
  align-items: center;
  width: 150px;
  height: 30px;
  background-image: url(${props => props.url});
  background-position: 0 -500px;
  @media only screen and (max-width: 640px) {
    width:25px;
  }
`
const HeadLogoTabLi = styled(HeadTabLi)`
  height: 100%;
  padding: 0 8px;
  display: flex;
  align-items: center;
  > svg {
    fill:var(--black-600);
  }
  :hover {
    > svg {
    fill:var(--black-800);
    }
  }
  > img {
    height: 24px;
    width: 24px;
  }
  @media only screen and (max-width: 640px) {
    > span {
      display: none;
    }
  }
`
const HeadTextTabLi = styled(HeadTabLi)`
  padding: 6px 12px;
  border-radius: 20px;
  color: var(--black-600);
  :hover {
    color: var(--black-800);
  }
  @media only screen and (max-width: 640px) {
    font-size: 11px;
  }
`
const SearchInput = styled.input`
  flex: 1;
  display: block;
  width: 100%;
  padding: 0.6em 0.7em;
  padding-left:32px;
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
`
const SearchBoxDiv = styled.div`
  flex-grow: 1;
  position: relative;
  margin: 0 8px;
  > svg {
    position: absolute;
    top: 50%;
    right: auto;
    left: 0.7em;
    fill: var(--black-400);
    transform: translateY(-50%);
    pointer-events: none;    
  }

  @media only screen and (max-width: 640px) {
    display: none !important;
  }
`
const MenubarLi = styled(HeadLogoTabLi)`
  display: ${props => props.nowparams ? "flex" : "none"};
  padding: 0 16px;
  > div {
    > i {
      display: flex;
      width: 16px;
      height: 2px;
      background-color: var(${props => props.isopen ? "transparent" : "--black-600"});
      position: relative;
    }
    > i::before {
      position: absolute;
      content: "";
      left: 0;
      top: ${props => !props.isopen && "-5px"};
      width: 16px;
      height: 2px;
      background-color: var(--black-600);
      transform: ${props => props.isopen && "rotate(-45deg);"};
      transition: top, transform;
      transition-duration: .1s;
      transition-timing-function: ease-in-out;
    }
    > i::after {
      position: absolute;
      content: "";
      left: 0;
      top: ${props => !props.isopen && "5px"};
      width: 16px;
      height: 2px;
      background-color: var(--black-600);
      transform: ${props => props.isopen && "rotate(45deg);"};
      transition: top, transform;
      transition-duration: .1s;
      transition-timing-function: ease-in-out;
    } 
  }
  @media only screen and (max-width: 640px) {
    display: flex;
  }
`

function Header() {
  const state = useSelector(state => state.loginReducer);
  const dispatch = useDispatch();
  const [menu, setMenu] = useState(false)

  // TODO /ask로 접근했을 때(askQuestion) 메뉴바 생기는지 확인 
  let { params } = useParams();

  const handleClick = () => {
    dispatch(loginActions.changeLogin())
  }
  const openMenu = () => {
    setMenu(!menu)
  }
  const loginButton = state.login ? "Log out" : "Log in"
  const loginTabList = [(<><img src={`${process.env.PUBLIC_URL}/images/profileIcon.png`} /><span>1</span></>), <InboxIcon />, <AchiveIcon />, <HelpIcon />, <ExchangeIcon />]

  return (
    <Containerheader login={state}>
      <ul>
        <MenubarLi onClick={openMenu} isopen={menu ? 1 : null} nowparams={params && params.slice(-3) === "ask" ? 1 : null}><div><i/></div></MenubarLi>
        <HeadLogoTabLi><Link to="/"><HeadLogoI url={logo}/></Link></HeadLogoTabLi>
      </ul>
      <ul>
        <HeadTextTabLi>About</HeadTextTabLi>
        <HeadTextTabLi>Products</HeadTextTabLi>
        <HeadTextTabLi>For Teams</HeadTextTabLi>
      </ul>
      <SearchBoxDiv>
        <SearchInput type="text" maxLength={240} placeholder="Search..." />
        <SearchIcon />
      </SearchBoxDiv>
      <ul>
        <HeadLogoTabLi><SearchIcon /></HeadLogoTabLi>
        {state.login && loginTabList.map((el, i) => <HeadLogoTabLi key={i}>{el}</HeadLogoTabLi>)}
        <li><BasicBlueButton skyblue={1} to={state.login ? "/" : "/users/login"} onClick={handleClick}>{loginButton}</BasicBlueButton></li>
        {!state.login && <li><BasicBlueButton to="/users/signup">Sign up</BasicBlueButton></li>}
      </ul>
    </Containerheader>
  );
}

export default Header;
