# Instructions
## STEP 1
- cd GptBackEnd 
- npm run install(when you deploy it at first time)
- rename the .env.example to .env and fill the fields
- node server.js


## STEP 2
- all APIs are in routes folder 

## a simple test Code snippet
# Usage of `sendMessage` Function

This sample demonstrates how to use the `sendMessage` function in JavaScript, which sends a message to a specified API endpoint using `axios`. The function includes four parameters: `userID`, `sessionID`, `message`, and `selectedModel`.

## 1. Defining the `sendMessage` Function

```javascript
// Define sendMessage function to send a message to the API endpoint
export const sendMessage = async (userID, sessionID, message, selectedModel) => {
    return axios.post(`${API_URL}/messages/sendMessage`, { userID, sessionID, message, selectedModel });
};