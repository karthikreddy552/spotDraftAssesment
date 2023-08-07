# spotDraftAssesment
Webhook Integration with Asana and Airtable
This repository contains code to set up a webhook that receives events from Asana and processes them to add records to an Airtable database. The webhook is implemented using Node.js and Express, and it uses the crypto module for security purposes. Here's a step-by-step guide on how to set up and use this webhook.

Prerequisites
Before you proceed, make sure you have the following prerequisites installed:

Node.js and npm (Node Package Manager)
Asana API Key
Airtable API Key
Airtable Base ID and Table ID/Name
Getting Started
Clone this repository to your local machine.
Install the required dependencies by running npm install in the project root directory.
Configuration
Open the index.js file in the root directory.

Update the following variables with your specific values:

baseId: Your Airtable base ID.
tableIdOrName: The ID or name of the table in Airtable where you want to add records.
apiKey: Your Airtable API key.
asanaApiKey: Your Asana API key.
port: The port on which the server will listen for incoming webhook events (default is 8000).
Starting the Server
Run the following command in the project root directory to start the server:

Copy code
node index.js
The server should now be running and listening for incoming webhook events on the specified port.

Setting up the Webhook in Asana
To set up the webhook in Asana and start receiving events, follow these steps:

Open your Asana dashboard.

Go to the project or task where you want to set up the webhook.

Click on the project's settings and select "Webhooks" from the menu.

Click on the "Create New Webhook" button.

Enter the following information:

Webhook URL: The URL of your server where the webhook is running (e.g., http://your_server_ip:8000/Webhook).
Events: Choose the events you want to receive notifications for (e.g., task created, task updated, etc.).
Click on "Create Webhook" to save the webhook configuration.

Receiving and Processing Webhook Events
When a relevant event occurs in Asana (e.g., a task is created or updated), Asana will send a webhook event to your server at the specified URL. The server will receive the event and verify its authenticity using the provided x-hook-signature.

If the event is valid, the server will then fetch additional data about the task from Asana using the provided task ID. It will then create a new record in the specified Airtable table with relevant task information.

Please note that this webhook implementation supports one Asana event at a time. If multiple events are received simultaneously, they will be processed sequentially.

Handling Security
To ensure the security of the webhook, the server uses a secret key provided by Asana (x-hook-secret) to create a hash of the received event data. It then compares this hash with the one provided in the x-hook-signature header to validate the authenticity of the event. If the signatures match, the event is considered valid and is processed further.

Conclusion
Congratulations! You have successfully set up a webhook integration between Asana and Airtable. Now, whenever a relevant event occurs in your Asana project or task, the server will add a new record to your specified Airtable table with the relevant information. Feel free to customize the code to fit your specific needs or integrate it with other services as required.

For more information and detailed documentation on Asana's and Airtable's APIs, please refer to their official documentation:

Asana API Documentation: https://developers.asana.com/docs
Airtable API Documentation: https://airtable.com/api
If you encounter any issues or have suggestions for improvement, please feel free to open an issue or submit a pull request on this repository. Happy coding!
