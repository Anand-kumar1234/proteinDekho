import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  nameHindi: { type: String },
  category: { type: String, required: true }, // e.g., Dairy, Pulses, Nuts, Vegetables
  isVeg: { type: Boolean, default: true },
  
  // Basic Serving Info
  standardServingSize: { type: Number, default: 100 }, // g ya ml
  servingUnit: { type: String, default: 'g' },
  householdServing: { type: String }, // e.g. "1 slab / 4 thick cubes"

  // Macros (per 100g)
  macros: {
    protein: { type: Number, default: 0 },   // in grams
    calories: { type: Number, default: 0 },  // in kcal
    carbs: { type: Number, default: 0 },     // in grams
    fats: { type: Number, default: 0 },      // in grams
    fiber: { type: Number, default: 0 }      // in grams
  },

  // Vitamins (per 100g)
  vitamins: {
    vitaminA: { type: Number, default: 0 },  // in mcg / IU
    vitaminB12: { type: Number, default: 0 },// in mcg
    vitaminC: { type: Number, default: 0 },  // in mg
    vitaminD: { type: Number, default: 0 },  // in IU / mcg
    vitaminE: { type: Number, default: 0 },  // in mg
    folate: { type: Number, default: 0 }     // Vitamin B9 (mcg)
  },

  // Minerals (per 100g)
  minerals: {
    calcium: { type: Number, default: 0 },   // in mg
    iron: { type: Number, default: 0 },      // in mg
    zinc: { type: Number, default: 0 },      // in mg
    potassium: { type: Number, default: 0 }, // in mg
    magnesium: { type: Number, default: 0 }, // in mg
    sodium: { type: Number, default: 0 }     // in mg
  },

  // Health Metrics & Tags
  glycemicIndex: { type: String, default: 'Low' }, // Low / Medium / High
  tags: [{ type: String }] // e.g. ["High Calcium", "Rich in Iron", "Keto Friendly"]
}, { timestamps: true });

export default mongoose.model('Food', foodSchema);