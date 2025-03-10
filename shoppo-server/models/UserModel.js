const mongoose = require("mongoose");

// Định nghĩa schema của User
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    pass: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required:true },
    phone: { type: Number, required: false},
  },
  { timestamps: true } // Tự động thêm createdAt & updatedAt
);

// Tạo Model từ schema
const User = mongoose.model("User", userSchema);

module.exports = User;
