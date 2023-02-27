import styled from "styled-components";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { loginActions } from "../Reducers/loginReducer";
import { BasicBlueButton } from "../Styles/Buttons"
import SearchBar from "./SearchBar";
import Nav from "./Nav";
import { ReactComponent as SearchIcon } from "../assets/searchIcon.svg";
import { ReactComponent as InboxIcon } from "../assets/inboxIcon.svg";
import { ReactComponent as AchiveIcon } from "../assets/achiveIcon.svg";
import { ReactComponent as HelpIcon } from "../assets/helpIcon.svg";
import { ReactComponent as ExchangeIcon } from "../assets/exchangeIcon.svg";
import logo from "../assets/sprites.svg"

const Containerheader = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
  z-index: 5050;
  position: fixed;
  min-width: 425px;
  height: 50px;
  border-top:3px solid var(--orange);
  background-color: var(--black-025);
  box-shadow:0 1px 2px hsla(0,0%,0%,0.05), 0 1px 4px hsla(0, 0%, 0%, 0.05), 0 2px 8px hsla(0, 0%, 0%, 0.05);
  > div {
    height: 100%;
    width: 97rem;
    max-width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    > div, ul {
      display: flex;
      align-items: center;
      height: 100%;
      list-style: none;
    }
    @media only screen and (max-width: 640px) {
      > div:nth-child(3) {
        display: none !important;
      }
    }
  }
`
const MenuLogoUl = styled.ul`
  .nav {
    position: absolute;
    top: 48px;
    z-index: 999;
    height: auto;
    box-shadow: 0 1px 2px hsla(0,0%,0%,0.05), 0 1px 4px hsla(0, 0%, 0%, 0.05), 0 2px 8px hsla(0, 0%, 0%, 0.05);
    background-color: white;
    border: 1px solid var(--black-075);
    border-top: none;
    > div {
      width: 240px;
      @media screen and (max-width: 640px){
        display: block !important;
      }
    }
    @media only screen and (min-width: 640px) {
      display: none !important;
    }
  }
`
const HeadTabLi = styled.li`
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
const HeadIconTabLi = styled(HeadTabLi)`
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
const MenubarLi = styled(HeadIconTabLi)`
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
const HeadTextTabUl = styled.ul`
  padding: 2px 0;
  li:not(:nth-child(2)) {
    display: ${props => props.login ? "none" : "block"};
    @media only screen and (max-width: 980px) {
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
const IconButtonUl = styled.ul`
  gap: 4px;
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
`


function Header() {
  const {login, userInfo} = useSelector(state => state.loginReducer);
  const dispatch = useDispatch();
  const [menu, setMenu] = useState(false)

  let { pathname } = useLocation();

  const logoutHandler = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      // 로그아웃 버튼 -> accessToken, userInfo 비우기, login 상태 바꾸기
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userInfo");
      dispatch(loginActions.setUserInfo({}));
      dispatch(loginActions.changeLogin(false));
      window.location.reload();
    }


  }
  const openMenu = () => {
    setMenu(!menu)
  }
  const loginTabList = [(<><img src={login ? userInfo.profileImage : null} alt="profile-icon" /><span>1</span></>), <InboxIcon />, <AchiveIcon />, <HelpIcon />, <ExchangeIcon />]

  return (
    <Containerheader>
      <div>
        <MenuLogoUl>
          <MenubarLi onClick={openMenu} isopen={menu ? 1 : null} nowparams={pathname && pathname.slice(-3) === "ask" ? 1 : null}><div><i /></div></MenubarLi>
          {menu ? <li className="nav"><Nav /></li> : null}
          <HeadIconTabLi><Link to="/"><HeadLogoI url={logo} /></Link></HeadIconTabLi>
        </MenuLogoUl>
        <HeadTextTabUl login={login ? 1 : null}>
          <HeadTextTabLi>About</HeadTextTabLi>
          <HeadTextTabLi>Products</HeadTextTabLi>
          <HeadTextTabLi>For Teams</HeadTextTabLi>
        </HeadTextTabUl>
        <SearchBar placeholder="Search..." />
        <IconButtonUl>
          <HeadIconTabLi><SearchIcon /></HeadIconTabLi>
          {login && loginTabList.map((el, i) => <HeadIconTabLi key={i}>{el}</HeadIconTabLi>)}
          <li><BasicBlueButton skyblue={1} to={login ? "/" : "/users/login"} onClick={login ? logoutHandler : null}>{login ? "Log out" : "Log in"}</BasicBlueButton></li>
          {!login && <li><BasicBlueButton to="/users/signup">Sign up</BasicBlueButton></li>}
        </IconButtonUl>
      </div>
    </Containerheader>
  );
}

export default Header;
