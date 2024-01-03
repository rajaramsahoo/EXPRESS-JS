import mongoose ,{Schema} from "mongoose";

const carSchema = new mongoose.Schema({
    name: String,
    model_name:String,
    price:Number,
    sellerId : {
        type:Schema.Types.ObjectId,
        ref:'seller'
    }
});

export default mongoose.model('car', carSchema);
