import { sendMail } from "../emailVerify/sendOTPMail.js"
import { UserModel } from "../model/user.model.js"
import jwt  from "jsonwebtoken"

export const registerController = async (req, res) => {
    try {
        let { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(404).json({
                message: "All field required",
                success: false
            })
        }

        let existUser = await UserModel.findOne({email});
        if (existUser) {
            return res.status(404).json({
                message: "User allready exist",
                success: false
            })
        }

        let user = await UserModel.create({
            name,
            email,
            password
        })

        let token = await user.genrateJWT()
        res.cookie("token", token);
        user.token = token;

        const Url = `http://localhost:4000/api/auth/verify-email/${token}`
        await sendMail(email, 
            "Verification Email ",
            `<h1>click on the below link to login to your account</h1>
             ${Url}
            `
        )

        return res.status(201).json({
            message: "User registered",
            success: true,
            user
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
            sucses: false
        })
    }
}

 export const verifiedController = async (req, res) => {
  try {

    const { token } = req.params;

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findById(decode.id);

    user.isVerified = true;

    await user.save();

    return res.render("index");

  } catch (error) {

    return res.status(500).json({
      message: error.message,
      success: false
    });

  }
};

export const loginController = async (req, res) => {
    try {
        let { email, password } = req.body

        if (!email || !password) {
            return res.status(404).json({
                message: "All field required",
                success: false
            })
        }

        let existedUser = await UserModel.findOne({email});
        if (!existedUser) {
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }

                if (!existedUser.isVerified) {
            return res.status(401).json({
                message: "Please verify your email first , ",
                success: false
            })
        }


        let checkPass = await existedUser.comparePass(password)
        if (!checkPass) {
            return res.status(401).json({
                message: "Invalid credentials",
                success: false
            })
        }

        let token = await existedUser.genrateJWT()
        res.cookie("token", token);

        return res.status(200).json({
            message: "User Logged in",
            success: true,
            user: existedUser,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
            sucses: false
        })
    }
}

