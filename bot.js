const tmi = require('tmi.js');
/* eslint-disable no-undef */
const player = require('play-sound')(opts = {});
/* eslint-enable no-undef */
const pw = require('./token');

// Replace this string with your own channel name
const channelToJoin = 'andreaslorozco';

const config = {
  options: {
    debug: true,
  },
  connection: {
    cluster: 'aws',
    reconnect: true,
  },
  identity: {
    username: 'andreaslorozco',
    password: pw,
  },
  channels: [channelToJoin],
};

// Array which holds users who have chatted
const chattyUsers = [];

const client = new tmi.client(config);
client.connect();

// client.on('connected', (address, port) => {
//   client.action(channel, "The bot has connected on" + address + ":" + port)
// });

client.on('chat', (channel, user, message, self) => {
  if (self) return;

  // ---- Alert if new user writes in chat
  // TODO: Add whisper function, need new account
  const userName = user.username;
  const hasChatted = chattyUsers.some((chattyUser) => chattyUser === userName);
  if (!hasChatted) {
    chattyUsers.push(userName);
    player.play('./sounds/beep.mp3', (err) => {
      if (err) {
        console.error('There was an error playing this sound:', err);
      }
    });
  }
  // ----


  if (message === '!hola') {
    client.say(channel, `[BOT] ¡Hola, ${user.username}!`);
  }

  if (message === '!youtube') {
    client.say(channel, '[BOT] Tengo un canal de YouTube al que subo cursos y tutoriales de desarrollo web: https://www.youtube.com/user/yohablogeek');
  }

  if (message === '!discord') {
    client.say(channel, '[BOT] ¡Únete a nuestro servidor de Latin DEV Streamers en Discord: https://discord.gg/Ruv6C9Q');
  }

  if (message === '!beep') {
    player.play('./sounds/beep.mp3', (err) => {
      if (err) {
        console.error('There was an error playing this sound:', err);
      }
    });
  }

  if (message === '!task') {
    client.say(channel, '[BOT] En este momento estoy trabajando en actualizar el chatbot del stream.');
  }

  if (message === '!commands') {
    client.whisper(user.username, '[BOT] Los comandos habilitados en este momento son: !hola, !youtube, !discord, !beep, !task');
  }


  // funcion para que el BOT envie todos
  // los comandos disponibles cada X minutos

  // funcion para que el chat notifique
  // cuando cambia una cancion
});
