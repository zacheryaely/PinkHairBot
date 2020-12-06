const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = '!';
const commandsFolder = './commands/';

const fs = require('fs');
const util = require('util');
const config = require('./config.json');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync(commandsFolder).filter(file => file.endsWith('.js'));

for(const file of commandFiles){
    const command = require(`${commandsFolder}${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('PinkHairBot is online!');
});

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    // process.exit(1);

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = client.commands.get(args.shift().toLowerCase());

    if(command)
        command.execute(message, args);
    else
        message.channel.send("Command not recognized");
});

client.login(config.login);