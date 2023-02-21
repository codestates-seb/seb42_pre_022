import styled from "styled-components";


const CardDiv = styled.div`
  display: flex;
  margin-top: 3px;
  > img {
    height: 32px;
    width: 32px;
    border-radius: 3px;
  }
  > div {
    margin-left: 8px;
    width: calc(100% - 64px);
  }
  .username {
    font-size: 12px;
    color: var(--blue);
  }
  .username:hover {
    color: var(--blue-500);
  }
  .reputation {
    font-weight: bold;
  }
`



function UserCard() {

  return (
    < CardDiv className="profile" >
      <img src={`${process.env.PUBLIC_URL}/images/profileIcon.png`} />
      <div>
        <p className="username">이름</p>
        <p className="reputation">명성</p>
      </div>
    </CardDiv >
  )
}

export default UserCard;
