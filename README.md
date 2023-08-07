# spotDraftAssesment
# Asana to Airtable Webhook Integration

## Project Overview

This project sets up a Node.js server to handle incoming webhooks from Asana and integrates with Airtable to store task data automatically. It allows you to seamlessly transfer task information from Asana to an Airtable database, reducing manual data entry and streamlining your workflow.

## Prerequisites

Before running the server, make sure you have the following installed:
Node.js (https://nodejs.org/)
Nodemon (optional but recommended for development) (https://www.npmjs.com/package/nodemon)

## Prerequisites

1.Clone the repository:
    git clone https://github.com/karthikreddy552/spotDraftAssesment
    
    cd your-rep0
    
2.Install dependencies:

     npm install

## Important Routes

"/": Home route that sends a welcome message.

"/Webhook": Webhook endpoint that receives data from Asana and stores it in Airtable. It performs verification of the webhook secret and signature to ensure data integrity.

### Webhook Setup

To set up the webhook in Asana, follow these steps:

1.Go to your Asana workspace.

2.Click on the "Settings" gear icon in the top right corner.

3.Select "Apps" from the dropdown menu.

4.Click on "Manage Developer Apps" at the bottom of the page.

5.Click on "Create New App" and fill in the required information.

6.Once the app is created, go to the "Webhooks" tab.

t.Click on "Create Webhook" and provide the URL of your server (e.g., http://your-server-ip:8000/Webhook).

8.Make sure to include the X-Hook-Secret header in the response from your server to verify the webhook.

## Webhook Events

The integration follows a series of steps when handling webhook events:

1. Webhook secret and signature verification are performed if provided.
2. Successful verification triggers the processing of Asana events.
3. For each event, the associated task data is fetched from the Asana API.
4. If the required data (name, assignee, due date) is available, it is added to the specified Airtable database.


## Demo
Check out the live demo of the project: https://spotdraft-2ex8.onrender.com/

