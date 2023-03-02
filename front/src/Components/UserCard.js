import styled from "styled-components";


const CardDiv = styled.div`
  display: flex;
  margin-top: 3px;
  font-size: 12px;
  min-width: 200px;
  align-items: center;
  > img {
    height: 32px;
    width: 32px;
    border-radius: 3px;
  }
  > div {
    margin-left: 8px;
    width: calc(100% - 64px);
  }
  .reputation {
    color: var(--black-500);
    font-weight: bold;
  }
`
function UserCard({ userimg, username, reputation }) {
  if (userimg === undefined) userimg = `${process.env.PUBLIC_URL}/images/profileIcon.png`
  return (
    < CardDiv className="profile" >
      <img src={`${userimg}`} alt=""/>
      <div>
        <p className="linktext">{username}</p>
        <p className="reputation">{reputation}</p>
      </div>
    </CardDiv >
  )
}

export default UserCard;
