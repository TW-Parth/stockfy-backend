const { default: axios } = require('axios');
const FormData = require('form-data');

const statistics = async (req, res) => {
  try {
    const userId = req.userId;
    const targetUrl = 'https://d3a3-2401-4900-1c80-f524-7894-729c-2a59-9eff.ngrok-free.app/predict';
    const formData = new FormData();
    formData.append('customer_id', userId);
    const response = await axios.post(targetUrl, formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    if (response.status === 200) {
      return res.ok({
        data: response.data,
      });
    }
  } catch (error) {
    console.log('--error::', error);
    res.internalServerError();
  }
};

module.exports = {
  statistics,
};
