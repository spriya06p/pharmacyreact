// very small stub. Replace with FCM/Twilio in production.
exports.sendNotification = async (user, message) => {
  console.log(`Notify ${user ? user.email || user.phone : 'unknown user'}: ${message}`);
  return true;
};
