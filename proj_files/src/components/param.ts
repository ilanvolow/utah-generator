
class Param {

    public name: string;
    public datatype: string;
    public paramtype: string;

    static jsxFactory(args: any, children: any[]): Param | undefined {
        if (Param.validateParam(args.name, args.datatype, args.paramtype)) {
           const newParam: Param = new Param(args.name, args.type, args.paramType)
            return newParam;
        } else {
            return;
        }
    }

    static validateParam(name: string, datatype: string, paramtype: string) {
        let isValid = true;
        if (!name) {
            throw new Error('Param must have a name');
            isValid = false;
        } else if (!datatype) {
            throw new Error('Param must have a valid dataType');
            isValid = false;
        } else if (!paramtype) {
            throw new Error('Param must have a valid paramType');
            isValid = false;
        }

        return isValid;
    }

    constructor(name: string,  dataType: string, paramType:string) {
        this.name = name;
        this.datatype = dataType;
        this.paramtype = paramType;
    }
}

export default Param;