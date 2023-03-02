import styled from "styled-components";
import { Tag } from "../Styles/Divs";
import { Link } from "react-router-dom";
import dateTimeFormat from "../util/dateTimeFormat";
import TagsDiv from "./TagsDiv";

const QLiContainer = styled.div`
  background-color: transparent;
  border-bottom: 1px solid var(--black-075);
  padding: 16px;
  display: flex;
  position: relative;
  --_ps-stats-ai: flex-end;
  --_ps-stats-fd: column;
  --_ps-stats-w: calc(96px + 12px);
  @media (max-width: 980px){
    --_ps-stats-ai: center;
    --_ps-stats-fd: row;
    --_ps-stats-w: auto;
    flex-direction: column;
  }  
`
const PostSummaryStats = styled.div`
  align-items: var(--_ps-stats-ai);
  color: var(--fc-light);
  flex-direction: var(--_ps-stats-fd);
  width: var(--_ps-stats-w);
  display: flex;
  flex-shrink: 0;
  flex-wrap: wrap;
  font-size: 13px;
  gap: 6px;
  margin-bottom: 4px;
  margin-right: 16px;
  >div:nth-child(1){
    color:var(--fc-dark);
  }
  .has-answer{
    background-color: unset;
    border: 1px solid var(--green-700);
    color: var(--green-700);
    border-radius: 3px;
    padding: 2px 4px;
  }
  >div:nth-child(3){
    color:var(--yellow-900);
  }
  div{
    align-items: center;
    border: 1px solid transparent;
    display: inline-flex;
    gap: 0.3em;
    justify-content: center;
    white-space: nowrap;  
  }
`
const PostSummaryContent = styled.div`
  flex-grow: 1;
  max-width: 100%;
  h3{
    font-weight: 400;
    word-break: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
    font-size: 1.30769231rem;
    line-height: 17/13;
    margin: 0 0 1em;
    margin-bottom: 0.3846rem;
    margin-top: -0.15rem;
    padding-right: 24px;
    >a{
      color: var(--blue-700);
      cursor: pointer;
      text-decoration: none;
      user-select: auto;
    }
  }
  .post-summary-content{
    overflow: hidden;
    color: var(--fc-medium);
    margin-top: -2px;
    margin-bottom: 8px;
  }
  .post-summary-meta{
    align-items: center;
    column-gap: 6px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    row-gap: 8px;
  }
`
const UsercardMinimal = styled.div`
  flex-wrap: wrap;
  justify-content: flex-end;
  margin-left: auto;
  align-items: center;
  display: flex;
  gap: 4px;
  line-height: 1;
  time{
    color: var(--black-500);
    white-space: nowrap;
    font-size: 12px;
  }
`
const UsercardAvartar = styled.a`
  background-color: hsl(0,0%,100%);
  border-radius: 3px;
  height: 16px;
  width: 16px;
  display: inline-block;
  position: relative;
  vertical-align: bottom;
  cursor: pointer;
  img{
    border-radius: 3px;
    display: block;
    height: 16px;
    width: 16px;
    margin: 0 auto;
    vertical-align: baseline;
  }
`
const UsercardInfo = styled.div`
  align-items: center;
  flex-direction: row;
  display: flex;
  gap: 4px;
  font-size: 12px;
  a{
    text-decoration: none;
  }
  .uc-username{
    margin: 2px;
    color: var(--blue-600);
  }
  .uc-reputation{
    display: flex;
    color: var(--black-600);
    gap: 6px;
    font-weight: 700;
  }
`
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



function QuestionsList({ ele }) {

  return (
    <QLiContainer>
      <PostSummaryStats>
        <div><span>0</span><span>votes</span></div>
        <div className={ele.answerCount !== 0 ? "has-answer" : "null"}><span>{ele.answerCount}</span><span>answer</span></div>
        <div><span>{ele.viewCount}</span><span>views</span></div>
      </PostSummaryStats>
      <PostSummaryContent>
        <h3 className="post-summary-title"><Link to={`/questions/${ele.questionId}`}>{ele.title}</Link></h3>
        <div className="post-summary-content">{ele.body.replace(/<\/?[^>]+(>|$)/g, '').slice(0, 200) + "..."}</div>
        <div className="post-summary-meta">
          <TagsDiv tags={ele.tagList && ele?.tagList}/>
          <UsercardMinimal>
            <UsercardAvartar><div><img src={ele.user.profileImage} alt="user-profile-img"></img></div></UsercardAvartar>
            <UsercardInfo><Link to={`/users/${ele.user.userId}`}><div className="uc-username">{ele.user.displayName}</div></Link><div className="uc-reputation">{ele.user.reputation}</div></UsercardInfo>
            <time>
              {ele.createdDate === ele.modifiedDate
                ? `asked ${dateTimeFormat(ele.createdDate)}`
                : `modified ${dateTimeFormat(ele.modifiedDate)}`}
            </time>
          </UsercardMinimal>
        </div>
      </PostSummaryContent>
    </QLiContainer>
  );
}

export default QuestionsList;