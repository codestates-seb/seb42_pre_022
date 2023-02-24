import styled from "styled-components";

export const Tag = styled.a`
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
export const CommentTextarea = styled.textarea`
  width: 100%;
  height: auto;
  min-width: 0;
  padding: 0.5em;
  color: var(--black-700);
  line-height: calc(15/13);
  border: none;
  border-bottom: 1px solid var(--black-075);
  border-radius: 3px;
  font-size: 13px;
  outline: 0;
  resize: none;
  :focus {
    border-color: var(--blue-300);
    box-shadow: 0 0 0 4px hsla(206, 100%, 40%, .15);
  }
`