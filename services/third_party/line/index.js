const { Client } = require("@line/bot-sdk");
const dotenv = require("dotenv");
dotenv.config();

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};

exports.LineClient = new Client(config);
