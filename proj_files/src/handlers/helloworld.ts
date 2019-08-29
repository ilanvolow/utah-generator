import ResponseHandler from '../components/response_handler'

import * as express from 'express';

class HelloWorldHandler implements ResponseHandler {

    public handle(request: express.Request, response: express.Response) {
        response.reply('successfulThreadResponse', {'message' : 'Hello World'});
    }
}

export default HelloWorldHandler;
