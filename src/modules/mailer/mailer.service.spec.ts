import { Test, TestingModule } from '@nestjs/testing';
import { MaileService } from './mailer.service';

describe('MailerService', () => {
  let service: MaileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaileService],
    }).compile();

    service = module.get<MaileService>(MaileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
