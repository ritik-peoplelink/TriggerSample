import { create } from "../Database/queries/crud.js";
export async function main(event)
{
    try{
        const {productName,price} = JSON.parse(event.body);
        console.log("Body Data : ",productName,price);
        const data ={
            productName : productName,
            price : price
        }
        const result = await create(process.env.storeTable,data);
        console.log("MyResult",result);
        if(result)
        {
            return {
                statusCode : 200,
                body : JSON.stringify({
                    data : result
                })
            }
        }else{
            return {
                statusCode : 400,
                body :  JSON.stringify({
                    data : {error:"Not Inserted"}
                })
            }
        }
    }catch(e)
    {
        console.log('Error in adding Product: ',e);
    }
}
