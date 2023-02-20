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
  }
`


function UserCard() {

  return (
    < CardDiv className="profile" >
      <img src={`${process.env.PUBLIC_URL}/images/profileIcon.png`} />
      <div>
        <p>이름</p>
        <p>명성</p>
      </div>
    </CardDiv >
  )
}

export default UserCard;
