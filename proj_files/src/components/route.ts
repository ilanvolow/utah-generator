import express, { Express } from 'express';
import Response from './response';
import ResponseHandler from './response_handler';
import Param from './param';
import { bindExpression } from '@babel/types';

class Route {

    public rpath: string;
    public rmethod: string;
    public rhandler: ResponseHandler;
    public responses: {[key: string]: Response};
    public queryParams: {[key: string]: Param};
    public pathParams: {[key: string]: Param};


    static jsxFactory(args: any, children: any[]): Route | undefined {
        if (Route.validateRoute(args.path, args.method, args.handler)) {
           const newRoute: Route = new Route(args.path, args.method, args.handler);

            for (let item of children) {
              if (item instanceof Response) {
                newRoute.responses[item.name] = item;
              } else if (item instanceof Param) {
                if (item['paramtype'] == 'query') {
                    newRoute.queryParams[item['name']] = item;
                } else if (item['paramtype'] == 'path') {
                    newRoute.pathParams[item['name']] = item;
                }
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
        this.rpath = path;
        this.rmethod = method;
        this.rhandler = new handler;
        this.responses = {};
        this.queryParams = {};
        this.pathParams = {};
    }

    public route(): express.Router {
        const router = express.Router();

        const responses = this.responses;
        const queryParams = this.queryParams;
        const pathParams = this.pathParams;

        function validateParams(req: express.Request, res: express.Response, next) {
            // Go through each non-optional query parameter and make sure it's represented
            // in the request. If not, send back an error.
            for (let queryParamKey in queryParams) {
                let currRequestQueryParam = req.query[queryParamKey];
                if (!currRequestQueryParam) {
                    // If the param we're looking for isn't there, check to see if it's optional.
                    // If the query param is required, then return an error
                    let queryParamObj = queryParams[queryParamKey];
                    if (!queryParamObj.isOptional) {
                        res.status(400).send('Suffusion of Yellow');
                        return;
                    }
                }
            }

            next();
        }

        function addResponses(req, res, next) {

            function reply(responseName: string, content: any) {
                const responseToUse = this.responses[responseName];
                if (!responseToUse) {
                    debugger;
                    throw new Error('No response is registered for ' + responseToUse);
                }

                this.status(responseToUse.code).send(content);
            }

            const boundReply = reply.bind(res);

            Object.assign(res, { 'responses' : responses,
            queryParams,
            pathParams,
            'reply' : boundReply });
            next();
        }

        if (this.rmethod === 'post') {
            router.post(this.rpath, validateParams, addResponses, this.rhandler.handle.bind(this.rhandler));
        } else if (this.rmethod === 'get') {
            router.get(this.rpath, validateParams, addResponses, this.rhandler.handle.bind(this.rhandler));
        } else if (this.rmethod === 'put') {
            router.put(this.rpath, validateParams, addResponses, this.rhandler.handle.bind(this.rhandler));
        } else if (this.rmethod === 'delete') {
            router.delete(this.rpath, validateParams, addResponses, this.rhandler.handle.bind(this.rhandler));
        } else {
           throw new Error('All routes must have a designated method');
        }

        router.responses = this.responses;

        return router;
    }
}

export default Route;