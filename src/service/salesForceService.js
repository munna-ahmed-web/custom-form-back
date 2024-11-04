const axios = require("axios");
require("dotenv").config();

const {
  SF_CLIENT_ID,
  SF_CLIENT_SECRET,
  SF_USERNAME,
  SF_PASSWORD,
  SF_SECURITY_TOKEN,
} = process.env;

const createSalesForce = async (payload) => {
  const { accountName, name, email, phone } = payload;
  try {
    // Step 1: Get Salesforce Access Token
    const tokenResponse = await axios.post(
      "https://login.salesforce.com/services/oauth2/token",
      new URLSearchParams({
        grant_type: "password",
        client_id: process.env.SF_CLIENT_ID,
        client_secret: process.env.SF_CLIENT_SECRET,
        username: process.env.SF_USERNAME,
        password: process.env.SF_PASSWORD + process.env.SF_SECURITY_TOKEN,
      }).toString(),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
    const { access_token: accessToken, instance_url: instanceUrl } =
      tokenResponse.data;

    // Step 2: Create Account in Salesforce
    const accountResponse = await axios.post(
      `${instanceUrl}/services/data/v60.0/sobjects/Account/`,
      { Name: accountName },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const accountId = accountResponse.data.id;
    // console.log("accountId", accountId);
    // console.log("accessToken", accessToken);

    // Step 3: Create Contact Linked to Account
    const contactResponse = await axios.post(
      `${instanceUrl}/services/data/v62.0/sobjects/Contact/`,
      {
        LastName: name,
        Email: email,
        Phone: phone,
        AccountId: accountId,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return {
      accountId: accountId,
      contactId: contactResponse.data.id,
    };
  } catch (error) {
    console.error("Salesforce Integration Error:", error.response.data);
    throw error;
  }
};

module.exports = {
  createSalesForce,
};
