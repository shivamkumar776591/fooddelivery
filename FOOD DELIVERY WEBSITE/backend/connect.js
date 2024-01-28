const mongoose = require('mongoose');

const mongoDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/Gofood', { useNewUrlParser: true });
    console.log('Connected to database');

    const fetched_data = await mongoose.connection.db.collection('fooditems');
    const data = await fetched_data.find({}).toArray();

    const foodCategory = await mongoose.connection.db.collection('food_categories');
    const catData = await foodCategory.find({}).toArray();

    global.food_items = data;
    
    global.foodCategory = catData;
    
    
    // console.log('Data retrieved successfully');
  } catch (error) {
    console.log(error);
  }
};

module.exports = mongoDB;

mongoDB();
