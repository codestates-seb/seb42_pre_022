import styled from "styled-components";
import SearchBar from "../Components/SearchBar";
import UserCard from "../Components/UserCard";

const UsersContainer = styled.div`
  width: calc(100%);
  float: left;
  @media screen and (max-width: 980px){
  width: 100%;
  float: none;
  }
`
const UsersH1 = styled.h1`
  font-size: 2.07692308rem;
  font-weight: 400;
  margin-right: 12px;
  margin-bottom: 24px;
  line-height: 1.3;
  margin: 0 0 1em;
  flex: 1 auto;
  display: block;
`
const SearchFilterDiv = styled.div`
  display: flex;
  align-items: stretch;
  margin-bottom: 30px;
  > div {
    margin: 0 0 12px;
  }
  > div:first-child {
    max-width: calc(97rem / 4);
    > input {
      height: 100%;
    }
  }
  @media only screen and (max-width: 980px) {
    display: block !important;
  }
`
const DataController = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: auto !important;
`
const DataControllerBtn = styled.a`
  border: 1px solid transparent;
  border-radius: ${(props) => props.middle ? "0" : "3px"};
  border-top-left-radius: ${(props) => props.end ? "0" : null};
  border-top-right-radius: ${(props) => props.start ? "0" : null};
  border-bottom-right-radius: ${(props) => props.start ? "0" : null};
  border-bottom-left-radius: ${(props) => props.end ? "0" : null};
  margin-right: ${(props) => props.end ? "0" : "-1px"};
  z-index: 25;
  box-shadow: none;
  border-color: var(--black-400);
  background-color: ${(props) => props.selected ? "var(--black-075)" : "transparent"};
  color: ${(props) => props.selected ? "var(--black-700)" : "var(--black-500)"};
  white-space: nowrap;
  font-size: 12px;
  padding: 0.8em;
  cursor: pointer;
  line-height: 15/13;
  position: relative;
  outline: none;
  text-align: center;
  text-decoration: none;
  user-select: none;
`
const UserCardsDiv = styled.div`
  /* display: flex;
  justify-content: space-between;
  flex-flow: row wrap; */
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  > div {
    font-size: 15px;
    margin: 12px 7px 15px 0;
  }
  @media only screen and (max-width: 1264px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media only screen and (max-width: 980px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media only screen and (max-width: 640px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`

function Users() {
  return (
    <div className="content">
      <UsersContainer>
        <UsersH1>Users</UsersH1>
        <SearchFilterDiv>
          <SearchBar placeholder="Filter by user" />
          <DataController>
            <DataControllerBtn start={1} selected={1}><div>Reputation</div></DataControllerBtn>
            <DataControllerBtn end={1} ><div>New users</div></DataControllerBtn>
          </DataController>
        </SearchFilterDiv>
        <UserCardsDiv>
          <UserCard username="소희" reputation="1000000000" />
          <UserCard username="이름" reputation="100" />
          <UserCard username="이름" reputation="100" />
          <UserCard username="이름" reputation="100" />
          <UserCard username="이름" reputation="100" />
          <UserCard username="이름" reputation="100" />
          <UserCard username="이름" reputation="100" />
          <UserCard username="이름" reputation="100" />
          <UserCard username="이름" reputation="100" />
          <UserCard username="이름" reputation="100" />
          <UserCard username="이름" reputation="100" />
          <UserCard username="이름" reputation="100" />
          <UserCard username="이름" reputation="100" />
          <UserCard username="이름" reputation="100" />
          <UserCard username="이름" reputation="100" />
          <UserCard username="이름" reputation="100" />
          <UserCard username="이름" reputation="100" />
          <UserCard username="이름" reputation="100" />
          <UserCard username="이름" reputation="100" />
          <UserCard username="이름" reputation="100" />
          <UserCard username="이름" reputation="100" />
          <UserCard username="이름" reputation="100" />
          <UserCard username="이름" reputation="100" />
          <UserCard username="이름" reputation="100" />
          <UserCard username="이름" reputation="100" />
          <UserCard username="이름" reputation="100" />
          <UserCard username="이름" reputation="100" />
          <UserCard username="이름" reputation="100" />
          <UserCard username="이름" reputation="100" />
        </UserCardsDiv>
      </UsersContainer>
    </div>
  );
}

export default Users;