import{Schema, model} from 'mongoose'


const userCollection='users';

const userSchema = new Schema({
    firstName: String,
    lastName:String,
    email:{
        type:String,
        required:true,
        unique:true
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'carts', // Referencia al modelo de carritos
      }
    }
)

 const userModel=model(userCollection, userSchema);
 export default userModel;