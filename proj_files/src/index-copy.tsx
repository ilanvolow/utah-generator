
import { App, Route, Response, Param } from './utah';
import { Data, Entity, Property, MongoDataAdapter } from './components/entity/data';
import HelloWorldHandler from './handlers/helloworld';

<App>
    <Route path='/hello' method='get' handler={HelloWorldHandler}>
        <Param name='person_name' paramtype='query' datatype='string' optional={true}/>
        <Response code='200' name='successfulHelloResponse'/>
        <Response code='400' message='We do not allow anonymity' name='invalidHelloResponse'/>
    </Route>
    <Data adapter={MongoDataAdapter}>
        <Entity name='Contact'>
            <Property name='firstName' type='string'/>
            <Property name='lastName' type='string'/>
            <Property name='dob' type='date'/>
            <Property name='favorite' type='boolean'/>
            <Property name='photo' type='binary'/>
        </Entity>
    </Data>
</App>