import UserCard from "../Components/UserCard";
import { ReactComponent as UpVoteIcon } from "../assets/upVoteIcon.svg";
import { ReactComponent as DownVoteIcon } from "../assets/downVoteIcon.svg";
import { ReactComponent as BookmarkIcon } from "../assets/bookmarkIcon.svg";
import { ReactComponent as HistoryIcon } from "../assets/historyIcon.svg";
import styled from "styled-components";
import CommentsDiv from "./CommentsDiv";
import TagsDiv from "./TagsDiv";

const QAWrapDiv = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  > div:first-child {
    padding-right: 16px;
    vertical-align: top;
    grid-column: 1;
  }
  > div:nth-child(2) {
    min-width: 0px;
  }

  padding: ${props => props.answer ? "16px 0 !important" : null};
  border-bottom: 1px solid var(${props => props.answer ? "--black-075" : ""});
`
const VoteContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  > div {
    display:flex;
    justify-content: center;
    color: var(--black-500);
    margin: 2px;
    font-size: 1.6rem;
  }
  .bookmark {
    padding: 4px 0;
  }
  
  .history {
    padding: 6px 0;
    margin: 0 auto;
    > svg {
      margin-left: -2px;
    }
  }
`
const VoteButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  margin: 2px;
  > svg {
    fill: var(--black-200);
    vertical-align: bottom;
  }
`
const WriterRelatedDiv = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 16px 0;
  font-size: 13px;
  color: var(--black-500);
  justify-content: flex-end;
  flex-flow: row wrap;
  > div {
    margin: 5px 0;
    > span {
      display:inline-block;
      cursor:pointer;
    }
  }
  .qapost {
    width: 96px;
    flex: 1 auto;
    margin-left: -4px;
    > span {
      margin: -4px 4px;
    }
    > span:hover {
      color: var(--black-400);
    }
  }
`
const WriterCardDiv = styled.div`
  width: 200px;
  font-size: 12px;
  margin-top: 0 !important;
  padding: 7px;

  border-radius: ${props => props.iswriter ? "3px": null};
  background-color: var(${props => props.iswriter? "--powder" : null});
`

const QAbodydiv = styled.div`
  padding-right: 16px;
  font-size: 15px;
  line-height: 1.5;
  overflow-wrap: break-word;
  > p {
    margin-bottom: 1.1em;;
  }
  > pre {
    background-color: var(--highlight-bg);
    border-radius: 5px;
    color: var(--highlight-color);
    font-family: var(--ff-mono);
    font-size: 13px;
    line-height: 1.3;
    margin: 0;
    overflow: auto;
    padding: 12px;
    margin-bottom: 1.5em;
  }
`

function QandADiv( {type} ) {
  return (
    <QAWrapDiv answer={type? type: null}>
      <div>
        <VoteContainerDiv>
          <VoteButton><UpVoteIcon></UpVoteIcon></VoteButton>
          <div>0</div>
          <VoteButton><DownVoteIcon></DownVoteIcon></VoteButton>
          <VoteButton className="bookmark"><BookmarkIcon></BookmarkIcon></VoteButton>
          <VoteButton className="history"><HistoryIcon></HistoryIcon></VoteButton>
        </VoteContainerDiv>
      </div>
      <div>
        <QAbodydiv>
          <p>(본문)I'm starting a new Kotlin project, and I used Gradle 7.2 to generate the project structure and the buildSrc scripts. I'm not including them here because I have not changed them - I'm just using whatever Gradle generated.</p>
          <pre>I'm getting the following message as part of the build:</pre>
          <p>'compileJava' task (current target is 17) and 'compileKotlin' task (current target is 1.8) jvm target compatibility should be set to the same Java version.</p>
          <p>I can't find where in the buildSrc and the generated Gradle files the 1.8 target is set. How can I tell the Kotlin compiler to use the Java 17 target?</p>
          <p>I'm starting a new Kotlin project, and I used Gradle 7.2 to generate the project structure and the buildSrc scripts. I'm not including them here because I have not changed them - I'm just using whatever Gradle generated.</p>
          <p>I'm getting the following message as part of the build:</p>
          <p>'compileJava' task (current target is 17) and 'compileKotlin' task (current target is 1.8) jvm target compatibility should be set to the same Java version.</p>
          <p>I can't find where in the buildSrc and the generated Gradle files the 1.8 target is set. How can I tell the Kotlin compiler to use the Java 17 target?</p>
        </QAbodydiv>
        {type ? null : <TagsDiv />}       
        <WriterRelatedDiv writer={1}>
          <div className="qapost"><span>Share</span><span>Edit</span><span>Follow</span></div>
          <WriterCardDiv className="card" iswriter={null}>
            <span className="linktext">edited Feb 13 at 6:24</span>
            {<UserCard username="이름" reputation="100"/>}
          </WriterCardDiv>
          <WriterCardDiv className="qawriter card" iswriter={1}>
            <div>asked {"Feb 10 at 18:04"}</div>
            <UserCard username="이름" reputation="100"/>
          </WriterCardDiv>
        </WriterRelatedDiv>
      </div>
      <span></span>
      <CommentsDiv />
    </QAWrapDiv>
  )
}

export default QandADiv;
