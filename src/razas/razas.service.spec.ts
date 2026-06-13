import { Test, TestingModule } from '@nestjs/testing';
import { RazasService } from './razas.service';

describe('RazasService', () => {
  let service: RazasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RazasService],
    }).compile();

    service = module.get<RazasService>(RazasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
