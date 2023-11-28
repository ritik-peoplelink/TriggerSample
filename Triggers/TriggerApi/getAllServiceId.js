import axios from "axios";
export async function getServiceId(event) {
  try {
    const access_token = event.queryStringParameters.access_token;
    const groupId = process.env.groupId;
    const appId = process.env.appId;
    if (!access_token) {
      return {
        statusCode: 401,
        body: JSON.stringify({
          error: "Invalid Params",
        }),
      };
    }
    const url = `https://realm.mongodb.com/api/admin/v3.0/groups/${groupId}/apps/${appId}/services`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    };
    const response = await axios.get(url, { headers });
    if (response && response.data) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Inserted Successfully",
          data: response.data,
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
