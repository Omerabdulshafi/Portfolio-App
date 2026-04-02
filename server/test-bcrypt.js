const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Direct test
const bcrypt = require('bcryptjs');

console.log('Testing bcryptjs...');
try {
  console.log('1. Creating salt...');
  const salt = bcrypt.genSaltSync(10);
  console.log('   Salt created:', salt.substring(0, 10) + '...');
  
  console.log('2. Hashing password...');
  const hashed = bcrypt.hashSync('testPassword123', salt);
  console.log('   Password hashed:', hashed.substring(0, 20) + '...');
  
  console.log('3. Comparing password...');
  const isMatch = bcrypt.compareSync('testPassword123', hashed);
  console.log('   Match result:', isMatch);
  
  console.log('\n✓ bcryptjs is working correctly!');
  process.exit(0);
} catch (error) {
  console.error('✗ Error:', error.message);
  console.error('Stack:', error.stack);
  process.exit(1);
}
