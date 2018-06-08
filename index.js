// Discord.js bot
const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const client = new Discord.Client();

client.on('ready', () => {
              console.log(`Logged in as ${client.user.tag}!`);
    console.log(`in ${client.guilds.size} servers `)
    console.log(`[Users] ${client.users.size}`)
    client.user.setStatus("invisible")
});

client.on("guildMemberAdd", member => {
const voiceChannel = member.voiceChannel;
/*var x = ['./music,mp3' ,'./musi.mp3'];
var x3 = Math.floor(Math.random()*x.length)*/




const type = require('./welcome voice.json');
const item = type[Math.floor(Math.random() * type.length)];
const filter = response => {
    return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
};
    let pEmbed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .addField(`الرجاء كتابة هذا الكود
    لأسباب امنية`, `${item.type}`)


              member.createDM().then(function (channel) {
return channel.send(pEmbed).then(() => {
        channel.awaitMessages(res => res.content === `${item.type}`, {
             maxMatches: 1, time: 150000, errors: ['time'] })
        .then((collected) => {
                   channel.send(`${collected.first().author} ✅ **الرجاء التوجه الى روم البوت وسماع التعليمات**`);
        console.log(`[Typing] ${collected.first().author} typed the word.`);
        const stream = ytdl("https://www.youtube.com/watch?v=iaQLhnXWnOw", { filter: 'audioonly' });
        for (const connnection of client.voiceConnections.values()) {
        const dispatcher = connnection.playStream(stream);
		
        
                dispatcher.on('end', () => member.addRole('438813521011277824'));
				/**/

      
      }
        }    
          )
          .catch(collected => {
            console.log('[Typing] Error: No one type the word.');
          })
        })
    })
}
);

client.on('message', message => {
  // Voice only works in guilds, if the message does not come from a guild,
  // we ignore it
  if (!message.guild) return;

  if (message.content === '/join') {
    // Only try to join the sender's voice channel if they are in one themselves
    if (message.member.voiceChannel) {
      message.member.voiceChannel.join()
        .then(connection => { // Connection is an instance of VoiceConnection
          message.reply('I have successfully connected to the channel!');
        })
        .catch(console.log);
    } else {
      message.reply('You need to join a voice channel first!');
    }
  }
})

client.login(process.env.TOKEN);
