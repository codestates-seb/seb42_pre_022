import styled from "styled-components";

const CmtLi = styled.li`
  padding: 6px;
  border-bottom: 1px solid var(--black-050);
  > span {
    margin-right: 4px;
    color: var(--black-800);
  }
  > span:not(:first-child) {
    cursor: pointer;
  }
  > span:nth-child(2) {
    display: inline-block;
    white-space: nowrap;
    padding: 1px 5px;
    border-radius: 3px;
    background-color: var(${props => props.writer ? "--powder" : null});
    color: var(--blue-600);        
  }
  > span:nth-child(2):hover {
    color: var(--blue-500);
  }
  > span:nth-child(3) {
    color: var(--black-400);
  }
`
function CommentLi() {
  return (
    <CmtLi writer="1">
      <span>{"update : after navigating to the second mappage it also shows the same markers used in the first mappage"}</span>
      –&nbsp;<span>{"작성자"}</span>
      <span>{"작성날짜"}</span>
    </CmtLi>
  )
}

export default CommentLi;