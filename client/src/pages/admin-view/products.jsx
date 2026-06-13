import Form from "@/components/common/form";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { Button } from "@base-ui/react";
import { Fragment, useState } from "react";
const initialFormData ={
  title:"",
  description:"",
  category:"",
  brand:"",
  price:"",
  salePrice:"",
  totalStock:""
}
function AdminProducts() {
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
  const [formData,setformData]= useState(initialFormData)
  const handleSubmit =()=>
  {

  }
  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductDialog(true)}>
          Add New Product
        </Button>
      </div>
      <Sheet
        open={openCreateProductDialog}
        onOpenChange={setOpenCreateProductDialog}
      >
        <SheetContent side="right" className="overflow-auto">
          <div className="flex flex-col h-full">
            <SheetHeader>
              <SheetTitle>Add New Product</SheetTitle>
            </SheetHeader>
            <div className="py-6">
              <Form 
              formControls={addProductFormElements}
              ButtonText="Add"
              onSubmit={handleSubmit}
              formData={formData}
              setFormData={setformData}/>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
