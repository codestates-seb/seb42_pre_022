import styled from "styled-components";

const FilterForm = styled.form`
  z-index: 30;
  position: relative;
  align-items: flex-start;
  display: flex;
  vertical-align: baseline;
  >{
    max-height: 100000px;
    margin-bottom: 0;
    opacity: unset;
    transform: unset;
    flex-basis: 100%;
    transition:margin-bottom 100ms cubic-bezier(0, 0, 0, 1), transform 100ms cubic-bezier(1, 0, 1, 1), opacity 100ms cubic-bezier(1, 0, 1, 1);
    display: block;
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
  >div:nth-child(2){
    padding: 12px;
    border-color: var(--black-100);
    border-top-style: solid;
    border-top-width: 1px;
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
  }
  legend{
    margin: 4px;
    margin-left: 0;
    margin-right: 0;
    padding: 0 2px;
    padding-left: 0;
    padding-right: 0;
    font-size: 1.15384615rem;
    color: var(--fc-dark);
    font-weight: 600;
  }
  fildset >div{
    margin: 4px 0 4px 0;
  }
  .tag-editor{
    cursor: text;
    background-color: var(--white);
    position: relative;
    overflow: hidden;
    white-space: normal;
    height: auto;
    min-height: 37px;
    padding-top: 2px;
    padding-bottom: 2px;
    >input{
      width: 19px;
      min-width: 100%;
      margin: 0;
      height: 29px;
      box-sizing: content-box;
      padding-left: calc(0.7em - 2px);
      color: var(--fc-dark);
      font-size: 13px;
      border-radius: 3px;
      border: none !important;
      box-shadow: none !important;
      outline: 0 !important;
      padding: 0 !important;
      background-color: transparent;
    }
  }
`
const Checkbox = styled.div`
  display: flex;
  align-items: center;
  margin: -8px;
  margin-top: 0;
  margin-bottom: 0;
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

function ExpandableFilterform() {

  return (
    <FilterForm>
      <div>
        <ExpandableContent>
          <div>
            <Forms>
              <div>
                <fieldset>
                  <legend>Filter by</legend>
                  <div><Checkbox><div><input type="checkbox" id="noanswers" /></div><label for="noanswers">No answers</label></Checkbox></div>
                </fieldset>
              </div>
              <div>
                <fieldset>
                  <legend>Sorted by</legend>
                  <div><Checkbox><div><input type="radio" id="newest" /></div><label for="newest">Newest</label></Checkbox></div>
                  <div><Checkbox><div><input type="radio" id="highestscore" /></div><label for="highestscore">Highest score</label></Checkbox></div>
                </fieldset>
              </div>
              <div>
                <fieldset>
                  <legend>Tagged with</legend>
                  <div><Checkbox><div><input type="radio" id="thefollowingtags"/></div><label for="thefollowingtags">The following tags</label></Checkbox></div>
                </fieldset>
                <div className="tag-editor"><span/><input type="text" /><span/></div>
              </div>
            </Forms>
          </div>
          <div></div>
        </ExpandableContent>
      </div>
    </FilterForm>
  );
}

export default ExpandableFilterform;