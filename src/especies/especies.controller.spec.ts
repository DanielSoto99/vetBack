import { Test, TestingModule } from '@nestjs/testing';
import { EspeciesController } from './especies.controller';

describe('EspeciesController', () => {
  let controller: EspeciesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EspeciesController],
    }).compile();

    controller = module.get<EspeciesController>(EspeciesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
