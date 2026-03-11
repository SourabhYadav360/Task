import { UserModel } from "../model/user.model.js";

export const profileController = async (req,res)=>{

 try{

  const user = await UserModel.findById(req.user.id).select("-password");

  res.json(user);

 }catch(error){

  res.status(500).json({
   message:error.message
  })

 }

}