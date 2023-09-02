const { webhookUrl } = require('../config/config.json');
const { ProductModel } = require('../models');

const webhook = async (req, res) => {
  try {
    const webhookData = req.body;

    if (webhookData) {
      await ProductModel.create(webhookData);
    }
    return res.ok({
      data: '',
    });
  } catch (error) {
    console.log('error', error);
  }
};

const webhookConfigure = async (req, res) => {
  try {
    const userId = res.userId;
    const data = {
      payload: {
        userId: 'string',
        orderId: 'string',
        orderDate: 'string',
        shipDate: 'string',
        shipMode: 'string',
        customerId: 'string',
        customerName: 'string',
        segment: 'string',
        country: 'string',
        city: 'string',
        state: 'string',
        postalCode: 'string',
        region: 'string',
        productId: 'string',
        category: 'string',
        subCategory: 'string',
        productName: 'string',
        price: 'string',
        quantity: 'number',
        discount: 'number',
        profit: 'string',
        brandId: 'string',
        brandName: 'string',
        totalProductSells: 'number',
        productRating: 'string',
        stock: 'number',
      },
      url: webhookUrl,
      userId,
    };
    return res.ok({ data });
  } catch (error) {}
};

module.exports = {
  webhookConfigure,
  webhook,
};
