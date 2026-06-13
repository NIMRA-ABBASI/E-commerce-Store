import userModel from "../../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  // Check is user already exist if no create one
  try {
    const { username, email, password, role } = req.body;
    const userExist = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (userExist) {
      res.json({
        success: false,
        message: "User already exists with this email.Please try again",
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const createUser = await userModel.create({
        username,
        email,
        password: hashedPassword,
        role: role || "user",
      });
      if (createUser) {
        res.status(200).json({
          success: true,
          message: "User created succesfully",
        });
      }
    }
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      const cmpPassword = await bcrypt.compare(password, user.password);
      if (cmpPassword) {
        const token = jwt.sign(
          { id: user._id, role: user.role, email: user.email },
          process.env.SECRET_KEY,
          { expiresIn: "60mins" },
        );
        res.cookie("token", token, { httpOnly: true, secure: false }).json({
          success: true,
          message: "Logged in successfully",
          user: {
            email: user.email,
            role: user.role,
            id: user._id,
          },
        });
      } else {
        return res.json({
          success: false,
          message: "Incorrect password! Please try again.",
        });
      }
    } else {
      return res.json({
        success: false,
        message: "User doesn't exist.Please register first",
      });
    }
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token").json({
      success: true,
      message: "Logout successfully",
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

//middleware
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized user",
    });
  }

  try {
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decode;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized user",
    });
  }
};
export { register, login, logout, authMiddleware };
