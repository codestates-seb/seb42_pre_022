import styled from "styled-components";
import { Link } from "react-router-dom";

const NavContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  left:0;
  top: 0;
  bottom: 0;
  right: 0;
  height:100%;
  width: 164px;
  flex-shrink: 0;
  z-index: 1000;
  box-shadow: 0 0 0 hsl(210deg 8% 5% / 5%);
  transition: box-shadow ease-in-out .1s,transform ease-in-out .1s;
  transform: translateZ(0);
  text-align: left;
  >div{
    position: sticky;
    width: auto;
    margin-bottom: 8px;
    overflow-y: auto;
    top: 50px;
    max-height: calc(100vh-50px);
    padding-top: 24px;
  }
  @media screen and (max-width: 640px){
    display: none;
  }
`
const MainMenu = styled.ol`
  list-style: none;
  color: var(--black-600);
  margin: 0 0 12px;
  font-size: 13px;
  vertical-align: baseline;
  margin-block-start: 0px;
  margin-block-end: 0px;
  >li{
    position: relative;
  }
  >li:nth-child(1) {
    text-transform: uppercase;
    margin : 16px 0 4px 8px;
    color: var(--fc-light);
    font-size: 11px;
  }
  >li:nth-child(2) >a{
    /* withsvg */
    display: flex;
    padding: 8px 6px 8px 0;
    padding-left: 8px;
  }
  >li:nth-child(n+3) >a{
    /* withoutsvg */
    padding: 4px;
    padding-left: 30px;
  }
  .youarehere >a{
    font-weight: bold;
    background: var(--black-050);
    color: var(--black-900);
    border-right: 3px solid hsl(var(--theme-primary-color-h), var(--theme-primary-color-s), var(--theme-primary-color-l));
  }
  a{
    cursor: pointer;
    user-select: auto;
    text-decoration: none;
    display: block;
    color: var(--black-600);
    line-height: 2;
    font-size: 13px;
  }
  svg{
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    margin-top: -1px;
    margin-right: 4px;
    vertical-align: bottom;
    >path{
      fill: currentColor;
    }
  }
  span{
    line-height: calc(17/13);
  }
  >div{
    overflow: hidden;
    max-width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`


function Nav() {
  return (
    <NavContainer>
      <div>
        <MainMenu>
        <li>Public</li>
        <li>
        <Link to="/">
        <svg viewBox="0 0 18 18"><path d="M9 1C4.64 1 1 4.64 1 9c0 4.36 3.64 8 8 8 4.36 0 8-3.64 8-8 0-4.36-3.64-8-8-8ZM8 15.32a6.46 6.46 0 0 1-4.3-2.74 6.46 6.46 0 0 1-.93-5.01L7 11.68v.8c0 .88.12 1.32 1 1.32v1.52Zm5.72-2c-.2-.66-1-1.32-1.72-1.32h-1v-2c0-.44-.56-1-1-1H6V7h1c.44 0 1-.56 1-1V5h2c.88 0 1.4-.72 1.4-1.6v-.33a6.45 6.45 0 0 1 3.83 4.51 6.45 6.45 0 0 1-1.51 5.73v.01Z"></path></svg>
        <span>Questions</span>
        </Link>
        </li>
        <li className="youarehere"><a><div>Tags</div></a></li>
        <li><a><div>Users</div></a></li>
        </MainMenu>
      </div>
    </NavContainer>
  );
}

export default Nav;