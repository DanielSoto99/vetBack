import { Test, TestingModule } from '@nestjs/testing';
import { DesparasitacionesService } from './desparasitaciones.service';

describe('DesparasitacionesService', () => {
  let service: DesparasitacionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DesparasitacionesService],
    }).compile();

    service = module.get<DesparasitacionesService>(DesparasitacionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
