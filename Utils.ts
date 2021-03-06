export module Utils {
    export function getIntegerInRange(min:number, max:number):number {
        return Math.floor(min) + Math.floor((1 + max - min) * Math.random());
    }
    export interface ICompareJSONResult {
        success:boolean,
        location:string
    }
    export function compareJSONSchemas(target:object, origin:object):ICompareJSONResult {
        var result:ICompareJSONResult = {success:true, location:""};
        if(typeof(target) != typeof(origin)) {
            result.success = false;
            result.location += "";
            return result;
        }

        if(typeof(target) == "object") {
            if(Array.isArray(target) == Array.isArray(origin)) {
                if(Array.isArray(target) && Array.isArray(origin)) {
                    if(target.length > 0 && origin.length > 0) {
                        for (let i:number = 0; i < target.length; i++) {
                            let subResult:ICompareJSONResult = compareJSONSchemas(target[i], origin[0]);
                            if(subResult.success == false) {
                                result.success = false;
                                result.location += "[" + i + "]" + (subResult.location.length > 0 ? ("." + subResult.location) : "");
                                return result;
                            }
                        }
                        return result;
                    }
                } 
                for (let prop in origin) {
                    let subResult:ICompareJSONResult = compareJSONSchemas(target[prop], origin[prop]);
                    if(subResult.success == false) {
                        result.success = false;
                        result.location += prop
                        if(subResult.location.length > 0) {
                            if(Array.isArray(target[prop]) == false) {
                                result.location += "." + subResult.location;
                            } else {
                                result.location += subResult.location;
                            }
                        }
                        return result;
                    }
                }
            } else {
                result.success = false;
                return result;
            }
        }
        return result;
    }
}


