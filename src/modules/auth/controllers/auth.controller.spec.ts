import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RolesGuard } from '../../../guards';
import { UsersService } from '../../users/services/users.service';
import { UsersEntity } from '../../users/entities/users.entity';
import { AuthService } from '../services/auth.service';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthServices = {};
  const mockAuthRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule],
      controllers: [AuthController],
      providers: [
        AuthService,
        UsersService,
        {
          provide: RolesGuard,
          useValue: jest.fn().mockImplementation(() => true),
        },
        {
          provide: getRepositoryToken(UsersEntity),
          useValue: mockAuthRepository,
        },
      ],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthServices)
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
