import { createGlobalStyle } from 'styled-components';
import OpenSansLightTtf from './assets/fonts/OpenSans-Light.ttf';
import OpenSansRegularTtf from './assets/fonts/OpenSans-Regular.ttf';
import OpenSansSemiboldTtf from './assets/fonts/OpenSans-Semibold.ttf';
import DotumTtf from './assets/fonts/dotum.ttf';
import LatoBoldTtf from './assets/fonts/Lato-Bold.ttf';
import LatoLightTtf from './assets/fonts/Lato-Light.ttf';
import LatoMediumTtf from './assets/fonts/Lato-Medium.ttf';
import LatoRegularTtf from './assets/fonts/Lato-Regular.ttf';
import RobotoRegularTtf from './assets/fonts/Roboto-Regular.ttf';
import RobotoMediumTtf from './assets/fonts/Roboto-Medium.ttf';
import RobotoBoldTtf from './assets/fonts/Roboto-Bold.ttf';
import RobotoLightTtf from './assets/fonts/Roboto-Light.ttf';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }
  @font-face {
    font-family: "Light Open Sans";
    src: url('${OpenSansLightTtf}') format("truetype");
  }

  @font-face {
      font-family: "Semibold Open Sans";
      src: url('${OpenSansSemiboldTtf}') format("truetype");
  }

  @font-face {
    font-family: "Regular Open Sans";
    src: url('${OpenSansRegularTtf}') format("truetype");
  }

  @font-face {
      font-family: "Dotum";
      src: url('${DotumTtf}') format("truetype");
  }

  @font-face {
      font-family: "Bold Lato";
      src: url("${LatoBoldTtf}") format("truetype");
  }

  @font-face {
    font-family: "Light Lato";
    src: url("${LatoLightTtf}") format("truetype");
}

  @font-face {
      font-family: "Regular Lato";
      src: url("${LatoRegularTtf}") format("truetype");
  }

  @font-face {
      font-family: "Medium Lato";
      src: url("${LatoMediumTtf}") format("truetype");
  }

  @font-face {
    font-family: "Regular Roboto";
    src: url("${RobotoRegularTtf}") format("truetype");
  }

  @font-face {
    font-family: "Bold Roboto";
    src: url("${RobotoBoldTtf}") format("truetype");
  }

  @font-face {
    font-family: "Light Roboto";
    src: url("${RobotoLightTtf}") format("truetype");
  }

  @font-face {
    font-family: "Medium Roboto";
    src: url("${RobotoMediumTtf}") format("truetype");
  }
  
  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    line-height: 1.5em;
  }
`;

export default GlobalStyle;
