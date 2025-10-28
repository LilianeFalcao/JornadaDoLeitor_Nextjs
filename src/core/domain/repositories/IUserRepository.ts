import { User } from "../entity/User";

<<<<<<< HEAD
export interface IUserRepository {
  save(user: User): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  update(user: User): Promise<void>;
  delete(id: string): Promise<void>;
=======
export interface IUserRepository{
    save(user: User): Promise<void>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    update(user: User): Promise<void>;
    delete(id: string): Promise<void>;
>>>>>>> 55a7e8956e83ca4fef89d7bec2cbce7faed2f279
}