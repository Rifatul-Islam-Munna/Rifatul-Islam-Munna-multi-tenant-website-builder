"use server"

import { GetRequestNormal } from "@/api-hook/api-hook"
import { ShopConfigResponse } from "@/types/webisteDetails"
import { cookies } from "next/headers"
import {cache} from 'react'





export const getWebsiteDetails = cache(async () => {
    const localCookie = await cookies()
    

    if(localCookie.get("website-data")?.value){
        console.log("getting data from cookie")
        return JSON.parse(localCookie.get("website-data")?.value as string ) as ShopConfigResponse;
    }
    const res = await GetRequestNormal<ShopConfigResponse>("/global-user/get-website-details?ShopName=www")
   
    

    return res
})

