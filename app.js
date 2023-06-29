const mailchimp = require("@mailchimp/mailchimp_marketing");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.listen(process.env.PORT||3000,function () {
 console.log("Server is running at port 3000");
});

app.get("/", function (req, res) {
 res.sendFile(__dirname + "/signup.html");
});

//Setting up MailChimp
mailchimp.setConfig({

 apiKey: "9ef4376ab8e09240ddc09206c211e5a2-us21",
 server: "us21"
});

//As soon as the sign in button is pressed execute this
app.post("/", function (req,res) {

const firstName = req.body.fname;
const secondName = req.body.lname;
const email = req.body.email;

const listId = "43bb962213";

const subscribingUser = {
 firstName: firstName,
 lastName: secondName,
 email: email
};

//Uploading the data to the server
 async function run() {
const response = await mailchimp.lists.addListMember(listId, {
 email_address: subscribingUser.email,
 status: "subscribed",
 merge_fields: {
 FNAME: subscribingUser.firstName,
 LNAME: subscribingUser.lastName
}
});

 res.sendFile(__dirname + "/success.html")
 console.log(
`Successfully added contact as an audience member. The contact's id is ${
 response.id
 }.`
);
}
// the catch statement is executed when there is an error so if anything goes wrong the code in the catch code is executed. In the catch block we're sending back the failure page. This means if anything goes wrong send the faliure page
 run().catch(e => res.sendFile(__dirname + "/failure.html"));
});