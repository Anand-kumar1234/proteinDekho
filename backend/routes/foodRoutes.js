// ✅ Correct Import Syntax:
import express from 'express';
import { 
  foodData
} from '../controllers/foodController.js'; // <-- .js extension zaroori hai!
import { searchData } from '../controllers/searchController.js'; // <-- .js extension zaroori hai!
const router = express.Router();

router.get('/food',foodData)
router.post("/food/search", searchData);

export default router;