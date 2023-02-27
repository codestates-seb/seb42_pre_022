import styled from "styled-components"
import { TagInput } from "../Pages/Askquestion"

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
const TagsinEditor = styled.span`
  list-style: none;
  display: flex;
  align-items: center;
  margin-right: 6px;
  cursor: text;
  >span{
    margin: 2px;
    font-size: 12px;
    background-color: var(--powder-100);
    border: 1px solid transparent;
    border-radius: var(--_ta-br);
    color: var(--_ta-fc);
    font-size: var(--_ta-fs);
    line-height: var(--_ta-lh);
    padding-left: var(--_ta-pl);
    padding-right: var(--_ta-pr);
    align-items: center;
    display: inline-flex;
    justify-content: center;
    min-width: 0;
    text-decoration: none;
    vertical-align: middle;
    white-space: nowrap;
  }
`



function TagEditor ({tags, setTags}) {
  const removeTags = (indexToRemove) => {
    setTags(tags.filter((ele, index) => index !== indexToRemove));
  };
  const addTags = (e) => {
    const filtered = tags.filter((el) => el === e.target.value);
    if (e.target.value !== '' && filtered.length === 0) {
      setTags([...tags, e.target.value]);
      e.target.value = '';
    }
  };

  return(

    <TagEditorBox>

      <TagEditorInput>
       <TagsinEditor>
         {/* {tags.map((tag, index) => (
            <span key={index} className='tag'>
              <span className='tag-title'>{tag}</span>
              <span className='tag-close-icon' onClick={() => removeTags(index)}>&times;</span>
            </span>
          ))} */}
        </TagsinEditor>
        <input type="text" placeholder="e.g. javascript or python" />
        <span />
      </TagEditorInput>

    </TagEditorBox>
    // <TagInput>
    //     <ul>
    //       {tags.map((tag, index) => (
    //         <li key={index}>
    //           <span>{tag}
    //             <button onClick={() => {removeTags(index)}}>&times;</button>
    //           </span>
    //         </li>
    //       ))}
    //     </ul>
    //     <input type="text" id="tags" placeholder={ !tags.length ?"e.g. javascript or python" :null}
    //       onKeyUp={(event) => {
    //         if (event.key === "Enter") {
    //           addTags(event)
    //         }
    //       }} />
    //   </TagInput>
  )

}

export default TagEditor