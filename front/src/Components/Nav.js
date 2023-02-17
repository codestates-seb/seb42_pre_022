import styled from "styled-components";

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
  @media screen and (max-width: 640px){
    display: none;
  }
`
const MainMenu = styled.ol`
  list-style: none;
  color: var(--black-600);
  margin: 0 0 12px;
  font-size: 100%;
  vertical-align: baseline;
  >li{
    display: list-item;
    line-height: 2;
    font-size: 13px;
    position: relative;
  }
  >li:nth-child(1){
    text-transform: uppercase;
    margin : 16px 0 4px 8px;
    color: var(--fc-light);
    font-size: 11px;
  }
  >li:nth-child(2) >a{
    /* withsvg */
    padding: 8px 6px 8px 8px;
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
  }
  svg{
    width: 18px;
    height: 18px;
    margin-top: -1px;
    margin-right: 4px;
    vertical-align: middle;
  }
`


function Nav() {
  return (
    <>
      <NavContainer>
      <MainMenu>
        <li>Public</li>
        <li className="youarehere">
          <a>
            <svg viewBox="0 0 18 18"><path d="M 9 1 C 4.64 1 1 4.64 1 9 c 0 4.36 3.64 8 8 8 c 4.36 0 8 -3.64 8 -8 c 0 -4.36 -3.64 -8 -8 -8 Z M 8 15.32 a 6.46 6.46 0 0 1 -4.3 -2.74 a 6.46 6.46 0 0 1 -0.93 -5.01 L 7 11.68 v 0.8 c 0 0.88 0.12 1.32 1 1.32 v 1.52 Z m 5.72 -2 c -0.2 -0.66 -1 -1.32 -1.72 -1.32 h -1 v -2 c 0 -0.44 -0.56 -1 -1 -1 H 6 V 7 h 1 c 0.44 0 1 -0.56 1 -1 V 5 h 2 c 0.88 0 1.4 -0.72 1.4 -1.6 v -0.33 a 6.45 6.45 0 0 1 3.83 4.51 a 6.45 6.45 0 0 1 -1.51 5.73 v 0.01 Z" /></svg>
            <span>Questions</span>
          </a>
        </li>
        <li><a>Tags</a></li>
        <li><a>Users</a></li>
      </MainMenu>
      </NavContainer>
    </>
  );
}

export default Nav;