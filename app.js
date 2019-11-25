const conf = require('./conf.json');
const moment = require('moment');

const Eris = require('eris');
const client = new Eris.Client(conf.bot.token);

client.on('ready', () => {
  console.log(`Successfully logged in.\n  As: ${client.user.username}#${client.user.discriminator}\n  Server Count: ${client.guilds.size}\n  Time: ${moment(new Date()).format("hh:mm:ss a")} (GMT ${new Date().getTimezoneOffset() / -60})`);
  client.editStatus("dnd", {name: conf.statuses[Math.floor(Math.random() * conf.statuses.length)], type: 1});
});

client.on('error', (e, id) => {
  console.error(`Error #${id}\n${e.stack}`);
});

client.on('warn', (message, id) => {
  console.log(`Warning #${id}\n${message}`);
});

process.on('unhandledRejection', (reason, promise) => {
  console.log(`Unhandled Rejection at ${promise}\nReason: ${reason}`);
});

client.on('messageCreate', async (msg) => {
  if(msg.author.id == client.user.id)
    return;

  if(msg.content == "_info" && msg.author.id == "221740788462256138")
    return msg.channel.createMessage(`Servers: \`${client.guilds.size}\`\nUsers: \`${client.users.size}\`\nPing: \`${new Date - msg.timestamp} ms\``);
  if(msg.content == "_status" && msg.author.id == "221740788462256138") {
    var status = conf.statuses[Math.floor(Math.random() * conf.statuses.length)];
    await client.editStatus("dnd", {name: status, type: 1});
    return msg.channel.createMessage(`New Status: \`${status}\``);
  }

  var emojiReg = RegExp("(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])|.{1,32}:[0-9]{18}|♥", "g");

  if(!emojiReg.test(msg.content))
    return;

  var emojis = msg.content.match(emojiReg);

  for(var e of emojis) {
	if(!e)
	  continue;

    msg.addReaction(e);
  }
});

client.connect();

setInterval(() => {
  client.editStatus("dnd", {name: conf.statuses[Math.floor(Math.random() * conf.statuses.length)], type: 1});
}, 3.6E+6);
