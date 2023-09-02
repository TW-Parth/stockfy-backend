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

    return res.ok({
      data: {},
    });
  } catch (error) {
    res.internalServerError();
  }
};

const getAll = async (req, res) => {
  try {
    const contacts = await ContactUsModel.find();

    return res.ok({
      data: contacts,
    });
  } catch (error) {
    console.log(error);
    res.internalServerError();
  }
};

module.exports = { contactUs, getAll };
