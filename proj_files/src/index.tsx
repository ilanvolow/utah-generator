

import App from './components/app'
import { Entity, Property } from './components/entity';
import HelloWorldHandler from './handlers/helloworld';
import Route from './components/route';
import Response from './components/response';

<App>
    <Route path='/hello' method='get' handler={HelloWorldHandler}>
        <Response code='200' name='successfulHelloResponse'></Response>
        <Response code='400' title='Invalid Thread' name='invalidHelloResponse'/>
    </Route>
</App>