import { Test, TestingModule } from '@nestjs/testing';
import { DesparasitacionesController } from './desparasitaciones.controller';

describe('DesparasitacionesController', () => {
  let controller: DesparasitacionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DesparasitacionesController],
    }).compile();

    controller = module.get<DesparasitacionesController>(DesparasitacionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
