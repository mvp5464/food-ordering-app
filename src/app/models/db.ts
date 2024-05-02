import mongoose, { models } from "mongoose";

mongoose.connect(process.env.MONGO_URL || "");

const ExtraPriceSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

const MenuItemSchema = new mongoose.Schema(
  {
    image: { type: String },
    name: { type: String },
    description: { type: String },
    category: { type: mongoose.Types.ObjectId },
    basePrice: { type: Number },
    sizes: { type: [ExtraPriceSchema] },
    extraIngredientPrices: { type: [ExtraPriceSchema] },
  },
  { timestamps: true }
);

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

const OrderSchema = new mongoose.Schema(
  {
    userEmail: String,
    phone: String,
    streetAddress: String,
    postalCode: String,
    city: String,
    country: String,
    cartProducts: Object,
    paid: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const UserSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const UserInfoSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    streetAddress: { type: String },
    postalCode: { type: String },
    city: { type: String },
    country: { type: String },
    isAdmin: { type: Boolean, default: false },
    phone: { type: String },
  },
  { timestamps: true }
);

export const Category =
  models.Category || mongoose.model("Category", CategorySchema);
export const MenuItem =
  models?.MenuItem || mongoose.model("MenuItem", MenuItemSchema);
export const Order = models?.Order || mongoose.model("Order", OrderSchema);
export const User = models?.User || mongoose.model("User", UserSchema);
export const UserInfo =
  models?.UserInfo || mongoose.model("UserInfo", UserInfoSchema);
