const { ProductModel } = require('../models');
const csv = require('csvtojson');
const { default: axios } = require('axios');
const FormData = require('form-data');

const importProducts = async (req, res) => {
  try {
    const file = req.files[0];
    const userId = req.userId;

    console.log('--::::::::', file.buffer);
    const targetUrl = 'https://d3a3-2401-4900-1c80-f524-7894-729c-2a59-9eff.ngrok-free.app/upload';
    const formData = new FormData();
    formData.append('file', file.buffer, { filename: file.originalname });
    formData.append('customer_id', userId);
    const response = await axios.post(targetUrl, formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    console.log(response.status);

    return res.ok({
      data: {},
    });
  } catch (error) {
    console.log('--error::', error);
    return res.internalServerError();
  }
};

module.exports = {
  importProducts,
};
