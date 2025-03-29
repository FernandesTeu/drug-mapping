import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

interface CopayCardData {
  ProgramID: number;
  ProgramName: string;
  TherapeuticAreas: string[];
  Drugs: string[];
  CoverageEligibilities: string[];
  FundLevels: any[];
  Manufacturers: string[];
  ProgramURL: string;
  HelpLine: string;
  EnrollmentReq: boolean;
  EnrollmentURL: string;
  ExpirationDate: string;
  EstAppTime: string;
  EligibilityDetails: string;
  IncomeReq: boolean;
  IncomeDetails: string;
  AnnualMax: string;
  MaximumBenefit: string | null;
  OfferRenewable: boolean;
  RenewalMethod: string;
  AddRenewalDetails: string;
  ProgramDetails: string;
  MADetails: string;
  AddOnProgram: boolean;
  AddOnDetails: string | null;
  BridgeProgram: boolean;
  BridgeDetails: string | null;
  FreeTrialOffer: boolean;
  CouponVehicle: string;
  ProcessingVendor: string;
  BinNum: string;
  PCNNum: string;
  GroupNum: string;
  MaxNumberUses: string;
  ActivationReq: boolean;
  ActivationMethod: string;
  ActivationNum: string;
  ClicknPrint: boolean;
  FundLevelType: string | null;
  RestrictionDetails: string | null;
  AssistanceType: string;
  LastUpdated: string;
  AssociatedCoupons: any;
  AssociatedPAPs: any[];
  AssociatedFoundations: any[];
  DrugIndications?: Array<{
    condition: string;
    synonyms: string[];
  }>;
}

export interface IMedicalCondition {
  condition: string;
  synonyms: string[];
}

@Injectable()
export class IndicationsService {
  // This data was provide from ChatGPT "Indications and Usage"
  private readonly extractedConditions: IMedicalCondition[] = [];

  private getFilePath(): string {
    // Get the path to the current working directory and append the relative path to the JSON file
    return path.join(process.cwd(), 'src', 'drug', 'dupixent.json');
  }

  // load the JSON file and return parsing data
  loadCopayCardData(): CopayCardData {
    const filePath = this.getFilePath();
    const data = fs.readFileSync(filePath, 'utf-8');
    return (JSON.parse(data) ?? JSON.parse('{}')) as CopayCardData;
  }

  /**
   * This method will add the DrugIndications field to the JSON data
   * if it doesn't already exist, and populate it with the extracted conditions
   * from the extractedConditions array.
   * @param copayData
   * @returns
   */
  fillGapsInJson(copayData: CopayCardData): CopayCardData {
    return {
      ...copayData,
      DrugIndications: this.extractedConditions,
    };
  }

  /**
   * This method will update the JSON file with the new data.
   * It will first load the existing data, fill in any gaps,
   * and then write the updated data back to the file.
   * @returns
   * @throws Error if the file cannot be written
   * @throws Error if the JSON data cannot be parsed
   * @throws Error if the JSON data cannot be stringified
   */
  updateFileWithNewData(gptData: IMedicalCondition[]): CopayCardData {
    this.extractedConditions.push(...gptData);
    const updatedData = this.getUpdatedCopayCardData();
    try {
      fs.writeFileSync(
        this.getFilePath(),
        JSON.stringify(updatedData, null, 2),
        'utf-8',
      );
      return updatedData;
    } catch (error) {
      throw new Error(`Error updating file: ${error}`);
    }
  }

  // Return the updated data
  getUpdatedCopayCardData(): CopayCardData {
    const originalData = this.loadCopayCardData();
    return this.fillGapsInJson(originalData);
  }
}
