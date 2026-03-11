import { useState } from "react"
import api from "../api/axios"
import { useNavigate } from "react-router-dom"

function Login(){

const navigate = useNavigate()

const [form,setForm] = useState({
 email:"",
 password:""
})

const handleChange = (e)=>{
 setForm({...form,[e.target.name]:e.target.value})
}

const handleSubmit = async(e)=>{
 e.preventDefault()

 try{

  const res = await api.post("/auth/login",form)

  alert(res.data.message)

  navigate("/profile")

 }catch(err){
  alert(err.response?.data?.message || "Login failed")
 }

}

return(

<div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-cyan-400">

<div className="bg-white p-8 rounded-lg shadow-lg w-80">

<h2 className="text-2xl font-bold text-center mb-6">
Login
</h2>

<form onSubmit={handleSubmit} className="space-y-4">

<input
name="email"
placeholder="Email"
onChange={handleChange}
className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
/>

<input
name="password"
type="password"
placeholder="Password"
onChange={handleChange}
className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
/>

<button
type="submit"
className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
>
Login
</button>

</form>

<p className="text-sm text-center mt-4">
Don't have account?
<a href="/register" className="text-blue-500 ml-1">
Register
</a>
</p>

</div>

</div>

)

}

export default Login