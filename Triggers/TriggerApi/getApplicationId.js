import axios from "axios";
import { create } from "../../Database/queries/crud.js";
export async function getAppId(event) {
  try {
    const access_token = event.queryStringParameters.access_token;
    const groupId = process.env.groupId;

    if (!access_token) {
      return {
        statusCode: 401,
        body: JSON.stringify({
          error: "Invalid Params",
        }),
      };
    }
    const url = `https://realm.mongodb.com/api/admin/v3.0/groups/${groupId}/apps?product=atlas`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    };
    const response = await axios.get(url, { headers });
    if (response && response.data) {
      const store = {
        _id: response.data[0]._id,
        group_id: response.data[0].group_id,
        domain_id: response.data[0].domain_id,
        client_app_id: response.data[0].client_app_id,
        name: response.data[0].name,
        location: response.data[0].location,
        deployment_model: response.data[0].deployment_model,
        last_used: response.data[0].last_used,
        last_modified: response.data[0].last_modified,
        product: response.data[0].product,
        environment: response.data[0].environment,
      };
      const result = await create(process.env.dataTable, store);
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Inserted Successfully",
          data: result,
        }),
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Error to get Application Id" }),
      };
    }
  } catch (error) {
    const Error = {
      At: "getApplicationId",
      Error: error,
    };
    console.log(Error);
  }
}
