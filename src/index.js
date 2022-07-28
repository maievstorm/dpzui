import ReactDOM from 'react-dom';

// third party
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

// project imports
//import * as serviceWorker from 'serviceWorker';
import App from 'App';
import { store } from 'store';

// style + assets
import 'assets/scss/style.scss';

import UserService from "./services/UserService";
import config from 'config';
import reportWebVitals from 'reportWebVitals';

// ==============================|| REACT DOM RENDER  ||============================== //

const renderApp = () => ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter basename={config.basename}>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

UserService.initKeycloak(renderApp);
reportWebVitals();

//serviceWorker.register();
