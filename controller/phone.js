const EmergencyService = require('../models/phone');

exports.callEmergency = (req, res) => {
  const { serviceType } = req.params; 
  let emergencyNumber;
  if (serviceType === 'police') {
    emergencyNumber = '911'; 
  } else if (serviceType === 'ambulance') {
    emergencyNumber = '112'; 
  } else {
    return res.status(400).json({ error: 'Invalid service type' });
  }

  const emergencyService = new EmergencyService(
    'AC518016354dfdff431a3c8132ac42cbad',
    'your-twilio-auth-token'
  );

  // Call the emergency service
  emergencyService
    .dialEmergencyNumber(emergencyNumber)
    .then((call) => {
      console.log(`Calling ${serviceType}... Call SID: ${call.sid}`);
      res.status(200).json({ message: `Calling ${serviceType}...` });
    })
    .catch((error) => {
      console.error(`Failed to call ${serviceType}: ${error.message}`);
      res.status(500).json({ error: 'Failed to make the call' });
    });
};
