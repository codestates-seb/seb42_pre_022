import styled from "styled-components";

const MypageContainer = styled.div`
  width: 100%;
`
const MypageHeader = styled.div`
  position: relative;
  margin: -8px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  >a{
    margin: 8px;
    text-decoration: none;
    cursor: pointer;
    box-shadow: var(--bs-sm);
    border-radius: var(--br-md);
    img{
      width: 128px;
      height: 128px
    }
  }
  >div{
    margin: 8px;
    display: block;
  }
`
const SVGBox = styled.div`
  margin: 0 2px;
  color: var(--black-350);
  >svg{
    width: 18px;
    height: 18px;
    vertical-align: bottom;
  }
  path{
    fill: currentColor;
  }
`
const UserDisplayName = styled.div`
  max-width: calc(97.2307692rem / 12 * 4);
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: -4px;
  >div{
    margin: 4px;
    margin-bottom: 12px;
    line-height: 1;
    font-size: 2.61538461rem;
  }

`
const UserDetails = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  color: var(--fc-light);
  margin-left: -4px;
  flex-wrap: wrap;
  >li{
    margin: 4px 2px;
    display: flex;
    align-items: center;
    >div{
      margin: 0 2px;
    }
  }
`
const MypageMenuBar = styled.div`
  display: flex;
  margin-bottom: 16px;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 4px;
  padding: 2px 0;
  list-style: none;
`

const MypageMenuBtn = styled.a`
  background-color: ${(props) => props.isSelected ? "hsl(var(--theme-primary-color-h), var(--theme-primary-color-s), var(--theme-primary-color-l));" : "none"};
  color: ${(props) => props.isSelected ? "var(--white)" : "var(--black-600)"};
  font: unset;
  padding: 6px 12px;
  white-space: nowrap;
  align-items: center;
  border: none;
  border-radius: 1000px;
  box-shadow: none;
  cursor: pointer;
  display: flex;
  position: relative;
  user-select: auto;
  text-decoration: none;
`
const MypageContent = styled.div`
  display: flex;
  margin-bottom: 48px;
`

function Mypage() {
  let user = {
    displayName: "whoisshe",
  }
  return (
    <div className="content">
      <MypageContainer>
        <MypageHeader>
          <a>
           <img src="https://www.gravatar.com/avatar/4809af7fca6e64f604badf6dfaf01ae9?s=256&d=identicon&r=PG"></img> 
          </a>
          <div>
            <UserDisplayName><div>{user.displayName}</div></UserDisplayName>
            <UserDetails>
              <li>
                <SVGBox><svg viewBox="0 0 18 18"><path d="M9 4.5a1.5 1.5 0 0 0 1.28-2.27L9 0 7.72 2.23c-.14.22-.22.48-.22.77 0 .83.68 1.5 1.5 1.5Zm3.45 7.5-.8-.81-.81.8c-.98.98-2.69.98-3.67 0l-.8-.8-.82.8c-.49.49-1.14.76-1.83.76-.55 0-1.3-.17-1.72-.46V15c0 1.1.9 2 2 2h10a2 2 0 0 0 2-2v-2.7c-.42.28-1.17.45-1.72.45-.69 0-1.34-.27-1.83-.76Zm1.3-5H10V5H8v2H4.25C3 7 2 8 2 9.25v.9c0 .81.91 1.47 1.72 1.47.39 0 .77-.14 1.03-.42l1.61-1.6 1.6 1.6a1.5 1.5 0 0 0 2.08 0l1.6-1.6 1.6 1.6c.28.28.64.43 1.03.43.81 0 1.73-.67 1.73-1.48v-.9C16 8.01 15 7 13.75 7Z" /></svg></SVGBox>
                <div> Member for 8 days</div>
              </li>
              <li>
                <SVGBox><svg viewBox="0 0 18 18"><path d="M9 17c-4.36 0-8-3.64-8-8 0-4.36 3.64-8 8-8 4.36 0 8 3.64 8 8 0 4.36-3.64 8-8 8Zm0-2c3.27 0 6-2.73 6-6s-2.73-6-6-6-6 2.73-6 6 2.73 6 6 6ZM8 5h1.01L9 9.36l3.22 2.1-.6.93L8 10V5Z" /></svg></SVGBox>
                <div> Last seen this week</div>
              </li>
              <li>
                <SVGBox><svg viewBox="0 0 18 18"><path d="M14 2h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2h1V0h2v2h6V0h2v2ZM3 6v9h12V6H3Zm2 2h2v2H5V8Zm0 3h2v2H5v-2Zm3 0h2v2H8v-2Zm3 0h2v2h-2v-2Zm0-3h2v2h-2V8ZM8 8h2v2H8V8Z" /></svg></SVGBox>
                <div> Visited 6 days, 2 consecutive</div>
              </li>
            </UserDetails>
          </div>
        </MypageHeader>
        <MypageMenuBar>
          <MypageMenuBtn isSelected={1}>Profile</MypageMenuBtn>
          <MypageMenuBtn>Activity</MypageMenuBtn>
          <MypageMenuBtn>Saves</MypageMenuBtn>
          <MypageMenuBtn>Settings</MypageMenuBtn>
        </MypageMenuBar>
        <MypageContent></MypageContent>
      </MypageContainer>
    </div>
  );
}

export default Mypage;