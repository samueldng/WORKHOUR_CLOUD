import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly users = [
    {
      userId: 1,
      username: 'admin',
      password: '$2b$10$rVvax2hL3CBUQfDxD3b9UeH70h/G9PozP0l/RhLQcEydDyH/CzqOq', // password: admin
    }
  ];

  constructor(private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = this.users.find(u => u.username === username);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.userId,
        username: user.username
      }
    };
  }

  async register(userDto: any) {
    // In a real application, you would save the user to a database
    return {
      message: 'User registered successfully',
      user: {
        id: this.users.length + 1,
        username: userDto.username
      }
    };
  }
}