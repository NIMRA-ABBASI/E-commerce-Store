import {handleImageUploadUtils} from '../../helpers/cloudinary.js'
import productModel from '../../models/Products.js'


const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = 'data:'+ req.file.mimetype +';base64,' + b64
    const result = await handleImageUploadUtils(url);

    res.status(200).json({
        success:"true",
        result
    })

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured",
    });
  }
};

const addProduct = async(req,res)=>
{
  try{
    const {image,
    title,
    description,
    category,
    brand,
    price,
    salePrice,
    totalStock,
    } = req.body;

    const newProductCreated = await productModel.create(body);
    if(newProductCreated)
    {
      res.status(201).json({
      success: true,
      message: "Product Created Successfully",
      data:newProductCreated
    });
    } 


  }catch(error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured",
    });
  }
}

const fetchAllProducts = async(req,res)=>
{
  try{
   const listOfProducts = await productModel.find({});
   if(listOfProducts)
   {
    res.status(200).json({
      success: true,
      data:listOfProducts
   })
  }

  }catch(error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured",
    });
  }
}

const editProduct = async(req,res)=>
{
  try{
    const productID = req.params.id;
    const {image,
    title,
    description,
    category,
    brand,
    price,
    salePrice,
    totalStock,
    } = req.body;

   const productExist = await productModel.findById(productID);

   if(!productExist)
   {
    res.status(404).json({
      success: false,
      message: "Product does not exist",
    });
   }
   productExist.title = title || productExist.title;
   productExist.description = description || productExist.description;
   productExist.category = category || productExist.category;
   productExist.brand = brand || productExist.brand;
   productExist.price = price || productExist.price;
   productExist.salePrice = brand || productExist.salePrice;
   productExist.totalStock = price || productExist.totalStock;
   productExist.image = image || productExist.image;

   const result = productModel.findByIdAndUpdate(productID,productExist,{new:true});

  }catch(error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured",
    });
  }
}

const deleteProduct = async(req,res)=>
{
  try{
    const id  = req.params.id;
    const product = await Product.findByIdAndDelete(id);

    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    res.status(200).json({
      success: true,
      message: "Product delete successfully",
    });

  }catch(error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured",
    });
  }
}

export { handleImageUpload,addProduct,fetchAllProducts ,editProduct,deleteProduct};
