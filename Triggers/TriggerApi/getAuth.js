import axios from "axios";
import { create } from "../../Database/queries/crud.js";
export async function getAuthenticationToken()
{
    try{
        const data = {
            "username" : process.env.publicApiKey,
            "apiKey": process.env.privateApiKey
        }
        const url = "https://realm.mongodb.com/api/admin/v3.0/auth/providers/mongodb-cloud/login";
        const header = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
        const response = await axios.post(url,data,{headers:header});
        if(response && response.data)
        {
            const result = await create(process.env.tokenStore,response.data);
            return {
                statusCode : 200,
                body : JSON.stringify({
                    data : result
                })
            }
        }else{
            return {
                statusCode : 400,
                body : JSON.stringify({error : "Error to get Access token"})
            }
        }
    }catch(error)
    {
        const Error = {
            At : "getAuthenticationToken",
            Error : error
        }
        console.log(Error);
    }
}