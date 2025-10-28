<<<<<<< HEAD
import { User } from '../entity/User';
=======
import { User } from '@/core/domain/entity/User';
>>>>>>> 55a7e8956e83ca4fef89d7bec2cbce7faed2f279
import { IUserRepository } from '../repositories/IUserRepository';

export class FindUserByEmail {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(params: { email: string }): Promise<User | null> {
    return this.userRepository.findByEmail(params.email);
  }
}