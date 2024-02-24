const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      validate: {
        validator: (
          val //expresiones regulares
        ) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val),
        message: "Ingresa un Email valido",
      },
      unique: true,
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: (val) =>
          /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/.test(
            val
          ),
        message:
          "La contraseña debe tener al menos una letra mayúscula, un número, un carácter especial y una longitud mínima de 8 caracteres",
      },
    },
    level: {
      type: String,
      required: true,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true, versionKey: false }
);

UserSchema.plugin(uniqueValidator, {
  message: "Email {VALUE} is already taken",
});
// add this after UserSchema is defined
UserSchema.virtual("confirmPassword")
  .get(() => this._confirmPassword)
  .set((value) => (this._confirmPassword = value));

UserSchema.pre("validate", function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate("confirmPassword", "Password must match confirm password");
  }
  next();
});

// near the top is a good place to group our imports

// this should go after
UserSchema.pre("save", function (next) {
  bcrypt.hash(this.password, 10).then((hash) => {
    this.password = hash;
    next();
  });
});

const User = new mongoose.model("User", UserSchema);
module.exports = User;
