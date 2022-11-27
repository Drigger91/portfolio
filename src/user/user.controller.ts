import { Controller, Get } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("/user")
export class UserController {
    constructor(private readonly service: UserService) {}
    @Get()
    getUserGreeting() : string {
        return this.service.getGreeting();
    }
}