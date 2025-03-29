import { Test, TestingModule } from '@nestjs/testing';
import { DrugService } from './drug.service';

describe('DrugService', () => {
  let service: DrugService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DrugService],
    }).compile();

    service = module.get<DrugService>(DrugService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should extract indications from text', async () => {
    const labelText =
      'This medication is indicated for hypertension and diabetes.';
    const indications = await service.extractIndications(labelText);
    expect(indications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ condition: 'Hypertension' }),
        expect.objectContaining({ condition: 'Diabetes' }),
      ]),
    );
  });
  it('should return an empty array if no known indication is found', async () => {
    const labelText = 'This text does not contain any known indications.';
    const indications = await service.extractIndications(labelText);
    expect(indications).toEqual([]);
  });
});
