import styled from "styled-components";

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
  }
`
const Tag = styled.a`
  font-size: 12px;
  color: var(--powder-700);
  background-color: var(--powder-100);
  border-color: transparent;
  display: inline-block;
  padding: 0.4em 0.5em;
  margin: 2px 2px 2px 0;
  line-height: 1;
  white-space: nowrap;
  text-decoration: none;
  text-align: center;
  border-width: 1px;
  border-style: solid;
  border-radius: 3px;
  cursor: pointer;
`
const UsercardMinimal = styled.div`
  flex-wrap: wrap;
  justify-content: flex-end;
  margin-left: auto;
`

function QuestionsList() {
  let question = {
    title : "Extracting output from Postman using Python",
    body : "does anyone know how to extract output from postman using Python I can't find a way to convert 'var responseData = pm.response.json()['data']' this into python. enter image description here",
    answer_count : 1
  }
  let tag = [
    {
      title: 'javascript'
    },
    {
      title: 'angular'
    }
  ]

  return (
    <QLiContainer>
      <PostSummaryStats>
        <div><span>0</span><span>votes</span></div>
        <div className={`${question.answer_count}`!== "0" ?"has-answer" :"null"}><span>{question.answer_count}</span><span>answer</span></div>
        <div><span>2</span><span>views</span></div>
      </PostSummaryStats>
      <PostSummaryContent>
        <h3 className="post-summary-title"><a>{question.title}</a></h3>
        <div className="post-summary-content">{question.body}</div>
        <div className="post-summary-meta">
          <div>
            <ul>
              {tag.map((ele)=>{
                return <li><Tag>{ele.title}</Tag></li>
              })}
            </ul>
          </div>
          <UsercardMinimal>
            <div>KUSHA B K 1,409 asked Apr 21, 2017 at 4:59</div>
            <div></div>
          </UsercardMinimal>
        </div>
      </PostSummaryContent>
    </QLiContainer> 
  );
}

export default QuestionsList;