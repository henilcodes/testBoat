import express from "express";
import bodyParser from "body-parser";
import twilio from "twilio";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/whatsapp/webhook", (req, res) => {
  const incoming = (req.body.Body || "").trim().toLowerCase();

  const twiml = new twilio.twiml.MessagingResponse();
  console.log(incoming, req.body);

  if (["hi", "hello", "hey"].includes(incoming)) {
    twiml.message(`Hello ${req.body.ProfileName}, How can I help?`);
  } else {
    twiml.message("I got your message ✅");
  }

  res.type("text/xml").send(twiml.toString());
});

app.listen(3000, () => console.log("Server running on 3000"));
