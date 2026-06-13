import { Test, TestingModule } from '@nestjs/testing';
import { EspeciesService } from './especies.service';

describe('EspeciesService', () => {
  let service: EspeciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EspeciesService],
    }).compile();

    service = module.get<EspeciesService>(EspeciesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
