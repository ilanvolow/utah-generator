

import App from './app';
import { Entity, Property } from './entity';
import NewThreadHandler from './handlers/NewThreadHandler';
import Route from './route';
import Response from './response';

<App>
    <Route path='/test' method='get' handler={NewThreadHandler}>
        <Response code='200' name='successfulThreadResponse'/>
        <Response code='400' title='Invalid Thread' name='invalidThreadResponse'/>
    </Route>
</App>