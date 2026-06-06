import axios from "axios"
// import { json } from "express"
const API_URL='/api/auth/'
const register=async (formData)=>{
    const response=await axios.post(API_URL+"register",formData)
    
    return response.data
}
const login = async (formData) => {
    const response = await axios.post(API_URL + "login", formData);
  
    const data = response.data;
  
    // ✅ SAVE ONLY USER + TOKEN
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...data.user,
        token: data.token,
      })
    );
  
    return {
      ...data.user,
      token: data.token,
    };
  };
const authService={
    register,login
}
export default authService
