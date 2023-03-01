
function preventClose(e) {
  e.preventDefault();
  e.returnValue = "";
}

export default preventClose;

