import {Logger as log} from '@nestjs/common';
export const Log = () => {
    return function (target: any, key: any) {
        target[key] = new log(target.constructor.name);
    }
}