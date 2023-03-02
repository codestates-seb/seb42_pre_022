import styled from "styled-components";
import { Tag } from "../Styles/Divs";

const TagsContainerDiv = styled.div`
  align-items: center;
  column-gap: 6px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: 8px;
  >div:nth-child(1){
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    line-height: 18px;
    float: left;
  }
  ul{
    display: inline;
    list-style: none;
    margin-bottom: 1em;
  }
  li{
    display: inline;
    margin-right: 4px;
  }
`

function TagsDiv({ tags }) {

  return (
    <TagsContainerDiv>
      <ul>
        {tags.map((tag) => {
          return <li key={tag.tagId}><Tag>{tag.tagName}</Tag></li>
        })}
      </ul>
    </TagsContainerDiv>
  )
}

export default TagsDiv;
