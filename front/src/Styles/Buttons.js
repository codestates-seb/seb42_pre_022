import styled from "styled-components";
import { Link } from "react-router-dom";

export const BasicBlueButton = styled(Link)`
  cursor: pointer;
  padding: 8px .8em;
  box-shadow: inset 0 1px 0 0 hsla(0,0%,100%,0.7);
  border: 1px solid transparent;
  border-radius: 3px;
  font-size: 13px;
  text-decoration: none;
  white-space: nowrap;
  line-height: calc(15/13);
  background-color: var(${props => props.skyblue ? "--powder-100" : "--blue-500"});
  border-color: var(${props => props.skyblue ? "--powder-500" : "--blue-500"});
  color: var(${props => props.skyblue ? "--powder-700" : "--white"});

  :hover {
    background-color: var(${props => props.skyblue ? "--powder-300" : "--blue-600"});
    border-color: var(${props => props.skyblue && "--powder-500"});
    color: var(${props => props.skyblue && "--powder-800"});
  }
`