import { Email } from "../value-objects/Email";
import { Nickname } from "../value-objects/Nickname";
import { Password } from "../value-objects/Password";

export class User{
    private constructor(
        readonly id: string,
        readonly nickname: Nickname,
        readonly email: Email,
        readonly password: Password
    ){  }
    static create(
        id: string,
        nickname: Nickname,
        email: Email,
        password: Password
    ): User {
        return new User(id, nickname, email, password)
    }
}