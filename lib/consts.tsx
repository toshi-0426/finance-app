export const types = [
    'Income', 'Expense', 'Investment', 'Saving'
] as const;

export const categories = [
    'Housing', 'Transportation', 'Food', 'Education', 'Phone', 
    'Utilities', 'Clothes', 'Beauty', 'Socializing', 'Books', 
    'Insurance', 'Tax', 'Health', 'Alchohol', 'Other'
]as const;

export type TransactionType = typeof types[number];
export type TransactionCategory = typeof categories[number];


export type Inputs = {
  type: TransactionType,
  category: TransactionCategory,
  created_at: string,
  amount: number,
  description: string
}

export const rangeTypes = [
  'last24hours',
  'last7days',
  'last30days',
  'last6months',
  'last12months',
] as const;

export type RangeType = typeof rangeTypes[number];