import styled from "styled-components";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { loginInfoActions } from "../Reducers/loginInfoReducer";
import { BasicBlueButton } from "../Styles/Buttons"
import SearchBar from "./SearchBar";
import Nav from "./Nav";
import { ReactComponent as SearchIcon } from "../assets/searchIcon.svg";
import { ReactComponent as InboxIcon } from "../assets/inboxIcon.svg";
import { ReactComponent as AchiveIcon } from "../assets/achiveIcon.svg";
import { ReactComponent as HelpIcon } from "../assets/helpIcon.svg";
import { ReactComponent as ExchangeIcon } from "../assets/exchangeIcon.svg";
import logo from "../assets/sprites.svg"
import { searchBarfilter } from "../Reducers/filterquestionReducer";
import { selectPage } from "../Reducers/paginationReducer";
import SearchGuide from "./SearchGuide";


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
  img {
    height: 24px;
    width: 24px;
  }
  @media only screen and (max-width: 640px) {
    span {
      display: none;
    }
  }
  a{
    display: inline-flex;
    align-items: center;
    height: 100%;
    gap:4px;
    text-decoration: none;
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
//TODO 나중에 합쳐서 지우기
export const SearchBoxDiv = styled.div`
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
`
export const SearchInput = styled.input`
  flex: 1;
  display: block;
  width: 100%;
  padding: 0.6em 0.7em;
  padding-left: 32px;
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
//TODO



function Header() {
  const { login, userInfo } = useSelector(state => state.loginInfoReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false)
  const [searchInputValue, setSearchInputValue] = useState('')
  const[isFocus, setIsFocus] = useState(false)

  let { pathname } = useLocation();

  const logoutHandler = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      // 로그아웃 버튼 -> accessToken, userInfo 비우기, 작성하던 질문 상태 비우기, login 상태 바꾸기
      localStorage.removeItem("accessToken");
      localStorage.removeItem("titleValue"); localStorage.removeItem("questionValue"); localStorage.removeItem("titleDone"); localStorage.removeItem("questionDone"); localStorage.removeItem("tagStart");
      const actions = {
        login: false,
        userInfo: null
      }
      dispatch(loginInfoActions.changeLoginInfo(actions))
      navigate("/");
      window.location.reload();
    }
  }
  const openMenu = () => {
    setMenu(!menu)
  }
  const loginTabList = [(<><Link to="/users/mypage"><img src={login ? userInfo?.profileImage : null} alt="profile-icon" /><span>1</span></Link></>), <InboxIcon />, <AchiveIcon />, <HelpIcon />, <ExchangeIcon />]

  const searchbarHandler=(e)=>{
      dispatch(searchBarfilter(searchInputValue))
      dispatch(selectPage(1))
      setSearchInputValue('')
  }
  const focusHandler = () =>{
    setIsFocus(!isFocus)
  }
  
  return (
    <Containerheader>
      <div>
        <MenuLogoUl>
          <MenubarLi onClick={openMenu} isopen={menu && 1} nowparams={pathname.includes("ask") && 1}><div><i/></div></MenubarLi>
          {menu && <li className="nav"><Nav /></li>}
          <HeadIconTabLi><Link to="/" onClick={pathname === "/" && (()=> window.location.reload())}><HeadLogoI url={logo} /></Link></HeadIconTabLi>
        </MenuLogoUl>
        <HeadTextTabUl login={login ? 1 : null}>
          <HeadTextTabLi>About</HeadTextTabLi>
          <HeadTextTabLi>Products</HeadTextTabLi>
          <HeadTextTabLi>For Teams</HeadTextTabLi>
        </HeadTextTabUl>
        {/* 나중에 SearchBar다 되면 지우기 */}
        {/* <SearchBar placeholder="Search..." setSearchInputValue={setSearchInputValue} inputHandler={searchbarInputHandler} searchInputValue={searchInputValue}/> */}
        <SearchBoxDiv>
          <SearchInput 
            type="text" 
            maxLength={240} 
            value={searchInputValue} 
            placeholder="Search..." 
            onChange={(e)=>{setSearchInputValue(e.target.value)}}
            //! 여러분 그거 아세요? 한글에서 엔터를 누르면 onKeyDown이 두번 발생된다는 사실
            //! 알고싶지 않았습니다.
            onKeyPress={(e)=>{
            if (e.key === "Enter") {
            console.log("엔터")
            searchbarHandler(e)
            }}}
            onFocus={focusHandler}
            onBlur={focusHandler}
          />
          {isFocus && <SearchGuide />}
      <SearchIcon />
    </SearchBoxDiv>
        {/*  */}
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
