import styled from "styled-components";

const TagCardDiv = styled.div`
  display: flex;
  margin-top: 3px;
  font-size: 12px;
  min-width: 200px;
  align-items: center;
  border-radius: 3px;
  border: 1px solid var(--black-100);
  padding: 12px;
  .reputation {
    color: var(--black-500);
    font-weight: bold;
  }
  .tag-text {
    margin-bottom: 16px;
    background-color: var(--powder-100);
    border-radius: 3px;
    width: max-content;
    padding: 4px;
    font-size: 12px;
    color: var(--powder-700);
  }
  .tag-content {
    width: 100%;
    font-size: 12px;
    color: var(--black-700);
    margin-bottom: 8px;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: keep-all;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical
  }
`
function TagCard({ tagname }) {
  return (
    <TagCardDiv className="profile" >
      <div>
        <div className="tag-text">{tagname}</div>
        <div className="tag-content">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
        <p className="reputation">0</p>
      </div>
    </TagCardDiv >
  )
}

export default TagCard;