require("dotenv").config();
const axios = require("axios");

const getUserId = async (userEmail) => {
  try {
    const res = await axios.get(
      `${process.env.JIRA_BASEURL}/rest/api/3/user/search?query=${userEmail}`,
      {
        auth: {
          username: process.env.JIRA_API_EMAIL,
          password: process.env.JIRA_API_TOKEN,
        },
      }
    );
    if (!res.data.length) {
      return false;
    }
    return res?.data[0]?.accountId;
  } catch (error) {
    const errorMessage = error.response
      ? `Error: ${error.response.status} - ${
          error.response.data.message || "Request failed"
        }`
      : `Network Error: ${error.message}`;

    console.error("from getuser", error);
    const err = new Error(errorMessage);
    err.status = error.response.status || 500;
    throw err;
  }
};

const createUser = async (email, name) => {
  try {
    const response = await axios.post(
      `${process.env.JIRA_BASEURL}/rest/api/3/user`,
      {
        emailAddress: email,
        displayName: `${name}`,
        products: [],
        notification: false,
      },
      {
        auth: {
          username: process.env.JIRA_API_EMAIL,
          password: process.env.JIRA_API_TOKEN,
        },
      }
    );
    // console.log("User created with ID:", response.data.accountId);
    return response.data.accountId;
  } catch (error) {
    const errorMessage = error.response
      ? `Error: ${error.response.status} - ${
          error.response.data.message || "Request failed"
        }`
      : `Network Error: ${error.message}`;

    console.error("from create user", error.response);
    const err = new Error(errorMessage);
    err.status = error.response.status || 500;
    throw err;
  }
};

const fetchTickets = async (startAt = 0, maxResults = 5) => {
  try {
    const response = await axios.get(
      `${process.env.JIRA_BASEURL}/rest/api/3/search`,
      {
        auth: {
          username: process.env.JIRA_API_EMAIL,
          password: process.env.JIRA_API_TOKEN,
        },
        params: {
          startAt,
          maxResults,
          jql: "", // Optional JQL filter
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching tickets:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const createTicket = async (data) => {
  const { email, name } = data;

  try {
    let userId = await getUserId(email);
    if (!userId) {
      userId = await createUser(email, name);
      //   `${process.env.JIRA_TICKET_URL}`,
      //   payload,
      //   {
      //     headers: {
      //       Authorization: `Basic ${Buffer.from(
      //         `${process.env.JIRA_API_EMAIL}:${process.env.JIRA_API_TOKEN}`
      //       ).toString("base64")}`,
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );
      // return response.data;
    }
    const payload = {
      fields: {
        project: {
          key: process.env.JIRA_PROJECT_KEY,
        },
        summary: data.title,
        description: data.description,
        issuetype: {
          name: "Task",
        },
        reporter: {
          id: `${userId}`,
        },
        priority: { id: data.priority },
        customfield_10040: data.link,
      },
    };
    const response = await axios.post(
      `${process.env.JIRA_TICKET_URL}`,
      payload,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.JIRA_API_EMAIL}:${process.env.JIRA_API_TOKEN}`
          ).toString("base64")}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error.response);
    throw error;
  }
};
const getTicket = async (startAt, max) => {
  try {
    const tickets = await fetchTickets(startAt, max);
    return tickets;
  } catch (error) {
    console.log(error.response);
    throw error;
  }
};

const getPriorityList = async () => {
  try {
    const response = await axios.get(
      `${process.env.JIRA_BASEURL}/rest/api/3/priority`,
      {
        auth: {
          username: process.env.JIRA_API_EMAIL,
          password: process.env.JIRA_API_TOKEN,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("from service", error);
    throw error;
  }
};
const getStatusList = async () => {
  try {
    const response = await axios.get(
      `${process.env.JIRA_BASEURL}/rest/api/3/status`,
      {
        auth: {
          username: process.env.JIRA_API_EMAIL,
          password: process.env.JIRA_API_TOKEN,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("from service", error);
    throw error;
  }
};

module.exports = {
  createTicket,
  getTicket,
  getPriorityList,
  getStatusList,
};
