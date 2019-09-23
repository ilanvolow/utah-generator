
import { App, Route, Response, Param } from 'utah';
import HelloWorldHandler from './handlers/helloworld';

<App>
    <Route path='/hello' method='get' handler={HelloWorldHandler}>
        <Param name='person_name' paramtype='query' datatype='string' optional={true}/>
        <Response code='200' name='successfulHelloResponse'/>
        <Response code='400' message='We do not allow anonymity' name='invalidHelloResponse'/>
    </Route>
</App>