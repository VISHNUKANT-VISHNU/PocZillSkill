const Cloud = require("@google-cloud/storage");
const path = require("path");
const serviceKey = path.join(__dirname, "./secretKey.json");

const { Storage } = Cloud;
const storage = new Storage({
    keyFilename: serviceKey,
    projectId: "feisty-audio-278013",
});

module.exports = storage;
