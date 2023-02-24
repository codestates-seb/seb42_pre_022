import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Noto Sans', 'Noto Sans KR', sans-serif;
    }
  .app-wrap {
    width: 100%;
    height: 100vh;
  }
  .wrap {
    position: relative;
    margin: 0 auto;
    padding-top: 50px;
    /* max-width: 1264px; */
    width: 100%;
    /* height: calc(100vh - 50px); */
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex: 1 0 auto;
  }
  .container{
    position: relative;
    flex: 1 0 auto;
    /* max-width: 1264px; */
    width: 100%;
    height: max-content;
    background: none;
    display: flex;
    justify-content: center;
    margin: 0 auto;
    margin-top: 0;
    /* padding-top: 50px; */
  }
  html{
    font-size: 13px;
    @media (max-width: 640px){
    font-size: 11px;
    }
  }

  .content {
    max-width: 1100px;
    width: calc(100% - 164px);
    display: flex;
    border: 1px solid var(--black-100);
    background-color: var(--white);
    border-top-width: 0;
    border-bottom-width: 0;
    border-left-width: 1px;
    border-right-width: 0;
    padding: 24px;
    @media screen and (max-width: 980px){
    padding-left: 16px;
    padding-right: 16px;
    }
    @media screen and (max-width: 640px){
    width: 100%;
    border: none;
    }
  }

  .linktext {
    color: var(--blue);
    text-decoration: none;
    cursor: pointer;
  }
  .linktext:hover {
    color: var(--blue-500);
  }

  .invalid {
    border: 1px solid var(--red-400);
    input {
      padding-right: 32px;
    }
    :focus {
    box-shadow: 0 0 0 4px var(--focus-ring-error);
    }
  }
  .invalid-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    .error-icon {
      position: absolute;
      top: 50%;
      right: 0.7em;
      margin-top: -9px;
      pointer-events: none;
    }
  }
  .invalid-notice {
    color: var(--red-400);
    font-size: 12px;
  }

  :root {
    /* color */
    --white: hsl(0,0%,100%);
    --black: hsl(210,8%,5%);
    --orange: hsl(27,90%,55%);
    --yellow: hsl(47,83%,91%);
    --green: hsl(140,40%,55%);
    --blue: hsl(206,100%,40%);
    --powder: hsl(205,46%,92%);
    --red: hsl(358,62%,52%);
    --black-025: hsl(210,8%,97.5%);
    --black-050: hsl(210,8%,95%);
    --black-075: hsl(210,8%,90%);
    --black-100: hsl(210,8%,85%);
    --black-150: hsl(210,8%,80%);
    --black-200: hsl(210,8%,75%);
    --black-300: hsl(210,8%,65%);
    --black-350: hsl(210,8%,60%);
    --black-400: hsl(210,8%,55%);
    --black-500: hsl(210,8%,45%);
    --black-600: hsl(210,8%,35%);
    --black-700: hsl(210,8%,25%);
    --black-750: hsl(210,8%,20%);
    --black-800: hsl(210,8%,15%);
    --black-900: hsl(210,8%,5%);
    --orange-050: hsl(27,100%,97%);
    --orange-100: hsl(27,95%,90%);
    --orange-200: hsl(27,90%,83%);
    --orange-300: hsl(27,90%,70%);
    --orange-400: hsl(27,90%,55%);
    --orange-500: hsl(27,90%,50%);
    --orange-600: hsl(27,90%,45%);
    --orange-700: hsl(27,90%,39%);
    --orange-800: hsl(27,87%,35%);
    --orange-900: hsl(27,80%,30%);
    --blue-050: hsl(206,100%,97%);
    --blue-100: hsl(206,96%,90%);
    --blue-200: hsl(206,93%,83.5%);
    --blue-300: hsl(206,90%,69.5%);
    --blue-400: hsl(206,85%,57.5%);
    --blue-500: hsl(206,100%,52%);
    --blue-600: hsl(206,100%,40%);
    --blue-700: hsl(209,100%,37.5%);
    --blue-800: hsl(209,100%,32%);
    --blue-900: hsl(209,100%,26%);
    --powder-050: hsl(205,47%,97%);
    --powder-100: hsl(205,46%,92%);
    --powder-200: hsl(205,53%,88%);
    --powder-300: hsl(205,57%,81%);
    --powder-400: hsl(205,56%,76%);
    --powder-500: hsl(205,41%,63%);
    --powder-600: hsl(205,36%,53%);
    --powder-700: hsl(205,47%,42%);
    --powder-800: hsl(205,46%,32%);
    --powder-900: hsl(205,46%,22%);
    --green-025: hsl(140,42%,95%);
    --green-050: hsl(140,40%,90%);
    --green-100: hsl(140,40%,85%);
    --green-200: hsl(140,40%,75%);
    --green-300: hsl(140,40%,65%);
    --green-400: hsl(140,40%,55%);
    --green-500: hsl(140,40%,47%);
    --green-600: hsl(140,40%,40%);
    --green-700: hsl(140,41%,31%);
    --green-800: hsl(140,40%,27%);
    --green-900: hsl(140,40%,20%);
    --yellow-050: hsl(47,87%,94%);
    --yellow-100: hsl(47,83%,91%);
    --yellow-200: hsl(47,65%,84%);
    --yellow-300: hsl(47,69%,69%);
    --yellow-400: hsl(47,79%,58%);
    --yellow-500: hsl(47,73%,50%);
    --yellow-600: hsl(47,76%,46%);
    --yellow-700: hsl(47,79%,40%);
    --yellow-800: hsl(47,82%,34%);
    --yellow-900: hsl(47,84%,28%);
    --red-025: hsl(358,80%,98%);
    --red-050: hsl(358,75%,97%);
    --red-100: hsl(358,76%,90%);
    --red-200: hsl(358,74%,83%);
    --red-300: hsl(358,70%,70%);
    --red-400: hsl(358,68%,59%);
    --red-500: hsl(358,62%,52%);
    --red-600: hsl(358,62%,47%);
    --red-700: hsl(358,64%,41%);
    --red-800: hsl(358,64%,35%);
    --red-900: hsl(358,67%,29%);
    --gold: hsl(48,100%,50%);
    --gold-lighter: hsl(48,100%,91%);
    --gold-darker: hsl(45,100%,47%);
    --silver: hsl(210,6%,72%);
    --silver-lighter: hsl(0,0%,91%);
    --silver-darker: hsl(210,3%,61%);
    --bronze: hsl(28,38%,67%);
    --bronze-lighter: hsl(28,40%,92%);
    --bronze-darker: hsl(28,31%,52%);
    --bc-lightest: var(--black-025);
    --bc-lighter: var(--black-050);
    --bc-light: var(--black-075);
    --bc-medium: var(--black-100);
    --bc-dark: var(--black-150);
    --bc-darker: var(--black-200);
    --fc-dark: hsl(210,8%,5%);
    --fc-medium: hsl(210,8%,25%);
    --fc-light: hsl(210,8%,45%);
    --focus-ring-success: hsla(140,40%,75%,0.4);
    --focus-ring-warning: hsla(47,79%,58%,0.4);
    --focus-ring-error: hsla(358,62%,47%,0.15);
    --focus-ring-muted: hsla(210,8%,15%,0.1);
    --_o-disabled: .5;
    --_o-disabled-static: .5;
    --bs-sm: 0 1px 2px hsla(0,0%,0%,0.05), 0 1px 4px hsla(0, 0%, 0%, 0.05), 0 2px 8px hsla(0, 0%, 0%, 0.05);
    --bs-md: 0 1px 3px hsla(0,0%,0%,0.06), 0 2px 6px hsla(0, 0%, 0%, 0.06), 0 3px 8px hsla(0, 0%, 0%, 0.09);
    --bs-lg: 0 1px 4px hsla(0,0%,0%,0.09), 0 3px 8px hsla(0, 0%, 0%, 0.09), 0 4px 13px hsla(0, 0%, 0%, 0.13);
    --bs-xl: 0 10px 24px hsla(0,0%,0%,0.05), 0 20px 48px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.1);
    --scrollbar: hsla(0,0%,0%,0.2);
    --highlight-bg: hsl(0,0%,96.5%);
    --highlight-color: var(--black-750);
    --highlight-comment: hsl(210,8%,43.5%);
    --highlight-punctuation: var(--black-600);
    --highlight-namespace: hsl(27,99%,36%);
    --highlight-attribute: hsl(206,98.5%,29%);
    --highlight-literal: hsl(27,99%,36%);
    --highlight-symbol: hsl(306,43%,35%);
    --highlight-keyword: hsl(206,98.5%,29%);
    --highlight-variable: hsl(80,80.5%,26.5%);
    --highlight-addition: var(--green-700);
    --highlight-deletion: var(--red-600);
    --theme-base-primary-color-h: 27;
    --theme-base-primary-color-s: 90%;
    --theme-base-primary-color-l: 55%;
    --theme-base-primary-color-r: 243.525;
    --theme-base-primary-color-g: 129.9225;
    --theme-base-primary-color-b: 36.975;
    --theme-primary-color-h: var(--theme-light-primary-color-h, var(--theme-base-primary-color-h));
    --theme-primary-color-s: var(--theme-light-primary-color-s, var(--theme-base-primary-color-s));
    --theme-primary-color-l: var(--theme-light-primary-color-l, var(--theme-base-primary-color-l));
    --theme-primary-color-r: var(--theme-light-primary-color-r, var(--theme-base-primary-color-r));
    --theme-primary-color-g: var(--theme-light-primary-color-g, var(--theme-base-primary-color-g));
    --theme-primary-color-b: var(--theme-light-primary-color-b, var(--theme-base-primary-color-b));

    }
`

export default GlobalStyle;