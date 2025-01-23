import mongoose, {Schema} from "mongoose";

const subscriptionSchema = new Schema({
    subscriber: {
        type: Schema.Types.ObjectId, //one who is subscripbing
        ref: 'User'
    },
    channel: {
        type: Schema.Types.ObjectId, //one whom is being subscribed to
        ref: 'User'
    },


},{timestamps: true});



export const Subscription = mongoose.model('Subscription', subscriptionSchema);