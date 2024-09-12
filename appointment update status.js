// In your Express app
const admin = require('firebase-admin');
const serviceAccount = require('./path-to-your-firebase-admin-sdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function sendNotification(token, title, body) {
  try {
    await admin.messaging().send({
      token: token,
      notification: {
        title: title,
        body: body
      }
    });
    console.log('Notification sent successfully');
  } catch (error) {
    console.log('Error sending notification:', error);
  }
}

// Update appointment status endpoint
app.put('/api/appointments/:id', authenticateJWT, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const appointment = await Appointment.findByIdAndUpdate(id, { status }, { new: true });
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    const user = await User.findById(appointment.user);
    if (user && user.fcmToken) {
      await sendNotification(
        user.fcmToken,
        'Appointment Update',
        `Your appointment status has been updated to ${status}`
      );
    }
    
    res.json({ message: 'Appointment updated successfully', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Error updating appointment', error: error.message });
  }
});