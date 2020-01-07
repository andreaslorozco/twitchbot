const tmi = require("tmi.js")
const pw = require("./token");
const channel = "andreaslorozco"

const config = {
    options: {
        debug: true
    }, 
    connection: {
        cluster: "aws", 
        reconnect: true
    },
    identity: {
        username: "andreaslorozco",
        password: pw
    },
    channels: [channel]
}

const usersWhoHaveNotChatted = [];

const client = new tmi.client(config)
client.connect();

client.on("connected", (address, port) => {
    client.action(channel, "The bot has connected on" + address + ":" + port)
});

client.on("chat", (channel, user, message, self) => {
  if (self) return;

  // ---- Alert if new user writes in chat
  // TODO: Add whisper function
  const userName = user.username;
  const hasChatted = usersWhoHaveNotChatted.some(user => user === userName);
  if (!hasChatted) {
    usersWhoHaveNotChatted.push(userName);
    console.log("Primer mensaje de este usuario")
  };
  console.log("***hasChatted***", hasChatted);
  // ----


  if (message == "!hola") {
      client.say(channel, `[BOT] ¡Hola, ${user.username}!`)
  }

  if (message == "!youtube") {
    client.say(channel, "[BOT] Tengo un canal de YouTube al que subo cursos y tutoriales de desarrollo web: https://www.youtube.com/user/yohablogeek")
  }

  if (message == "!discord") {
    client.say(channel, "[BOT] ¡Únete a nuestro servidor de Latin DEV Streamers en Discord: https://discord.gg/Ruv6C9Q")
  };

  // funcion para que el BOT envie todos
  // los comandos disponibles cada X minutos



  // funcion para que el chat notifique
  // cuando cambia una cancion

  // command para latin dev streamers !discord
});