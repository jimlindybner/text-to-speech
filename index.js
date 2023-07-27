const textToSpeech = require("@google-cloud/text-to-speech");

// .env
require("dotenv").config();

const fs = require("fs");

const util = require("util");

const client = new textToSpeech.TextToSpeechClient();

async function convertTextToMp3() {
  const text = "Hello world";

  const request = {
    input: { text: text },
    voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
    audioConfig: { audioEncoding: "MP3" },
  };

  const [response] = await client.synthesizeSpeech(request);

  const writeFile = util.promisify(fs.writeFile);

  await writeFile("output.mp3", response.audioContent, "binary");

  console.log("Text to Speech complete: Audio file saved");
}

convertTextToMp3();
