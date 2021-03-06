const Discord = require("discord.js")
const client = new Discord.Client();
const config = require("./ayarlar.js")
const moment = require('moment')
require("moment-duration-format")
  moment.locale("tr")
const fs = require("fs");                                        
require('./util/Loader.js')(client);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  console.log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./commands/${f}`);
    console.log(`${props.config.name} Komutu Sorunsuz Baslatildi`);
    client.commands.set(props.config.name, props);
    props.config.aliases.forEach(alias => {
      client.aliases.set(alias, props.config.name);
    });
  });                                                                     
});




  

client.login(config.token)
