import styled from "styled-components"

const TagEditorBox = styled.div`
  width: calc((97.2307692rem/12)*2);
  position: relative;
  margin: 8px 0 0 24px;
  display: block;
  input{
    -webkit-appearance: none;
    width: 100%;
    margin: 0;
    padding: 0.6em 0.7em;
    border: 1px solid var(--bc-darker);
    border-radius: 3px;
    background-color: var(--white);
    color: var(--fc-dark);
    font-size: 13px;
  }
`
const TagEditorInput = styled.div`
  padding: 2px 9.1px 2px 2px;
  padding-left: 2px;
  box-sizing: border-box;
  margin-top: 0px;
  margin-bottom: 0px;
  width: 100%;
  cursor: text;
  background-color: var(--white);
  position: relative;
  overflow: hidden;
  white-space: normal;
  height: auto ;
  min-height: 37px ;
  -webkit-appearance: none;
  margin: 0;
  border: 1px solid var(--bc-darker);
  border-radius: 3px;
  color: var(--fc-dark);
  font-size: 13px;
  input {
    width: 19px;
    min-width: 100%;
    padding: 0;
    padding-left: calc(0.7em - 2px) ;
    height: 29px;
    box-sizing: content-box;
    border: none;
    box-shadow: none;
    outline: 0;
    background-color: transparent;
  }
  >input::placeholder{
    color: var(--black-200)
  }
`



function TagEditor () {


  return(
    <TagEditorBox>
     <TagEditorInput><span /><input type="text" placeholder="e.g. javascript or python" /><span /></TagEditorInput>
    </TagEditorBox>
  )

}

export default TagEditor