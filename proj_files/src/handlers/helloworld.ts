import ResponseHandler from 'utah';

import * as express from 'express';

class HelloWorldHandler implements ResponseHandler {

    public handle(request: express.Request, response: express.Response) {
        response.reply('successfulResponse', {'message' : 'Hello World'});
    }
}

export default HelloWorldHandler;
