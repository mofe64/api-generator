import mongoose from "mongoose";
const accountSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  address: {
    type: String,
    required: [true, "please provide address"],
    unique: true,
  },
});

const Account = mongoose.model(Account, accountSchema);
export default Account;
