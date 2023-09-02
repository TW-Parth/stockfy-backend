const { Schema } = require('mongoose');
const { uuid } = require('uuid');
const {  PRODUCT_TYPE } = require('../constants/enums');
const { dbConnection } = require('../helpers/mongoose.helper');

const productSchema = new Schema(
  {
    productId: { type: String, default: uuid },
    productName: { type: String, default: '', trim: true },
    productType: { type: String, enum:Object.values(PRODUCT_TYPE), default: PRODUCT_TYPE.OTHERS, trim: true },
    categoryType: { type: String, default: '', trim: true },
    totalProductSells: { type: Number, default: 0 },
    brandId: { type: String, default: '', trim: true },
    brandName: { type: String, default: '', trim: true },
    quantity: { type: Number, default: 1 },
    stock: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    productSellDate: { type: String, default: '', trim: true },
    productRating: { type: String, default: '', trim: true },
    isDiscountApplied: { type: String, default: '', trim: true },
  },
  {
    timestamps: true,
  },
);

const ProductModel = dbConnection.model('products', productSchema, 'products');

module.exports = {
    ProductModel,
};
