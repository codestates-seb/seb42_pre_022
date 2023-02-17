import styled from "styled-components";

export const HeadButton = styled.button`
  background-color: inherit;
  border: none;
  :hover {
  background-color: var(--black-075);
  }
`

export const BasicBlueButton = styled(HeadButton)`
  cursor: pointer;
  padding: .8em;
  box-shadow: inset 0 1px 0 0 hsla(0,0%,100%,0.7);
  border: 1px solid transparent;
  border-radius: 3px;
  font-size: 13px;
  line-height: calc(15/13);
  background-color: var(${props => props.skyBlue ? "--powder-100" : "--blue-500"});
  border-color: var(${props => props.skyBlue ? "--powder-500" : "--blue-500"});
  color: var(${props => props.skyBlue ? "--powder-700" : "--white"});

  :hover {
    background-color: var(${props => props.skyBlue ? "--powder-300" : "--blue-600"});
    border-color: var(${props => props.skyBlue && "--powder-500"});
    color: var(${props => props.skyBlue && "--powder-800"});
  }
`