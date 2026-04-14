const { createClient } = require('@supabase/supabase-js')
const dotenv = require('dotenv')
const path = require('path')

// Load .env.local from the project root
dotenv.config({ path: path.join(__dirname, '../../../../../../.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testConnection() {
  console.log('Testing Supabase connection...')
  try {
    const { data, error } = await supabase.from('profiles').select('*').limit(1)
    if (error) {
      if (error.code === 'PGRST116' || error.message.includes('not found')) {
        console.log('✅ Connection Successful! (Note: Table "profiles" does not exist yet).')
      } else {
        console.error('❌ Connection Failed:', error.message)
      }
    } else {
      console.log('✅ Connection Successful! Found data:', data)
    }
  } catch (err) {
    console.error('❌ Unexpected Error:', err.message)
  }
}

testConnection()
