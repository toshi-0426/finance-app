export const types = [
    'Income', 'Expense', 'Investment', 'Saving'
]

export const categories = [
    'Housing', 'Transportation', 'Food', 'Education', 'Phone', 
    'Utilities', 'Clothes', 'Beauty', 'Socializing', 'Books', 
    'Insurance', 'Tax', 'Health', 'Alchohol', 'Other'
]

export type TransactionType = typeof types[number];
export type TransactionCategory = typeof categories[number];