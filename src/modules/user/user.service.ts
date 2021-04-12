import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getAll() {
    return await this.userRepository.find();
  }

  async createUser(data: any) {
    return await this.userRepository.save(data);
  }

  async getUserByEmail(data: any) {
    return await this.userRepository.findOne(data);
  }

  async getUserById(id: Number) {
    return await this.userRepository.findOne(Number(id));
  }

  async updateUser(id: Number, body) {
    return this.userRepository.update(Number(id), body);
  }

  async deleteUser(id: Number) {
    return await this.userRepository.delete(Number(id));
  }
}
