import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { username: username }
    });
    
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    };
  }

  async register(userDto: any) {
    // Hash the password
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    
    // Create the user in the database
    const user = await this.prisma.user.create({
      data: {
        username: userDto.username,
        email: userDto.email,
        password: hashedPassword
      }
    });
    
    const { password, ...result } = user;
    return {
      message: 'User registered successfully',
      user: result
    };
  }
  
  async getProfile(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId }
    });
    
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}