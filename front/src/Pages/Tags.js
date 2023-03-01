import axios from "axios";
import styled from "styled-components";
import SearchBar from "../Components/SearchBar";
import UserCard from "../Components/UserCard";
import HelmetTitle from "../Components/HelmetTitle";
import Pagination from "../Components/Pagination";
import { useState, useEffect } from "react";
import { UsersContainer, UsersH1, SearchFilterDiv, UserCardsDiv, Bottomdiv } from "./Users";
import TagCard from "../Components/TagCard";

const TagsContainer = styled.div`
  max-width: 630px;
  margin-bottom: 16px;
  .tag-description {
    font-size: 14px;
    margin-bottom: 16px;
  }
`

const TagBottomDiv = styled(Bottomdiv)`
  flex-direction: row-reverse;
`

function Tags() {
  const [tags, setTags] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [curPage, setCurPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  const getTags = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/tags`)
      setTags(response.data.body.data);
      setTotalPages(Math.ceil(response.data.body.data / 36));
    } catch(err) {
      setError(err);
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
    getTags()
  }, [])

  return (
    <div className="content">
      {error ? <h1 className="error">Tags ERROR</h1> : <>
        <HelmetTitle title="Tags - Stack Overflow" />
        <UsersContainer>
          <UsersH1>Tags</UsersH1>
          <TagsContainer>
            <p className="tag-description">A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question.</p>
            <p className="linktext">Show all tag synonyms</p>
          </TagsContainer>
          <SearchFilterDiv>
            <SearchBar placeholder="Filter by tag name" inputHandler={inputHandler} />
          </SearchFilterDiv>
          <UserCardsDiv>
            {tags && tags.map(tag => <TagCard key={tag.tagId} tagname={tag.tagName} />)}
          </UserCardsDiv>
          <TagBottomDiv>
            <Pagination curPage={curPage} setCurPage={setCurPage} totalPages={totalPages} />
          </TagBottomDiv>
        </UsersContainer>
      </>}
    </div>
  );
}

export default Tags;