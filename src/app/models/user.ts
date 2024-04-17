import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      //   This validation is not working
      validate: (pass: any) => {
        console.log("dddd");
        if (!pass?.length || pass.length < 5) {
          console.log("jjjjj");
          new Error("Password must be atleast 5 characters");
        }
      },
    },
  },
  { timestamps: true }
);
// // --------NOT WORKING (SO ADD BYCRYP IN BACKEND AND VALIDATE THROUGH ZOD)
// // Do this after validation
// UserSchema.post("validate", function (s) {
//   console.log(this.password);
//   console.log(s.password);
//   s.password = "OKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK";
//   console.log("OKKKKKKKKKKKKK");
//   console.log({ arguments });
//   console.log("sjdfn");
//   // The 'arguments' object cannot be referenced in an arrow function in ES3 and ES5. Consider using a standard function expression.
// });
console.log("OKKKKKKKKKKKKK");

export const User = models?.User || model("User", UserSchema);
