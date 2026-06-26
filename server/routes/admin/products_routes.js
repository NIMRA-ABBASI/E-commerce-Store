import express from "express";
import {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
} from "../../controller/admin/products_controller.js";
import { upload } from "../../helpers/cloudinary.js";

const productrouter = express.Router();

productrouter.post(
  "/upload-image",
  upload.single("my_file"),
  handleImageUpload,
);
productrouter.post('/add',addProduct);
productrouter.get('/get',fetchAllProducts);
productrouter.put('/edit/:id',editProduct);
productrouter.delete('/delete/:id',deleteProduct);
export default productrouter;
