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
  let tag = tags ? tags : [{title: 'javascript'}, {title: 'angular'}]
  return (
    <TagsContainerDiv>
      <ul>
        {tag.map((ele) => {
          return <li><Tag>{ele.title}</Tag></li>
        })}
      </ul>
    </TagsContainerDiv>
  )
}

export default TagsDiv;
