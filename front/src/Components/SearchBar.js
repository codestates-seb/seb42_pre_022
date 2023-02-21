import { ReactComponent as SearchIcon } from "../assets/searchIcon.svg";
import styled from "styled-components"

export const SearchInput = styled.input`
  flex: 1;
  display: block;
  width: 100%;
  padding: 0.6em 0.7em;
  padding-left: 32px;
  color: var(--black-700);
  line-height: calc(15/13);
  border: 1px solid var(--black-200);
  border-radius: 3px;
  font-size: 13px;
  background-color: var(--white);
  outline: 0;
  :focus {
    border-color: var(--blue-300);
    box-shadow: 0 0 0 4px hsla(206, 100%, 40%, .15);
  }
`
export const SearchBoxDiv = styled.div`
  flex-grow: 1;
  position: relative;
  margin: 0 8px;
  > svg {
    position: absolute;
    top: 50%;
    right: auto;
    left: 0.7em;
    fill: var(--black-400);
    transform: translateY(-50%);
    pointer-events: none;    
  }

  @media only screen and (max-width: 640px) {
    display: none !important;
  }
`

function SearchBar() {

  return (
    <SearchBoxDiv>
      <SearchInput type="text" maxLength={240} placeholder="Search..." />
      <SearchIcon />
    </SearchBoxDiv>
  )
}

export default SearchBar;
