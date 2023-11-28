import axios from "axios";
import {updateOne } from "../../Database/queries/crud.js";
import { BSON } from "mongodb";
export async function getAccessTokenByRef(event)
{
    try{
        const {refresh_token,id} = JSON.parse(event.body);
        if(!refresh_token || !id)
        {
            return {
                statusCode : 401,
                body : JSON.stringify({
                    error : "Invalid Params"
                })
            }
        }
        const objectId = new BSON.ObjectId(id);
        const url = "https://realm.mongodb.com/api/admin/v3.0/auth/session";
        const header = {
            'Authorization': `Bearer ${refresh_token}`
        }
        const response = await axios.post(url,{},{headers:header});
        if(response && response.data)
        {
            const filter = {
                _id : objectId
            }
            const update = {
                $set : {
                    access_token : response.data.access_token,
                    createdAt : Date.now()
                }
            }
            const result = await updateOne(process.env.tokenStore,filter,update);
            return {
                statusCode : 200,
                body : JSON.stringify({
                    message : "Updated Successfully",
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
            At : "getTokenByRef",
            Error : error
        }
        console.log(Error);
    }
}