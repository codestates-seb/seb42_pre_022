import axios from "axios";
import styled from "styled-components";
import SearchBar from "../Components/SearchBar";
import UserCard from "../Components/UserCard";
import HelmetTitle from "../Components/HelmetTitle";
import Pagination from "../Components/Pagination";
import { useState, useEffect } from "react";

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
const Bottomdiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media screen and (max-width: 980px) {
    flex-direction: column;
    align-items: normal;
    > div {
      justify-content: end;
    }
  }
`

function Users() {
  const [users, setUsers] = useState([]);
  const [pageInfo, setPageInfo] = useState({ currentPage: 1, totalPages: null });
  const [error, setError] = useState(null);

  const getUsers = async (page) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/users?page=${page}`)
      setUsers(response.data.body.data)
      setPageInfo({ ...pageInfo, totalPages: response.data.body.totalPages })
    } catch (err) {
      setError(err)
    }
  }

  useEffect(() => {
    getUsers(pageInfo.currentPage)
  }, [pageInfo])

  return (
    <div className="content">
      {error ? <h1 className="error">Users ERROR</h1> : <>
        <HelmetTitle title="Users - Stack Overflow" />
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
            {users && users.map(user => <UserCard key={user.userId} userimg={user.profileImage} username={user.displayName} reputation={user.reputation} />)}
          </UserCardsDiv>
          <Bottomdiv>
            <a className="linktext">weekly / monthly / quarterly reputation leagues</a>
            <Pagination pageInfo={pageInfo} setPageInfo={setPageInfo}/>
          </Bottomdiv>
        </UsersContainer>
      </>}
    </div>
  );
}

export default Users;