import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { faker } from '@faker-js/faker'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE
)

export const categories = [
    'Housing', 'Transportation', 'Food', 'Education', 'Phone', 
    'Utilities', 'Clothes', 'Beauty', 'Socializing', 'Books', 
    'Insurance', 'Tax', 'Health', 'Alchohol', 'Other'
]

async function seedUsers() {
  for (let i = 0; i < 10; i++) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: faker.internet.email(),
        password: 'password',
      })
      if (error) {
        throw new Error(error);
      }

      console.log('User added')
    } catch(e) {
      console.error("Error creating a new user", e);
    }
  }
}

async function seed() {
  await seedUsers()
  let transactions = []
  const { data: { users }, error: listUsersError } = await supabase.auth.admin.listUsers()

  if (listUsersError) {
    console.error('Cannot list users, aborting')
    return
  }

  const user_ids = users?.map(user => user.id);


  for (let i = 0; i < 100; i++) {
    const created_at = faker.date.past()
    let type, category = null
    const user_id = faker.helpers.arrayElement(user_ids)


    const typeBias = Math.random()

    if (typeBias < 0.80) {
      type = 'Expense'
      category = faker.helpers.arrayElement(
        categories
      )
    } else if (typeBias < 0.90) {
      type = 'Income'
    } else {
      type = faker.helpers.arrayElement([
        'Saving', 'Investment'
      ])
    }

    let amount
    switch (type) {
      case 'Income':
        amount = faker.number.int({
          min: 2000,
          max: 9000
        })
        break
      case 'Expense':
        amount = faker.number.int({
          min: 10,
          max: 1000
        })
        break
      case 'Investment':
      case 'Saving':
        amount = faker.number.int({
          min: 3000,
          max: 10000
        })
        break
    }

    transactions.push({
      created_at,
      amount,
      type,
      description: faker.lorem.sentence(),
      category,
      user_id,
    })
  }

  const { error } = await supabase.from('transactions')
    .insert(transactions)

  if (error) {
    console.error('Error inserting data')
  } else {
    console.log(`${transactions.length} transactions stored`)
  }
}

seed().catch(console.error)