import { Button, Input } from "@base-ui/react";
import axios from "axios";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { Skeleton } from "../ui/skeleton";

function ProductImageUpload({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoadingState,
  imageLoadingState
}) {
  const inputref = useRef(null);
  const handleImageFileChange = (event) => {
    const selectedImage = event.target.files?.[0];
    selectedImage ? setImageFile(selectedImage) : null;
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    droppedFile ? setImageFile(droppedFile) : null;
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    if(inputref.current)
    {
        inputref.current.value =""
    }
  };

  const uploadImageToCloudinary = async() =>{
    setImageLoadingState(true);
    const formData = new FormData();
    formData.append('my_file',imageFile)

    const response = await axios.post('http://localhost:3000/api/admin/products/upload-image',formData);

    if(response?.data?.success)
    {
      setUploadedImageUrl(response.data.result.url)
      setImageLoadingState(false)
    }
  }

  useEffect(()=>{
    if(imageFile != null)
    {
      uploadImageToCloudinary()
    }
  },[imageFile])
  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <label className="text-lg font-semibold mb-2 block">Upload Image</label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed rounded-lg p-4"
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputref}
          onChange={handleImageFileChange}
        />

        {!imageFile ? (
          <label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center h-32 cursor-pointer"
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload image</span>
          </label>
        ) : (
          imageLoadingState ? <Skeleton className='h-10 bg-gray-100'/> :
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 text-primary mr-2 h-8" />
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;
