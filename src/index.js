import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import * as serviceWorker from './serviceWorker';

// optional cofiguration
const options = {
    position: 'top right',
    timeout: 4000,
    offset: '30px',
    transition: 'scale'
}

const Root = () => (
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
)

ReactDOM.render(<Root />, document.getElementById('root'));

serviceWorker.register();
