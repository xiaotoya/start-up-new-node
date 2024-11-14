import httpRequest from '@/http';
import { Controller, Get } from '@nestjs/common';

@Controller('http-test')
export class HttpTestController {
    getJiajia1() {
        return httpRequest.get({url: '/jiajia/1'});
    }
    getJiajia2() {
        return httpRequest.get({url: '/jiajia/2'});
    }
    getJiajia3() {
        return httpRequest.get({url: '/jiajia/3'});
    }
    @Get('all')
    findAll(): Promise<any> {
        return Promise.all([this.getJiajia1(), this.getJiajia2(), this.getJiajia3()])
            .then((data) => {
                console.log(data);
                return data;
            })
            .catch((err) => {
                throw err;
            });
    }
    @Get('one')
    OneByOne(): Promise<any> {
        return this.getJiajia1().then((data) => {
            return this.getJiajia2();
        })
        .then((data) => {
            return this.getJiajia3();
        })
        .then((data) => {
            return this.getJiajia3();
        })
        .catch((err) => {
            throw err;
        });
    }
}
