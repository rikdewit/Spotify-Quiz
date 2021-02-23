import App from './App.js'
import ReactDOM from 'react-dom'
import TagManager from 'react-gtm-module'


if (process.env.NODE_ENV != 'development') {

  const tagManagerArgs = {
    gtmId: 'G-H120T7N92C'
  }

  TagManager.initialize(tagManagerArgs)
}

ReactDOM.render(<App />, document.querySelector('.container'));
