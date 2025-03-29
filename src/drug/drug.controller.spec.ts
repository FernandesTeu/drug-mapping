import { Test, TestingModule } from '@nestjs/testing';
import { DrugController } from './drug.controller';
import { DrugService } from './drug.service';

describe('DrugController', () => {
  let controller: DrugController;
  let service: DrugService;

  const mockDrugService = {
    extractIndications: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DrugController],
      providers: [
        {
          provide: DrugService,
          useValue: mockDrugService,
        },
      ],
    }).compile();

    controller = module.get<DrugController>(DrugController);
    service = module.get<DrugService>(DrugService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call DrugService.extractIndications and return its result', async () => {
    const labelText =
      'This medication is indicated for hypertension and diabetes.';
    const extracted = [
      { condition: 'Hypertension' },
      { condition: 'Diabetes' },
    ];
    mockDrugService.extractIndications.mockImplementation(
      (labelText: string) => extracted,
    );

    const result = await controller.extractIndications(labelText);
    expect(service.extractIndications('')).toHaveBeenCalledWith(labelText);
    expect(result).toEqual({ indications: extracted });
  });
});
