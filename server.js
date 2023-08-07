const express = require("express");
const crypto = require("crypto");
// const { default: fetch } = require("node-fetch");
let fetch;
(async () => {
  const fetchModule = await import("node-fetch");
  fetch = fetchModule.default;
})();

const app = express();
//Parsing the json data
app.use(express.json());
let secret = "";
app.get("/",(req,res)=>{
  res.send("welcomSpotDraft...")
})
app.post("/Webhook", (req, res) => {
  if (req.headers["x-hook-secret"]) {
    console.log("Created webhook...");
    secret = req.headers["x-hook-secret"];
    res.setHeader("X-Hook-Secret", secret);
    res.sendStatus(200);
  } else if (req.headers["x-hook-signature"]) {
    const computedSignature = crypto
      .createHmac("SHA256", secret)
      .update(JSON.stringify(req.body))
      .digest("hex");

    if (
      !crypto.timingSafeEqual(
        Buffer.from(req.headers["x-hook-signature"]),
        Buffer.from(computedSignature)
      )
    ) {
        res.sendStatus(401);
    } else {
      res.sendStatus(200);
      console.log(req.body.events);
         req.body.events.forEach(async (event) => {
        let kar_id = event.resource.gid;
        await fetch(`https://app.asana.com/api/1.0/tasks/${kar_id}`, {
          headers: {
            Authorization:
              "Bearer 1/1205221438367357:834e3e4d615bfc8110bbc877139e6c1e",
            },
        })
          .then((res) => res.json())
          .then((dataGet) => {
            let data = dataGet.data;
            const baseId = "appyJdqtqPtMXJhTk";  //From the AIRTABLE
            const tableIdOrName = "tbldCtJENGXPEgVLR"; //From the AIRTABLE
            const apiKey =
              "pat7GtRy8QXDTF6fU.43b2fb935c9249403959c9178f58757e17a5a94447af5671dac93c61cfcd9e8a"; //From the AIRTABLE
                 const url = `https://api.airtable.com/v0/${baseId}/${tableIdOrName}`;

            const headers = {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            };
            if (
              data &&
              data.gid &&
              data.assignee.name &&
              data.assignee &&
              data.name &&
              data.due_on
            ) {
              const gettingData = {
                records: [
                  {
                    fields: {
                      Name: data.name,
                      Assignee: data.assignee.name,
                      Task_Id: parseInt(data.gid),
                      Due_Date: data.due_on,
                    },
                  },
                ],
              };
              async function fetchData(gettingData, url, headers) {
                await fetch(url, {
                  method: "POST",
                  headers: headers,
                  body: JSON.stringify(gettingData),
                })
                  .then((response) => response.json())
                  .then((data) => {
                    console.log("Records added", data);
                  })
                  .catch((error) => {
                    console.error("Error adding records:", error);
                  });
              }
              fetchData(gettingData, url, headers);
            } else {
              console.log("error notified");
            }
          })
          .catch((err) => {

            console.log(err);
          });
      });
    }
  } else {
    console.error("Something gone in to wrong check it!");
  }
});
app.listen(8000, () => {
  console.log(`Server started........................`);
});
