import axios from "axios";
export async function createTriggers(event) {
  try {
    const access_token = event.queryStringParameters.access_token;
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
    };
    const filter = {
      price: { $gt: 200 },
    };
    const sampleData = {
      _id: "5f33b73c0d6e4770f7d6fa12",
      name: "myrigger",
      type: "DATABASE",
      config: {
        operation_types: ["INSERT"],
        database: "StreamTest",
        collection: "stores",
        service_id: "655d90b3505addd32f54b651",
        match: {
          filter,
        },
        project: {
          _id: 1,
          price:1,
          operationType: 1
        },
        full_document: true,
      },
      event_processors: {
        AWS_EVENTBRIDGE: {
          config: {
            account_id: "012345678901",
            region: "us-east-1",
          },
        },
      },
    };
    const response = await axios
      .post(url, sampleData, { headers: headers })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received:", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Request setup error:", error.message);
        }
        console.error("Error config:", error.config);
      });
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
      At: "createTriggers",
      Error: error,
    };
    console.log(Error);
  }
}
