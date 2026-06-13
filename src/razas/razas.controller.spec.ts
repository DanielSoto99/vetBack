import { Test, TestingModule } from '@nestjs/testing';
import { RazasController } from './razas.controller';

describe('RazasController', () => {
  let controller: RazasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RazasController],
    }).compile();

    controller = module.get<RazasController>(RazasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
