const twilio = require('twilio');

class EmergencyService {
  constructor(accountSid, authToken) {
    this.client = new twilio(accountSid, authToken);
  }

  dialEmergencyNumber(number) {
    return this.client.calls.create({
      url: 'http://your-voice-response-url.com', // Provide a valid voice response URL
      to: number, // Emergency service number
      from: 'your Twilio phone number', // Your Twilio phone number
    });
  }
}

module.exports = EmergencyService;
