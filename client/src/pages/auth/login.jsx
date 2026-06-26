import Form from "@/components/common/form";
import { loginFormControls } from "@/config";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser } from "@/store/auth-Slice";
import { toast } from "sonner";
const initialState = {
  email: "",
  password: "",
};
function Authlogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast.success(data?.payload?.message, {
          style: {
            background: "green",
            color: "white",
            border: "1px solid darkgreen",
          },
        });
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
          Sign in to your account
        </h1>
        <p className="mt-2">
          Don't have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <Form
        formControls={loginFormControls}
        ButtonText="Sign In"
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
}

export default Authlogin;
