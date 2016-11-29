import '../css/main.css';

import {appStore} from './state';
import {render} from './view';
import {registerEventHandlers} from './events';

appStore.subscribe(() => render(document.body, appStore.getState()));

render(document.body, appStore.getState());
registerEventHandlers();
