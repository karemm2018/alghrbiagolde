// scratch/test_supabase.js
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Manually parse .env.local
const envPath = path.resolve(__dirname, '../.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};
envContent.split('\n').forEach((line) => {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) return;
  const parts = trimmed.split('=');
  const key = parts[0].trim();
  // Join the rest in case the value contains '='
  const value = parts.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
  env[key] = value;
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;

console.log('URL:', supabaseUrl);
console.log('Anon key length:', anonKey ? anonKey.length : 0);
console.log('Service key length:', serviceKey ? serviceKey.length : 0);

async function test() {
  if (!supabaseUrl || !anonKey || !serviceKey) {
    console.error('Missing env variables!');
    return;
  }

  // 1. Test Anon Client
  try {
    console.log('\n--- Testing Anon Client ---');
    const anonClient = createClient(supabaseUrl, anonKey);
    const { data, error } = await anonClient.from('properties').select('id').limit(1);
    if (error) {
      console.error('Anon client failed query:', error.message);
    } else {
      console.log('Anon client query successful, data count:', data.length);
    }
  } catch (err) {
    console.error('Anon client exception:', err.message);
  }

  // 2. Test Admin Client
  try {
    console.log('\n--- Testing Admin Client (listUsers) ---');
    const adminClient = createClient(supabaseUrl, serviceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      }
    });
    const { data: { users }, error } = await adminClient.auth.admin.listUsers();
    if (error) {
      console.error('Admin client failed listUsers:', error.message, error.status);
    } else {
      console.log('Admin client successful! Users count:', users.length);
    }
  } catch (err) {
    console.error('Admin client exception:', err.message);
  }
}

test();
