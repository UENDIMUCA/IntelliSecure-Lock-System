const User = require('../models/user'); // Assurez-vous que le modèle User est correctement importé

async function generateUniquePincode() {
  const generatePincode = () => {
    return Math.floor(1000 + Math.random() * 9000).toString(); // Génère un code PIN à 4 chiffres
  };

  let pincode;
  let pincodeExists = true;

  while (pincodeExists) {
    pincode = generatePincode();
    const existingUser = await User.findOne({ where: { pincode } });
    pincodeExists = !!existingUser;
  }

  return pincode;
}

module.exports = generateUniquePincode;