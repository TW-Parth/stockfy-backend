const { Schema } = require('mongoose');
const { uuid } = require('uuid');
const {  PRODUCT_TYPE } = require('../constants/enums');
const { dbConnection } = require('../helpers/mongoose.helper');

const productSchema = new Schema(
  {
    orderId: { type: String, default: '' },
    orderDate: { type: String, default: '' },
    shipDate: { type: String, default: '' },
    shipMode: { type: String, default: '' },
    customerId: { type: String, default: '' },
    customerName: { type: String, default: '' },
    segment: { type: String, default: '' },
    country: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    postalCode: { type: String, default: '' },
    region: { type: String, default: '' },
    productId: { type: String, default: '' },
    category: { type: String, default: '' },
    subCategory: { type: String, default: '' },
    productName: { type: String, default: '', trim: true },
    price: { type: Number, default: 0 },
    quantity: { type: Number, default: 1 },
    discount: { type: Number, default: 1 },
    profit: { type: Number, default: 1 },
    brandId: { type: String, default: '', trim: true },
    brandName: { type: String, default: '', trim: true },
    totalProductSells: { type: Number, default: 0 },
    productRating: { type: String, default: '', trim: true },
    stock: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
);

const ProductModel = dbConnection.model('products', productSchema, 'products');

module.exports = {
    ProductModel,
};
