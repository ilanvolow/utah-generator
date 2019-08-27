import express, { Express } from 'express';
import Response from './response';
import ResponseHandler from './handlers/ResponseHandler';
import { bindExpression } from '@babel/types';

class Route {

    public rpath: string;
    public rmethod: string;
    public rhandler: ResponseHandler;
    public responses: {[key: string]: Response}

    static jsxFactory(args: any, children: any[]): Route | undefined {
        if (Route.validateRoute(args.path, args.method, args.handler)) {
           const newRoute: Route = new Route(args.path, args.method, args.handler);

            for (let item of children) {
              if (item instanceof Response) {
                newRoute.responses[item.name] = item;
              }
            }

            newRoute.rhandler.responses = newRoute.responses;
            return newRoute;
        } else {
            return;
        }
    }

    static validateRoute(path: string, method: string, handler: any) {
        let isValid = true;
        if (!path) {
            throw new Error('Route path must be set');
            isValid = false;
        } else if (!method) {
            throw new Error('Route must have a valid HTTP method');
            isValid = false;
        } else if (!handler) {
            throw new Error('Route must have an assigned handler');
            isValid = false;
        }

        return isValid;
    }

    constructor(path: string,  method: string, handler: any) {
        // TODO: make sure path, method, and handler are correct types. 
        // Throw exception if not the case
        this.rpath = path;
        this.rmethod = method;
        this.rhandler = new handler;
        this.responses = {};

    }

    public route(): express.Router {
        const router = express.Router();

        let responses = this.responses;
        function addResponses(req, res, next) {

            function reply(responseName: string, content: any) {
                const responseToUse = this.responses[responseName];
                if (!responseToUse) {
                    throw new Error('No response is registered for ' + responseToUse);
                }

                this.status(responseToUse.code).send(content);
            }

            const boundReply = reply.bind(res);

            Object.assign(res, { 'responses' : responses, 'reply' : boundReply });
            next();
        }

        if (this.rmethod === 'post') {
            router.post(this.rpath, addResponses, this.rhandler.handle.bind(this.rhandler));
        } else if (this.rmethod === 'get') {
            router.get(this.rpath, addResponses, this.rhandler.handle.bind(this.rhandler));
        } else if (this.rmethod === 'put') {
            router.put(this.rpath, addResponses, this.rhandler.handle.bind(this.rhandler));
        } else if (this.rmethod === 'delete') {
            router.delete(this.rpath, addResponses, this.rhandler.handle.bind(this.rhandler));
        } else {
           throw new Error('All routes must have a designated method');
        }

        router.responses = this.responses;

        return router;
    }
}

export default Route;