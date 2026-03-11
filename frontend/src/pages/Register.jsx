import { useState } from "react"
import api from "../api/axios"
import { useNavigate } from "react-router-dom"

function Register(){

const navigate = useNavigate()

const [form,setForm] = useState({
 name:"",
 email:"",
 password:""
})

const handleChange = (e)=>{
 setForm({...form,[e.target.name]:e.target.value})
}

const handleSubmit = async(e)=>{
 e.preventDefault()

 try{

  const res = await api.post("/auth/register",form)

  alert(res.data.message)

  navigate("/login")

 }catch(err){
  alert(err.response?.data?.message || "Register failed")
 }

}

return(

<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black">

<div className="backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-10 w-96 text-white">

<h2 className="text-3xl font-semibold text-center mb-6 tracking-wide">
Create Account
</h2>

<form onSubmit={handleSubmit} className="space-y-5">

<input
name="name"
placeholder="Your Name"
onChange={handleChange}
className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-300"
/>

<input
name="email"
placeholder="Email Address"
onChange={handleChange}
className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-300"
/>

<input
name="password"
type="password"
placeholder="Password"
onChange={handleChange}
className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-300"
/>

<button
type="submit"
className="w-full p-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 transition font-semibold text-black"
>
Register
</button>

</form>

<p className="text-center text-sm mt-6 text-gray-300">
Already have an account?
<a href="/login" className="text-cyan-400 ml-1 hover:underline">
Login
</a>
</p>

</div>

</div>

)

}

export default Register