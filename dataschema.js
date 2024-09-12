// User Schema
const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    phone: String,
  });
  
  // Car Schema
  const CarSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    make: String,
    model: String,
    year: Number,
    mileage: Number,
    condition: String,
    estimatedValue: Number,
  });
  
  // Appointment Schema
  const AppointmentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car' },
    date: Date,
    status: { type: String, enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'] },
  });