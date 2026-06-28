import ProductImageUpload from "@/components/admin-view/ProductImageUpload";
import AdminProductTile from "@/components/admin-view/ProductTile";
import Form from "@/components/common/form";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import {
  addProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/product-Slice";
import { Button } from "@base-ui/react";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};
function AdminProducts() {
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
  const [formData, setformData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.adminProduct);

  const handleSubmit = (event) => {
    event.preventDefault();
    currentEditId !== null
      ? dispatch(editProduct({ id: currentEditId, formData })).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setOpenCreateProductDialog(false);
            setformData(initialFormData);
            setCurrentEditId(null);
            toast.success("Product updated successfully", {
              style: {
                background: "green",
                color: "white",
                border: "1px solid darkgreen",
              },
            });
          }
        })
      : dispatch(addProduct({ ...formData, image: uploadedImageUrl })).then(
          (data) => {
            if (data?.payload?.success) {
              dispatch(fetchAllProducts());
              setOpenCreateProductDialog(false);
              setImageFile(null);
              setformData(initialFormData);
              toast.success("Product added successfully", {
                style: {
                  background: "green",
                  color: "white",
                  border: "1px solid darkgreen",
                },
              });
            }
          },
        );
  };

  const handleDelete = (getCurrentProductId) => {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if(data?.payload?.success)
      {
        dispatch(fetchAllProducts());
         toast.success("Product deleted successfully", {
              style: {
                background: "green",
                color: "white",
                border: "1px solid darkgreen",
              },
            });
      }
    });
  };

  const isFormValid = () => {
    Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  };

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);
  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductDialog(true)}>
          Add New Product
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                product={productItem}
                setOpenCreateProductDialog={setOpenCreateProductDialog}
                setCurrentEditId={setCurrentEditId}
                setformData={setformData}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>

      <Sheet
        open={openCreateProductDialog}
        onOpenChange={() => {
          setOpenCreateProductDialog(false);
          setCurrentEditId(null);
          setformData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <div className="flex flex-col h-full">
            <SheetHeader>
              <SheetTitle>
                {currentEditId !== null ? "Edit Product" : "Add New Product"}
              </SheetTitle>
            </SheetHeader>

            <ProductImageUpload
              imageFile={imageFile}
              setImageFile={setImageFile}
              uploadedImageUrl={uploadedImageUrl}
              setUploadedImageUrl={setUploadedImageUrl}
              setImageLoadingState={setImageLoadingState}
              imageLoadingState={imageLoadingState}
              isEditMode={currentEditId !== null}
            />

            <div className="py-6">
              <Form
                formControls={addProductFormElements}
                ButtonText={currentEditId !== null ? "Update" : "Add"}
                onSubmit={handleSubmit}
                formData={formData}
                setFormData={setformData}
                isBtnDisabled={!isFormValid()}
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
