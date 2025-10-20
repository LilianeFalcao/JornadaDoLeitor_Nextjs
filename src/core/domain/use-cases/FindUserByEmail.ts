import { User } from '@/core/domain/entity/User';
import { IUserRepository } from '../repositories/IUserRepository';

export class FindUserByEmail {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(params: { email: string }): Promise<User | null> {
    return this.userRepository.findByEmail(params.email);
  }
}