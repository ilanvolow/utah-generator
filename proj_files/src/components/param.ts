
class Param {

    public name: string;
    public dataType: string;
    public paramType: string;

    static jsxFactory(args: any, children: any[]): Param | undefined {
        if (Param.validateParam(args.name, args.dataType, args.paramType)) {
           const newParam: Param = new Param(args.name, args.type, args.paramType)
            return newParam;
        } else {
            return;
        }
    }

    static validateParam(name: string, dataType: string, paramType: string) {
        let isValid = true;
        if (!name) {
            throw new Error('Param must have a name');
            isValid = false;
        } else if (!dataType) {
            throw new Error('Param must have a valid dataType');
            isValid = false;
        } else if (!paramType) {
            throw new Error('Param must have a valid paramType');
            isValid = false;
        }

        return isValid;
    }

    constructor(name: string,  dataType: string, paramType:string) {
        this.name = name;
        this.dataType = dataType;
        this.paramType = paramType;
    }
}

export default Param;