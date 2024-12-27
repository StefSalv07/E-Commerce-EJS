const cartSchema = require("../../model/shared/cartModel");

exports.addCart = (req, res) => {
  // First check if product already exists in user's cart
  cartSchema
    .findOne({
      userId: req.body.userId,
      productId: req.body.productId,
    })
    .then((existingCart) => {
      if (existingCart) {
        res.status(400).json({
          message: "This product is already in your cart",
          existingItem: existingCart,
        });
        throw new Error("CART_EXISTS");
      }

      const carts = new cartSchema(req.body);
      return carts.save();
    })
    .then((data) => {
      if (data && !res.headersSent) {
        res.status(201).json({
          message: "Cart Added Successfully",
          data: JSON.parse(JSON.stringify(data)),
        });
      }
    })
    .catch((err) => {
      if (!res.headersSent) {
        if (err.message === "CART_EXISTS") {
          return;
        }
        res.status(500).json({
          message: "Something went wrong",
          error: err.message,
        });
      }
    });
};

exports.getAllCarts = (req, res) => {
  cartSchema
    .find()
    .then((data) => {
      console.log(data);
      res.status(200).json({
        message: "Carts Retrieved",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
        error: err.message,
      });
    });
};

exports.deleteCartById = (req, res) => {
  console.log("in delete by id");
  console.log(req.params.id);

  cartSchema
    .findByIdAndDelete(req.params.id)
    .then((data) => {
      if (data) {
        res.status(200).json({
          data: data,
          message: "Cart Deleted Successfully",
        });
      } else {
        res.status(404).json({
          message: "Cart not Found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error Deleting Data",
        error: err.message,
      });
    });
};

exports.getCartById = (req, res) => {
  console.log(req.params.id);
  cartSchema
    .findById(req.params.id)
    .then((data) => {
      if (data) {
        res.status(200).json({
          message: "Cart retrieved successfully",
          data: data,
        });
      } else {
        res.status(404).json({
          message: "Cart not found",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Error retrieving cart",
        error: err.message,
      });
    });
};

exports.updateCartbyId = (req, res) => {
  cartSchema
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((data) => {
      if (data) {
        res.status(200).json({
          message: "Cart Updated",
          data: data,
        });
      } else {
        res.status(404).json({
          message: "Cart not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
        error: err.message,
      });
    });
};

exports.deleteAllCarts = (req, res) => {
  cartSchema
    .deleteMany({})
    .then((result) => {
      res.status(200).json({
        message: "All carts deleted",
        deletedCount: result.deletedCount,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error deleting all carts",
        error: err.message,
      });
    });
};
