import ResponseHandler from 'utah';

import * as express from 'express';

class HelloWorldHandler implements ResponseHandler {

    public handle(request: express.Request, response: express.Response) {
        if (request.query.person_name) {
            response.reply('successfulHelloResponse', {'message' : 'Hello ' + request.query.person_name });
        } else {
            response.reply('successfulHelloResponse', {'message' : 'Hello World!'});
        }
    }
}

export default HelloWorldHandler;
