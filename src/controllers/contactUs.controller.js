const { ContactUsModel } = require('../models');

const contactUs = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, country, message } = req.validatedParams;

    const contactUsData = new ContactUsModel({
      firstName,
      lastName,
      email,
      phoneNumber,
      country,
      message,
    });

    await contactUsData.save();

    return res.status(200).json({
      statusCode: 200,
      code: 'SUCCESS',
      message: 'Contact information saved successfully',
      data: {},
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      statusCode: 500,
      code: 'FAIL',
      message: 'Internal server error',
      error: error,
      data: {},
    });
  }
};

module.exports = { contactUs };
