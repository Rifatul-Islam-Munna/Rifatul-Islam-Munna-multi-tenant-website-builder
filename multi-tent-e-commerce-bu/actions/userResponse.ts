"use server"
import { PostRequestAxios } from "@/api-hook/api-hook";
import { LoginResponse } from "@/types/user";
import { cookies } from "next/headers";

export const loginUser = async (email:string,password:string)=>{


    const payload ={email,password}
    const [data,error] = await PostRequestAxios<LoginResponse>(`/user/signin-user`,payload);
    console.log("data-user-login->",data,"error-user-login->",error);
    
    console.log("data-user-login->",data,"error-user-login->",error);
    if(data?.token){
        const userInfo ={
          
            id:data?.user.id,
            email:data?.user.email,
            role:data?.user.role,
            name:data?.user.name,
           
            shopName:data?.user.shopName,
        
            shopSlug:data?.user.shopSlug,
            userSlug:data?.user.userSlug,
            isVerified:data?.user.isVerified,
            isDeactivated:data?.user.isDeactivated

        }
     const coookies = await cookies()
      coookies.set("access_token",data?.token,{maxAge:60*60*24*10,path:'/'});
      coookies.set("user_info",JSON.stringify(userInfo),{maxAge:60*60*24*60,path:'/'})
    
    }
 
    return {data,error}
}