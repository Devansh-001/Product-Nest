import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be a positive number']
    },
    rating: {
        type: Number,
        required: true,
        min: [0, 'Rating must be at least 0'],
        max: [5, 'Rating must not exceed 5'],
    }
    ,
    review: {
        type: String,
        required: false,
    }
    ,

    image: {
        type: String,
        required: true
    }
},
    { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

export default Product;