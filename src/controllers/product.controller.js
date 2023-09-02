const { ProductModel } = require('../models');
const csv = require('csvtojson');

const importProducts = async (req, res) => {
  try {
    const file = req.files[0];
    const userId = req.userId;
    const csvFileData = await csv({}).fromString(file.buffer.toString('utf8'));
    const bulkOperation = ProductModel.collection.initializeUnorderedBulkOp();
    for (const data of csvFileData) {
      const updateData = {
        userId,
        orderId: data.orderId,
        orderDate: data.orderDate,
        shipDate: data.shipDate,
        shipMode: data.shipMode,
        customerId: data.customerId,
        customerName: data.customerName,
        segment: data.segment,
        country: data.country,
        city: data.city,
        state: data.state,
        postalCode: data.postalCode,
        region: data.region,
        productId: data.productId,
        category: data.category,
        subCategory: data.subCategory,
        productName: data.productName,
        price: +data.price,
        quantity: +data.quantity,
        discount: +data.discount,
        profit: +data.profit,
        brandId: data.brandId,
        brandName: data.brandName,
        totalProductSells: +data.totalProductSells,
        productRating: data.productRating,
        stock: +data.stock,
      };
      bulkOperation.find({ orderId: data.orderId }).upsert().updateOne({
        $set: updateData,
      });
    }

    if (bulkOperation.batches.length) {
      bulkOperation.execute((err) => {
        if (err) {
          console.log(err);
        }
      });
    }

    return res.ok({
      data: {},
    });
  } catch (error) {
    res.internalServerError();
  }
};

module.exports = {
  importProducts,
};
