import Form from "@/components/common/form";
import { registerFormControls } from "@/config";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "@/store/auth-Slice";
import { toast } from "sonner";

const initialState = {
  username: "",
  email: "",
  password: "",
};

function Authregister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast.success(data?.payload?.message, {
          style: {
            background: "green",
            color: "white",
            border: "1px solid darkgreen",
          },
        });
        navigate("/auth/login");
      } else {
        toast.error(data?.payload?.message, {
          style: {
            background: "#ef4444", // red-500
            color: "white",
            border: "1px solid #b91c1c",
          },
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2">
          Already have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <Form
        formControls={registerFormControls}
        ButtonText="Sign Up"
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
}

export default Authregister;
