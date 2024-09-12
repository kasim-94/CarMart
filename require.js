const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Car valuation endpoint
app.post('/api/valuate', (req, res) => {
  const { make, model, year, mileage, condition } = req.body;
  
  // Here you would typically have a complex algorithm or third-party API
  // to calculate the car's value. For this example, we'll use a simple calculation.
  const baseValue = 10000;
  const ageDeduction = (2024 - year) * 500;
  const mileageDeduction = mileage * 0.05;
  const conditionMultiplier = {
    'Excellent': 1.1,
    'Good': 1,
    'Fair': 0.9,
    'Poor': 0.8
  };

  const estimatedValue = (baseValue - ageDeduction - mileageDeduction) * conditionMultiplier[condition];

  res.json({ estimatedValue: Math.max(estimatedValue, 0) });
});

// Appointment booking endpoint
app.post('/api/book-appointment', (req, res) => {
  const { userId, carDetails, preferredDate } = req.body;
  
  // Here you would typically save this to a database
  // For this example, we'll just send a success response
  res.json({ success: true, message: 'Appointment booked successfully' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));