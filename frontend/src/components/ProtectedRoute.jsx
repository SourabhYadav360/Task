import { Navigate } from "react-router-dom"

function ProtectedRoute({children}){

 const token = document.cookie

 if(!token){
  return <Navigate to="/" />
 }

 return children

}

export default ProtectedRoute