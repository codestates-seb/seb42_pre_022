import axios from "axios";
import SearchBar from "../Components/SearchBar";
import UserCard from "../Components/UserCard";
import HelmetTitle from "../Components/HelmetTitle";
import Pagination from "../Components/Pagination";
import { useState, useEffect } from "react";
import { UsersContainer, UsersH1, SearchFilterDiv, DataController, UserCardsDiv, Bottomdiv } from "./Users";
import { DataControllerBtn } from "./Questions";

function Tags() {
  const [users, setUsers] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [curPage, setCurPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  const getUsers = async (url, page) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/users?${url}=${page}`)
      setUsers(response.data.body.data)
      setTotalPages(response.data.body.totalPages)
    } catch (err) {
      setError(err)
    }
  }
  const inputHandler = (e) => {
    if (e.key === "Enter") {
      // getUsers("word", searchKeyword)
      console.log(searchKeyword, "검색 구현 중")
    } else {
      setSearchKeyword(e.target.value)
    }
  }
  useEffect(() => {
    getUsers("page", curPage)
  }, [curPage])

  return (
    <div className="content">
      {error ? <h1 className="error">Tags ERROR</h1> : <>
        <HelmetTitle title="Tags - Stack Overflow" />
        <UsersContainer>
          <UsersH1>Tags</UsersH1>
          <p>A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question.</p>
          <p className="linktext">Show all tag synonyms</p>
          <SearchFilterDiv>
            <SearchBar placeholder="Filter by tag name" inputHandler={inputHandler} />
            <DataController>
              <DataControllerBtn start={1} selected={1}><div>Popular</div></DataControllerBtn>
              <DataControllerBtn middle="true"><div>Name</div></DataControllerBtn>
              <DataControllerBtn end={1} ><div>New</div></DataControllerBtn>
            </DataController>
          </SearchFilterDiv>
          <UserCardsDiv>
            {users && users.map(user => <UserCard key={user.userId} userimg={user.profileImage} username={user.displayName} reputation={user.reputation} />)}
          </UserCardsDiv>
          <Bottomdiv>
            <a className="linktext">weekly / monthly / quarterly reputation leagues</a>
            <Pagination curPage={curPage} setCurPage={setCurPage} totalPages={totalPages} />
          </Bottomdiv>
        </UsersContainer>
      </>}
    </div>
  );
}

export default Tags;