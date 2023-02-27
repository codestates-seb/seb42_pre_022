import styled from "styled-components";
import TagEditor from "./TagEditor";
import { BasicBlueButton } from "../Styles/Buttons";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { customfilter, filteringBy} from "../Reducers/filterquestionReducer";
import { selectPage } from "../Reducers/paginationReducer";

const FilterForm = styled.div`
  z-index: 30;
  position: relative;
  align-items: flex-start;
  display: flex;
  vertical-align: baseline;
  .filter-open{
    --_ex-after-h: 10px;
    --_ex-after-hmx: 0;
    --_ex-after-transition: height 100ms linear, max-height 0s 100ms linear;
    --_ex-content-hmx: 1000000px;
    --_ex-content-mb: 0;
    --_ex-content-o: unset;
    --_ex-content-transform: unset;
    --_ex-content-transition: margin-bottom 100ms cubic-bezier(0, 0, 0, 1), transform 100ms cubic-bezier(1, 0, 1, 1), opacity 100ms cubic-bezier(1, 0, 1, 1);
  }
  .filter-close{
    --_ex-after-h: 0;
    --_ex-after-hmx: 10px;
    --_ex-after-transition: height 10px linear;
    --_ex-content-hmx: 0;
    --_ex-content-mb: -1500px;
    --_ex-content-o: 0;
    --_ex-content-transform: scaleY(0);
    --_ex-content-transition: margin-bottom 100ms cubic-bezier(1, 0, 1, 1), visibility 0s 100ms, max-height 0s 100ms, transform 100ms cubic-bezier(0, 1, 1, 1), opacity 100ms cubic-bezier(0, 1, 1, 1);
  }
  >div{
    max-height: var(--_ex-content-hmx);
    margin-bottom: var(--_ex-content-mb);
    opacity: var(--_ex-content-o);
    -webkit-transform: var(--_ex-content-transform);
    transform: var(--_ex-content-transform);
    -ms-flex-preferred-size: 100%;
    flex-basis: 100%;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    transition: var(--_ex-content-transition);
  }

`
const ExpandableContent = styled.div`
  margin-bottom: 16px;
  background-color: var(--black-050);
  border-color: var(--black-100);
  border-radius: 3px;
  border-style: solid;
  border-width: 1px;
  >div:nth-child(1){
    padding: 16px 12px 16px 12px;
  }
`
const Forms = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: calc(32px /2 * -1);
  >div{
    margin: 16px;
  }
  fieldset{
    display: flex;
    min-width: 0;
    border: 0;
    padding: 0;
    flex-direction: column;
    margin: -4px;
    margin-right: 0;
    margin-left: 0;
    vertical-align: baseline;
  }
  legend{
    margin: 4px 0;
    padding: 0;
    font-size: 1.15384615rem;
    color: var(--fc-dark);
    font-weight: 600;
  }
  fieldset >div{
    margin: 4px 0 4px 0;
  }
`
const Checkbox = styled.div`
  display: flex;
  align-items: center;
  margin: 0 -2px;
  >div{
    margin: 0 2px 0 2px;
    display: block;
  }
  >label{
    margin: 0 2px;
    cursor: pointer;
    white-space: nowrap;
    font-weight: 400;
    padding: 0 2px;
    font-size: 1.15384615rem;
    color: var(--fc-dark);
  }
  input[type="radio"], input[type="checkbox"] {
    vertical-align: middle;
  }
`

const FilterFormButtons = styled.div`
  padding: 12px;
  border-color: var(--black-100);
  border-top-style: solid;
  border-top-width: 1px;
  display: flex;
  >div:nth-child(1){
    display: flex;
    flex: 1 auto;
    margin: 0 -2px;
    >a{
      margin: 0 2px;
    }
  }
`
const FilterCancelBtn = styled.button`
  background-color: transparent;
  border: 1px solid transparent;
  color: var(--blue-600);
  font-size: 12px;
  padding: 0.8em;
  cursor: pointer;
  display: inline-block;
  font-family: inherit;
  font-weight: normal;
  line-height: 15/13;
  position: relative;
  outline: none;
  text-align: center;
  text-decoration: none;
  user-select: none;
`


function ExpandableFilterform({isFilterOpen}) {
  const filter = useSelector((state)=> state.filter);
  const dispatch = useDispatch();
  const [customOption, setCustomOption] = useState({...filter})
  const [tags, setTags] = useState([])
  const [tagsChecked, setTagsChecked] = useState(false)
  const setOptionHandler = (e) => {
    let key = e.target.value
    let changedOption = customOption
    switch(key) {
      case "newest" :
        // changedOption.highestscore=false;
        // changedOption[key]=e.target.checked;
        setCustomOption({...customOption,highestscore: false, newest: e.target.checked})
      break;
      case "highestscore" :
        // changedOption.newest=false;
        // changedOption[key]=e.target.checked; 
        setCustomOption({...customOption,highestscore: e.target.checked, newest: false})      
      break;
      case "tags" :
        console.log(tags)
        if(e.target.checked){
          setCustomOption({...customOption,tags:tags})
        } else setCustomOption({...customOption,tags:[]})
      break;
      default:
        changedOption[key]=e.target.checked
        setCustomOption(changedOption)
    }
  }
  const applyFilterHandler = () => {
    console.log(customOption)
    dispatch(customfilter(customOption))
    dispatch(selectPage(1))
  }
  const checktagsHandler = (e) => {
    setTagsChecked(!tagsChecked)
    setOptionHandler(e)
  }
  return (
    <FilterForm>
      <div className={isFilterOpen ?"filter-open" :"filter-close"}>
        <ExpandableContent>
          <div>
            <Forms>
              <div>
                <fieldset>
                  <legend>Filter by</legend>
                  <div><Checkbox><div><input type="checkbox" id="unanswered" value="unanswered" onClick={setOptionHandler} defaultChecked={filter.unanswered} /></div><label htmlFor="unanswered">No answers</label></Checkbox></div>
                </fieldset>
              </div>
              <div>
                <fieldset>
                  <legend>Sorted by</legend>
                  <div><Checkbox><div><input type="radio" name="sort" id="newest" value="newest" onClick={setOptionHandler} defaultChecked={filter.newest}/></div><label htmlFor="newest">Newest</label></Checkbox></div>
                  <div><Checkbox><div><input type="radio" name="sort" id="highestscore" value="highestscore" onClick={setOptionHandler} defaultChecked={filter.hignestscore}/></div><label htmlFor="highestscore">Highest score</label></Checkbox></div>
                </fieldset>
              </div>
              <div>
                <fieldset>
                  <legend>Tagged with</legend>
                  <div><Checkbox><div><input type="checkbox" name="tags" id="thefollowingtags" value="tags" onClick={checktagsHandler} checked={tagsChecked} defaultChecked={!!Object.keys(filter.tags).length}/></div><label htmlFor="thefollowingtags">The following tags</label></Checkbox></div>
                </fieldset>
                <TagEditor tags={tags} setTags={setTags} setTagsChecked={setTagsChecked} customOption={customOption} setCustomOption={setCustomOption}/>
              </div>
            </Forms>
          </div>
          <FilterFormButtons>
            <div>
              <BasicBlueButton onClick={applyFilterHandler}>Apply filter</BasicBlueButton>
              <BasicBlueButton skyblue={1}>Save custom filter</BasicBlueButton>
            </div>
            <FilterCancelBtn>Cancel</FilterCancelBtn>
          </FilterFormButtons>
        </ExpandableContent>
      </div>
    </FilterForm>
  );
}

export default ExpandableFilterform;