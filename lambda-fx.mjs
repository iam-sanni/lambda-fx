// Lambda function to handle HTTP requests via API Gateway
exports.handler = async (event) => {
    // Log incoming request for debugging
    console.log("Event received:", JSON.stringify(event));

    // Extracting information from the event (e.g., HTTP method, query params, body)
    const httpMethod = event.httpMethod;
    const queryParams = event.queryStringParameters || {};
    const body = event.body ? JSON.parse(event.body) : {};

    // Example response object
    let response = {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*" // Required for CORS support
        },
        body: JSON.stringify({
            message: `Hello, World! You sent a ${httpMethod} request.`,
            queryParams: queryParams,
            requestBody: body
        })
    };

    // Handle different HTTP methods
    switch (httpMethod) {
        case "GET":
            // Respond to GET request
            response.body = JSON.stringify({
                message: "GET request received!",
                queryParams: queryParams
            });
            break;

        case "POST":
            // Respond to POST request
            response.body = JSON.stringify({
                message: "POST request received!",
                requestBody: body
            });
            break;

        case "PUT":
            response.body = JSON.stringify({
                message: "PUT request received!",
                requestBody: body
            });
            break;

        case "DELETE":
            response.body = JSON.stringify({
                message: "DELETE request received!"
            });
            break;

        default:
            response.statusCode = 405; // Method Not Allowed
            response.body = JSON.stringify({
                message: `Unsupported method: ${httpMethod}`
            });
            break;
    }

    // Return the response to API Gateway
    return response;
};
