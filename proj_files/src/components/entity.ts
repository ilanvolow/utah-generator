
import express, { Express } from 'express';
import mongoose, { Document, Schema, Model, model } from 'mongoose';

const MONGODB_CONNECTION: string = 'mongodb://localhost:27017';


function convertToNodeType(typeName: string) {
    if (typeName === 'string') {
        return String;
    } else if (typeName === 'number') {
        return Number;
    } else if (typeName === 'date') {
        return Date;
    }
}

class Entity {

    public schema: Schema;
    public router: express.Router;
    public name: string;
    private model: any;

    constructor(name: string) {
        this.router = express.Router();
        this.name = name;
        this.model = null;
    }

    static jsxFactory(args: any, children: any[]): Entity {
        // const newRoute: Route = new Route(args.path, args.method, args.handler);
        // return newRoute;
        const entity = new Entity(args.name);
        entity.setupSchema(children);
        entity.setupRouting();
        return entity;
    }

    setupSchema(children: Property[]) {
        const schemaProps: {[index: string]: any} = {};

        for (const item of children) {
            schemaProps[item.name] = convertToNodeType(item.propertyType);
        }

        this.schema = new Schema(schemaProps, {timestamps: true});
        this.model = model(this.name, this.schema);
    }

    setupRouting() {
        const basePath = '/' + this.name.toLowerCase();
        this.router.post(basePath, this.createNewItem.bind(this));

        // TODO: doing a more 'join' way of doing this
        const getRetrievePath = basePath + '/:id';
        this.router.get(getRetrievePath, this.retrieveItem.bind(this));

        const putPath = basePath + '/:id';
        this.router.put(putPath, this.updateItem.bind(this));

        const deletePath = basePath + '/:id';
        this.router.delete(deletePath, this.deleteItem.bind(this));
    }

    createNewItem(request: express.Request, response: express.Response) {
        mongoose.connect('mongodb://localhost:27017/test');
        // TODO: Put in error handling
        this.model.create(request.body).then((doc: mongoose.Document) => {
            console.log(doc);
            response.json({ title: 'MongoBongo -- Create!'});
        });
    }

    retrieveItem(request: express.Request, response: express.Response) {
        const idParam = request.params['id'];
        if (idParam) {
            mongoose.connect('mongodb://localhost:27017/test');
            this.model.findById(idParam).then((doc: mongoose.Document) => {
                const resultJSON = JSON.stringify(doc);
                response.end(resultJSON);
            });
            
        } else {
            response.status(400).send('Incorrect parameters');
        }
    }

    updateItem(request: express.Request, response: express.Response) {
        const idParam = request.params['id'];
        if (idParam) {
            mongoose.connect('mongodb://localhost:27017/test');

            let query = { _id: idParam };
            this.model.update(query, request.body).then((doc: mongoose.Document) => {
                const resultJSON = JSON.stringify(doc);
                response.end(resultJSON);
            });
        } else {
            response.status(400).send('Incorrect parameters');
        }
    }

    deleteItem(request: express.Request, response: express.Response) {
        const idParam = request.params['id'];
        if (idParam) {
            mongoose.connect('mongodb://localhost:27017/test');
            this.model.deleteOne({ _id: idParam })
            .then((doc: mongoose.Document) => {
                const resultJSON = JSON.stringify(doc);
                response.end(resultJSON);
            })
        } else {
            response.status(400).send('Incorrect parameters');
        }
    }

    private initCaps(s: string) {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
}

class Property {

    public name: string;
    public propertyType: string;

    constructor(name: string, type: string) {
        this.name = name;
        this.propertyType = type;
    }

    static jsxFactory(args: any, children: any[]): Property {
        const newProperty = new Property(args.name, args.type);
        return newProperty
    }
}

export  { Entity, Property };