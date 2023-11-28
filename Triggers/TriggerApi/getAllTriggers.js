import axios from "axios";
export async function getTriggers(event) {
  try {
    const access_token = event.queryStringParameters.token;
    if (!access_token) {
        return {
          statusCode: 401,
          body: JSON.stringify({
            error: "Invalid Params",
          }),
        };
      }
    const groupId = process.env.groupId;
    const appId = process.env.appId;
    const url = `https://realm.mongodb.com/api/admin/v3.0/groups/${groupId}/apps/${appId}/triggers`;
    const headers = {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    const response = await axios.get(url, { headers: headers });
    if (response) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          data: response.data,
        }),
      };
    }
  } catch (error) {
    const Error = {
      At: "getAllTriggers",
      Error: error,
    };
    console.log(Error);
  }
}
