import { Nickname } from "@/core/domain/value-objects/Nickname";
import { User } from "../../domain/entity/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { Email } from "@/core/domain/value-objects/Email";
import { Password } from "@/core/domain/value-objects/Password";

export class MockUserRepository implements IUserRepository{
    private static instance: MockUserRepository;
    private users: User[] = [{
        id: 'user-1',
        nickname: Nickname.create('Hawks'),
        email: Email.create('linnyohan@gmail.com'),
        password: Password.create('hashed_12345@aA')
    }];
        
    private constructor() {}

    public static getInstance(): MockUserRepository {
        if(!MockUserRepository.instance) {
            MockUserRepository.instance = new MockUserRepository();
        }
        return MockUserRepository.instance;
    }

    async save(user: User): Promise<void> {
        this.users.push(user);
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.users.find(user => user.email.value === email) || null;
    }

    async findById(id: string): Promise<User | null> {
        return this.users.find(user => user.id === id) || null;
    }

    async update(user: User): Promise<void> {
        const userIndex = this.users.findIndex(u => u.id === user.id);
        if (userIndex !== -1) {
        this.users[userIndex] = user;
        }
    }

    async delete(id: string): Promise<void> {
        this.users = this.users.filter(user => user.id !== id);
    }

    public reset(): void {
        this.users = [];
    }

}