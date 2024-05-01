const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");

const sequelize = require("./util/database");

const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// Associating a product to a user
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });

// Associating a user to a cart
User.hasMany(Product);

// Associating a user to a cart
User.hasOne(Cart);

// Associating a cart to a user
Cart.belongsTo(User);

// Associating a cart to a product
Cart.belongsToMany(Product, { through: CartItem });

// Associating a product to a cart
Product.belongsToMany(Cart, { through: CartItem });

// Associating an order to a user
Order.belongsTo(User);

// Associating an order to a product
Order.belongsToMany(Product, { through: OrderItem });

sequelize
  .sync()
  // .sync({ force: true })
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Max", email: "test@test.com" });
    }
    return user;
  })
  .then((user) => {
    // console.log(user);
    return user.createCart();
  })
  .then((cart) => {
    // console.log(cart);
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
