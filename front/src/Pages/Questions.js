import styled from "styled-components";
import QuestionsList from "../Components/QuestionsList";
import { BasicBlueButton } from "../Styles/Buttons";
import Aside from "../Components/Aside";

const QuestionsContainer = styled.div`
  >div:nth-child(1){
    width: calc(100% - 300px - 24px);
    float: left;
    @media screen and (max-width: 980px){
    width: 100%;
    float: none;
    }
  }
  >div:nth-child(2){
    float: right;
    @media screen and (max-width: 980px){
    float: none;
    clear: both;
    margin: 0 auto;
    width: 100%;
    }
  }
`
const PageHeader = styled.div`
  display: flex;
  margin-bottom: 12px;
  flex-wrap: wrap;
  vertical-align: baseline;
  >h1{
    font-size: 2.07692308rem;
    margin: 0 0 1em;
    margin-right: 12px;
    margin-bottom: 12px;
    line-height: 1.3;
    flex: 1 auto;
    font-weight: normal;
  }
  >div{
    margin-bottom: 12px;
    >a{
      position: relative;
      display: inline-block;
      padding: 0.8em;
    }
  }
`
const QuestionsH2 =styled.div`
  display: flex;
  margin-bottom: 12px;
  align-items: center;
  justify-content: space-between;
  .data{
    font-size: 1.30769231rem;
    margin-right: 12px;
    flex: 1 auto;
  }
`
const DataControllerBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const DataController = styled.div`
  vertical-align: baseline;
  font-size: 100%;
  margin-right: 16px;
  display: flex;
  flex-flow: row nowrap;
  margin-bottom: 1px;
`

const DataControllerBtn = styled.a`
  border: 1px solid transparent;
  border-radius: ${(props)=> props.middle ?"0" :"3px"};
  border-top-left-radius: ${(props)=> props.end ?"0" :null};
  border-top-right-radius: ${(props)=> props.start ?"0" :null};
  border-bottom-right-radius: ${(props)=> props.start ?"0" :null};
  border-bottom-left-radius: ${(props)=> props.end ?"0" :null};
  margin-right: ${(props)=> props.end ?"0" :"-1px"};
  margin-bottom: -1px;
  z-index: 25;
  box-shadow: none;
  border-color: var(--black-400);
  background-color: ${(props)=> props.selected ?"var(--black-075)" :"transparent"};
  color: ${(props)=> props.selected ?"var(--black-700)" :"var(--black-500)"};
  white-space: nowrap;
  font-size: 12px;
  padding: 0.8em;
  cursor: pointer;
  line-height: 15/13;
  position: relative;
  outline: none;
  text-align: center;
  text-decoration: none;
  user-select: none;
`


const Dropdown = styled.div`
`

const FilterBtn = styled.div`
  a{
  padding: 0.8em;
  display: inline-block;
  position: relative;
  outline: none;
  text-align: center;
  text-decoration: none;
  user-select: none;
  font-size: 12px;
  }
  svg{
  width: 18px;
  height: 18px;
  vertical-align: baseline;
  margin-top: -0.3em;
  margin-bottom: -0.3em;
  transition: opacity 200ms cubic-bezier(.165, .84, .44, 1);
  overflow: hidden;
  cursor: pointer;
  text-align: center;
  user-select: none;
  }
  path{
    fill: currentColor;
  }
`

const ExpandableFilterform = styled.form`

`
const QuestionsContent = styled.div`
  width: auto;
  float: none;
  margin: 0 0 20px -24px;
  border-top: 1px solid var(--black-100);
  @media screen and (max-width: 980px) {
    margin-left: -16px;
    margin-right: -16px;
    width: calc(100% + 2px * 16px);
  }
`



function Questions() {
  return (
    <QuestionsContainer>
      <div>
        <PageHeader>
          <h1>All Questions</h1>
          <div>
            <BasicBlueButton>Ask Questions</BasicBlueButton>
          </div>
        </PageHeader>
        <div>
          <QuestionsH2>
            <div className="data">23,502,787 questions</div>
            <div>
              <DataControllerBox>
                <DataController>
                    <DataControllerBtn start selected><div>Newest</div></DataControllerBtn>
                    <DataControllerBtn middle ><div>Active</div></DataControllerBtn>
                    <DataControllerBtn middle ><div>Unanswered</div></DataControllerBtn>
                    <DataControllerBtn end ><div>More</div></DataControllerBtn>
                </DataController>
                <Dropdown />
                <FilterBtn><BasicBlueButton skyblue><svg viewBox="0 0 18 18"><path d="M2 4h14v2H2V4Zm2 4h10v2H4V8Zm8 4H6v2h6v-2Z"/></svg>filter</BasicBlueButton></FilterBtn>
              </DataControllerBox>
            </div>
          </QuestionsH2>
          <ExpandableFilterform></ExpandableFilterform>
        </div>
        <QuestionsContent>
          <QuestionsList />
          <QuestionsList />
          <QuestionsList />
          <QuestionsList />
          <QuestionsList />
          <QuestionsList />
        </QuestionsContent>
      </div>
      <Aside />
    </QuestionsContainer>

  )
}

export default Questions;