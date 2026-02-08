import express from "express";
import bodyParser from "body-parser";
import twilio from "twilio";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/whatsapp/webhook", (req, res) => {
  const incoming = (req.body.Body || "").trim().toLowerCase();

  const twiml = new twilio.twiml.MessagingResponse();

  if (["hi", "hello", "hey"].includes(incoming)) {
    twiml.message(`Hello ${req.body.ProfileName}, How can I help?`);
  } else if (["help", "support", "contact"].includes(incoming)) {
    twiml.message(
      "You can reach out to us at henilcode@gmail.com or call us at 9081807209.",
    );
  } else {
    twiml.message("I got your message ✅");
  }

  res.type("text/xml").send(twiml.toString());
});

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.listen(3000, () => console.log("Server running on 3000"));
