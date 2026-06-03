/**
 * Dubai mortgage + purchase-cost model (build-plan §6.1). Pure functions, safe
 * on client and server. Verified against the reference: price 9,800,000,
 * deposit 1,960,000, 5%, 20yr → monthly ≈ 51,741, total costs 713,320,
 * total upfront 2,673,320.
 */

export type ConveyancingType = 'mortgage' | 'cash' | 'company';

export interface MortgageInput {
  price: number;
  deposit: number;
  years: number;
  rate: number; // annual %, e.g. 5
  conveyancing?: ConveyancingType;
}

export interface MortgageCosts {
  dldTransfer: number;
  mortgageRegistration: number;
  trustee: number;
  bankArrangement: number;
  valuation: number;
  agency: number;
  conveyancing: number;
}

export interface MortgageResult {
  loan: number;
  monthly: number;
  costs: MortgageCosts;
  totalCosts: number;
  totalUpfront: number;
}

const CONVEYANCING: Record<ConveyancingType, number> = {
  mortgage: 9450,
  cash: 6300,
  company: 10500,
};

/** Minimum deposit is 20% of the purchase price. */
export function minDeposit(price: number): number {
  return Math.round(price * 0.2);
}

export function computeMortgage(input: MortgageInput): MortgageResult {
  const price = Math.max(0, input.price);
  const deposit = Math.min(Math.max(0, input.deposit), price);
  const loan = Math.max(0, price - deposit);
  const months = Math.max(1, Math.round(input.years * 12));
  const monthlyRate = input.rate / 100 / 12;

  let monthly: number;
  if (loan <= 0) monthly = 0;
  else if (monthlyRate <= 0) monthly = loan / months;
  else {
    const f = Math.pow(1 + monthlyRate, months);
    monthly = (loan * monthlyRate * f) / (f - 1);
  }

  const costs: MortgageCosts = {
    dldTransfer: price * 0.04 + 580,
    mortgageRegistration: loan > 0 ? loan * 0.0025 + 290 : 0,
    trustee: price > 500000 ? 4200 : 2100,
    bankArrangement: loan > 0 ? loan * 0.01 : 0,
    valuation: loan > 0 ? 3000 : 0,
    agency: price * 0.02 * 1.05,
    conveyancing: CONVEYANCING[input.conveyancing ?? (loan > 0 ? 'mortgage' : 'cash')],
  };

  const totalCosts = Object.values(costs).reduce((a, b) => a + b, 0);
  return { loan, monthly, costs, totalCosts, totalUpfront: deposit + totalCosts };
}
