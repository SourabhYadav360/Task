import { useQuery } from "@tanstack/react-query"
import api from "../api/axios"

function Profile(){

const {data,isLoading,error} = useQuery({

 queryKey:["profile"],

 queryFn: async()=>{
  const res = await api.get("/auth/profile")
  return res.data
 }

})

if(isLoading) return <h3>Loading...</h3>

if(error) return <h3>Error loading profile</h3>

return(

<div>

<h2>Profile</h2>

<p>Name: {data.name}</p>
<p>Email: {data.email}</p>

</div>

)

}

export default Profile