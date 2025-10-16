import { Email } from "../../../domain/value-objects/Email";
import { Password } from "../../../domain/value-objects/Password";
//Entities
import { User } from "../../../domain/entity/User";
import { Nickname } from "../../../domain/value-objects/Nickname";


describe('User', () => {
    it('should create a valid user', () => {
        const user = User.create(
            '1',
            Nickname.create("Hawks"),
            Email.create("linnYohan@gmail.com"),
            Password.create ('P@ssword1'),
        );

        expect(user.id).toBe('1');
        expect(user.nickname.value).toBe("Hawks");
        expect(user.email.value).toBe('linnYohan@gmail.com');
        expect(user.password.value).toBe('P@ssword1');
    });
});