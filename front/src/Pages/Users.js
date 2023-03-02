import axios from "axios";
import styled from "styled-components";
import SearchBar from "../Components/SearchBar";
import UserCard from "../Components/UserCard";
import HelmetTitle from "../Components/HelmetTitle";
import Pagination from "../Components/Pagination";
import { useState, useEffect } from "react";
import { DataControllerBtn } from "./Questions";

export const UsersContainer = styled.div`
  width: calc(100%);
  float: left;
  @media screen and (max-width: 980px){
  width: 100%;
  float: none;
  }
`
export const UsersH1 = styled.h1`
  font-size: 2.07692308rem;
  font-weight: 400;
  margin-right: 12px;
  margin-bottom: 24px;
  line-height: 1.3;
  margin: 0 0 1em;
  flex: 1 auto;
  display: block;
`
export const SearchFilterDiv = styled.div`
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
export const DataController = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: auto !important;
  > a {
    padding: 0.8em !important;
    :nth-child(3):after {
      display: none;
    }
  }
`
export const UserCardsDiv = styled.div`
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
export const Bottomdiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 25px 0 10px;
  > a {
    font-weight: bold;
  }

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
  const [usersSlice, setUsersSlice] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [curPage, setCurPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  const getUsers = async (url, page) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/users?${url}=${page}`)
      setUsers(response.data.body.data)
      setUsersSlice(response.data.body.data)
      setTotalPages(response.data.body.totalPages)
    } catch (err) {
      setError(err)
    }
  }
  const inputHandler = (e) => {
    if (e.key === "Enter") {
      // getUsers("word", searchKeyword)
      const keyword = searchKeyword.toLowerCase()
      const filtered = keyword.length !== 0 ? users.filter(el => el.displayName.toLowerCase().includes(keyword)) : usersSlice
      setUsers(filtered)
    } else {
      setSearchKeyword(e.target.value)
    }
  }
  useEffect(() => {
    getUsers("page", curPage)
  }, [curPage])

  return (
    <div className="content">
      {error ? <h1 className="error">Users ERROR</h1> : <>
        <HelmetTitle title="Users - Stack Overflow" />
        <UsersContainer>
          <UsersH1>Users</UsersH1>
          <SearchFilterDiv>
            <SearchBar placeholder="Filter by user" inputHandler={inputHandler}/>
            <DataController>
              <DataControllerBtn start={1} selected={1}><div>Reputation</div></DataControllerBtn>
              <DataControllerBtn middle="true"><div>New users</div></DataControllerBtn>
              <DataControllerBtn middle="true"><div>Voters</div></DataControllerBtn>
              <DataControllerBtn middle="true"><div>Editors</div></DataControllerBtn>
              <DataControllerBtn end={1} ><div>Moderators</div></DataControllerBtn>
            </DataController>
          </SearchFilterDiv>
          <UserCardsDiv>
            {users && users.map(user => <UserCard key={user.userId} userimg={user.profileImage} username={user.displayName} reputation={user.reputation} />)}
          </UserCardsDiv>
          <Bottomdiv>
            <a className="linktext">weekly / monthly / quarterly reputation leagues</a>
            <Pagination curPage={curPage} setCurPage={setCurPage} totalPages={totalPages}/>
          </Bottomdiv>
        </UsersContainer>
      </>}
    </div>
  );
}

export default Users;