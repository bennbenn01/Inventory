import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema({
    numberOfitems : { type: Number, required: true, min: 1},
    itemPicture: { type: String, required: true},
    itemName: { type: String, required: true},
    startedDate: { type: String, required: true},
    expirationDate: { type: String, required: true},
    itemPrice: { type: Number, required: true, min: 0.00},
    itemDiscount: { type: Number, required: true, min: 0}
}, { collection: 'items' });

const Item = mongoose.model('Item', itemSchema);
export default Item;