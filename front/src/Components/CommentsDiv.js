import styled from "styled-components";
import CommentLi from "./CommentLi";

const CmtDiv = styled.div`
  font-size: 13px;
  padding-right: 16px;
  ul {
    border-top: 1px solid var(--black-075);
    margin-top: 12px;
    padding-bottom: 10px;
    list-style: none;
  }
  > span {
    cursor: pointer;
    color: var(--black-400);
    opacity: .6;
  }
  > span:hover {
    color: var(--blue-500);
    opacity: .6;
  }
`

function CommentsDiv() {
  return (
    <CmtDiv>
        <ul>
          <CommentLi />    
        </ul>
        <span className="greycolor">Add a comment</span>
      </CmtDiv>
  )
}

export default CommentsDiv;
