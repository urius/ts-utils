export module Utils {
    export function getIntegerInRange(min:number, max:number):number {
        return Math.floor(min) + Math.floor((1 + max - min) * Math.random());
    }
}


