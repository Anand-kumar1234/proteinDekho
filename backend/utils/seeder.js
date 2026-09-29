import dotenv from 'dotenv';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Food from '../models/Food.js';

// __dirname setup ES Module Scope ke liye
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Root directory se .env load karein
dotenv.config({
  path: path.resolve(__dirname, '../.env')
});

const runSeeder = async () => {
  try {
    console.log('⏳ Connecting to MongoDB...');
    console.log('URI Found:', process.env.MONGO_URI ? 'Yes' : 'No');

    if (!process.env.MONGO_URI) {
      throw new Error(
        '.env file me MONGO_URI nahi mila ya empty hai!'
      );
    }

    // MongoDB connect
    await mongoose.connect(process.env.MONGO_URI);

    console.log('✅ MongoDB Connected for Seeding...');

    // seedData.json ka path
    const filePath = path.resolve(
      __dirname,
      '../data/seedData.json'
    );

    // JSON file read
    const rawData = fs.readFileSync(filePath, 'utf-8');

    // JSON ko JavaScript array me convert
    const foods = JSON.parse(rawData);

    // Check karo data array hai ya nahi
    if (!Array.isArray(foods)) {
      throw new Error(
        'seedData.json ke andar data array format me hona chahiye!'
      );
    }

    console.log(`📦 Seed file me ${foods.length} foods mile.`);

    // Minimum 100 foods check
    if (foods.length < 100) {
      throw new Error(
        `Sirf ${foods.length} foods mile. Kam se kam 100 foods required hain.`
      );
    }

    // Purana Food data delete
    await Food.deleteMany({});

    console.log('🗑️ Purana food data clean ho gaya...');

    // Naya data insert
    const insertedFoods = await Food.insertMany(foods);

    console.log(
      `🚀 Successfully ${insertedFoods.length} foods MongoDB me upload ho gaye!`
    );

    // Connection close
    await mongoose.connection.close();

    console.log('🔒 Connection closed.');

    process.exit(0);

  } catch (error) {

    console.error(
      '❌ Error during seeding:',
      error.message
    );

    // Error ke baad connection close
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }

    process.exit(1);
  }
};

runSeeder();