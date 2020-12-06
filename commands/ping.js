module.exports = {
    name: 'ping',
    description: 'this is a ping command',
    execute(message, args){
        // type all of the code that is going to get executed when the user runs command
        message.channel.send('pong!');
    }
}