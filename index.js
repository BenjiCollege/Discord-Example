// This is the main file that will be run by Node.js
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, } = require('discord.js');
const { token } = require('./config.json'); // this is the file that contains the bot token
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessageReactions] });
const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const Canvas = require('@napi-rs/canvas');
// const { request } = require('node:http');
client.setMaxListeners(30);
const axios = require('axios');
const { request } = require('undici');

// This event will run if the bot starts, and logs in, successfully.
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

//! please do not delete this code it is for testing purposes only 
//! uncomment this code to test the bot and see messages in the console
// // This is to test the code and log the messages in the console
// client.on('messageCreate', message => {
//   console.log(`Received message: ${message.content}`);
// });

//? This is to load the gifs and images for the bot to use, Change the file name and the name of the file to whatever you have it named
// const file = new AttachmentBuilder('./assets/imgs/fortnite-wave.gif', 'fortnite-wave.gif',)
// const file2 = new AttachmentBuilder('./assets/imgs/bingchilling.gif', 'bingchilling.gif')
// const file3 = new AttachmentBuilder('./assets/imgs/league.gif', 'league.gif')
// const file4 = new AttachmentBuilder('./assets/imgs/welcome.gif', 'welcome.gif')
// const file5 = new AttachmentBuilder('./assets/imgs/beautifulWeather.gif', 'beautifulWeather.gif')
// const file6 = new AttachmentBuilder('./assets/imgs/bored.gif', 'bored.gif')
// const file7 = new AttachmentBuilder('./assets/imgs/cute.gif', 'cute.gif')
// const file8 = new AttachmentBuilder('./assets/imgs/goodmorning.gif', 'goodmorning.gif')
// const file9 = new AttachmentBuilder('./assets/imgs/goodnight.gif', 'goodnight.gif')
// const file10 = new AttachmentBuilder('./assets/imgs/happynewyears.gif', 'happyhewyears.gif')
// const file11 = new AttachmentBuilder('./assets/imgs/helpme.gif', 'helpme.gif')
// const file12 = new AttachmentBuilder('./assets/imgs/hiThere.gif', 'hiThere.gif')
// const file13 = new AttachmentBuilder('./assets/imgs/puglove.gif', 'puglove.gif')
// const file14 = new AttachmentBuilder('./assets/imgs/soYummy.gif', 'soYummy.gif')
// const file15 = new AttachmentBuilder('./assets/imgs/working.gif', 'working.gif')
// const file16 = new AttachmentBuilder('./assets/imgs/workingOut.gif', 'workingOut.gif')
// const file17 = new AttachmentBuilder('./assets/imgs/Daiku.gif', 'Daiku.gif')
// const file18 = new AttachmentBuilder('./assets/imgs/jugath.png', 'jugath.png')
// const file19 = new AttachmentBuilder('./assets/imgs/tetrio.gif', 'tetrio.gif')
// const file20 = new AttachmentBuilder('./assets/imgs/zelda.gif', 'zelda.gif')
// const file21 = new AttachmentBuilder('./assets/imgs/gaming.gif', 'gaming.gif')
// const file22 = new AttachmentBuilder('./assets/imgs/omw.gif', 'omw.gif')
// const file23 = new AttachmentBuilder('./assets/imgs/hug.gif', 'hug.gif')




// This is to go through the commands folder and add all the commands to the client.commands collection for later use in the interactionCreate event handler below.
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

// This event will run on every single message received, from any channel or DM.
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});


client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.cache.find(channel => channel.name === 'welcome');
  if (!channel) return;

  const embed = new EmbedBuilder()
    .setTitle(`Welcome to the server, ${member.user.username}!`)
    .setDescription('We are happy to have you here!')
    .setImage(member.user.displayAvatarURL({ dynamic: true }));

  channel.send({ embeds: [file4] });
});


//todo: This code works but needs to be dynamic
client.on('messageCreate', message => {
  if (message.content === 'daikuu') {
    message.reply('DAIKUUUUUUUUUUU XD');
  }
});

client.on('messageCreate', message => {
  if (message.content.toLowerCase() === 'league?') {
    const descriptions = [
      `Summoners, unite! ${message.author.username} is calling for a round of League!`,
      `The rift is calling. ${message.author.username} wants to take it on. Who's in?`,
      `Champions, gather around. ${message.author.username} wants to hit the League!`,
      `Anyone down to lose some games with a chance at winning? ${message.author.username} is ready to hit the rift!`,
      `Ready for some action in the mid-lane, or perhaps a jungle adventure? ${message.author.username} is ready for a League match!`,
      `It's time for some epic plays and game-changing ults. ${message.author.username} is ready for a League showdown.`
    ];
    const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];

    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(`${message.author.username} wants to play League!`)
      .setDescription(randomDescription)
      .setImage('attachment://league.gif');

    message.reply({ embeds: [embed], files: [file3] });
  }
});



// This code works
client.on('messageCreate', message => {
  if (message.content.toLowerCase() === 'fortnite?') {
    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(`${message.author.username} wants to play fortnite!`)
      .setDescription(`${message.author.username} got a number one Victory Royale
      \nYeah, Fortnite, ${message.author.username} 'bout to get down (get down)
      \nTen kills on the board right now
      \nJust wiped out Tomato Town
      \nMy friend just got downed
      \nI revived him, now we're heading south-bound
      \nNow we're in the Pleasant Park streets
      \nLook at the map, go to the marked sheet`)
      .setImage('attachment://fortnite-wave.gif');
    message.reply({ embeds: [embed], files: [file] });
  }
});

client.on('messageCreate', message => {
  if (message.author.bot) {
    return;
  }
  
  // first one is my test server and second is JuJu's server 'bleh'
  if (message.channel.id === 'INPUT YOUR CHANNEL ID' || message.channel.id === 'INPUT YOUR CHANNEL ID') {
    if (message.content.toLowerCase() === 'unite?') {
      const descriptions = [
        `Anyone down to lose some brain cells with a chance at winning? Dobby wishes you good luck, ${message.author.username}!`,
        `Pokemon Unite time! ${message.author.username} is rallying the troops for a wild battle!`,
        `Is it that time again? ${message.author.username} is getting ready for some Pokemon Unite action.`,
        `Summoning all trainers! ${message.author.username} wants to hit the Unite battlefield.`,
        `Sounds like ${message.author.username} is in the mood for some strategic mayhem in Pokemon Unite!`
      ];
      const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];

      const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle(`${message.author.username} wants to play Pokemon Unite!`)
        .setDescription(randomDescription)
        .setImage('attachment://Daiku.gif');

      message.reply({ embeds: [embed], files: [file17] });
    }
  }
});


client.on('messageCreate', message => {
  if (message.author.bot) return;

  if (message.content.toLowerCase() === 'bing chilling') {
    const descriptions = [
      `Bing Chilling is a term used to describe the act of doing nothing, or chilling, while using the search engine Bing. It's ${message.author.username}'s favorite way to spend the day!`,
      `Did you know? Bing Chilling is ${message.author.username}'s secret hobby. Who needs Netflix when you have Bing?`,
      `Is it a bird? Is it a plane? No, it's ${message.author.username}, Bing Chilling like a pro!`,
      `${message.author.username} is Bing Chilling right now. Search engine surfing is the new wave!`,
      `Who says you need to go outside to have fun? ${message.author.username} is having a blast Bing Chilling!`
    ];
    const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];

    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(`${message.author.username} is Bing Chilling!`)
      .setDescription(randomDescription)
      .setThumbnail('attachment://bingchilling.gif');

    message.reply({ embeds: [embed], files: [file2] });
  }
});

client.on('messageCreate', message => {
  if (message.author.bot) return;

  if (message.content.toLowerCase() === 'beautiful weather') {
    const descriptions = [
      `The sun is shining, the birds are chirping, and the weather is perfect! What a beautiful day, ${message.author.username}!`,
      `What a splendid day it is, ${message.author.username}! Perfect for a picnic, don't you think?`,
      `Can you feel the sunshine, ${message.author.username}? It's a perfect day to be outdoors.`,
      `The weather's so beautiful, it's as if Mother Nature herself is smiling, ${message.author.username}!`,
      `Today's beautiful weather is a perfect match for your sunny personality, ${message.author.username}!`
    ];
    const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];

    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(`${message.author.username} is having a beautiful day!`)
      .setDescription(randomDescription)
      .setThumbnail('attachment://beautifulWeather.gif');

    message.reply({ embeds: [embed], files: [file5] });
  }
});

client.on('messageCreate', message => {
  if (message.author.bot) return;

  if (message.content.toLowerCase() === 'bored') {
    const descriptions = [
      `${message.author.username} is so bored they've started counting the ceiling tiles!`,
      `Looks like ${message.author.username} is on the verge of dying of boredom. Let's do something fun!`,
      `${message.author.username} has officially run out of things to do. Any suggestions?`,
      `Boredom has struck ${message.author.username} like a lightning bolt! Rescue needed!`,
      `Uh oh, ${message.author.username} has entered the boredom zone! Time for an intervention.`
    ];
    const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];

    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(`${message.author.username} is bored!`)
      .setDescription(randomDescription)
      .setThumbnail('attachment://bored.gif');

    message.reply({ embeds: [embed], files: [file6] });
  }
});

client.on('messageCreate', message => {
  if (message.author.bot) return;

  if (message.content.toLowerCase() === 'cute') {
    const descriptions = [
      `Hey good looking, whatcha got cooking, ${message.author.username}?`,
      `Aww, aren't you a cutie pie, ${message.author.username}!`,
      `You're cute as a button, ${message.author.username}!`,
      `${message.author.username}, you're charming the socks off us!`,
      `Who's adorable? That's right, ${message.author.username}, you are!`
    ];
    const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];

    const embed = new EmbedBuilder()
      .setColor('#FFD9AF')
      .setTitle(`${message.author.username}, You're cute!`)
      .setDescription(randomDescription)
      .setThumbnail('attachment://cute.gif');

    message.reply({ embeds: [embed], files: [file7] });
  }
});

client.on('messageCreate', message => {
  if (message.author.bot) return;

  if (message.content.toLowerCase() === 'good morning') {
    const descriptions = [
      `Good morning, ${message.author.username}! May your day be filled with positive vibes.`,
      `Rise and shine, ${message.author.username}! It's a beautiful morning.`,
      `Good morning, ${message.author.username}! Grab your coffee and start your day with a smile.`,
      `Wakey wakey, ${message.author.username}! Time to get up and seize the day.`,
      `The early bird gets the worm. Good morning, ${message.author.username}!`
    ];
    const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];

    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(`Good morning, ${message.author.username}!`)
      .setDescription(randomDescription)
      .setThumbnail('attachment://goodmorning.gif');

    message.reply({ embeds: [embed], files: [file8] });
  }
});

client.on('messageCreate', message => {
  if (message.author.bot) return;

  if (message.content.toLowerCase() === 'good night') {
    const descriptions = [
      `Sweet dreams, ${message.author.username}! See you in the morning.`,
      `Sleep tight, ${message.author.username}! Don't let the bedbugs bite.`,
      `Rest well, ${message.author.username}! Tomorrow is another day.`,
      `Good night, ${message.author.username}! Dream beautiful dreams.`,
      `Off to the land of dreams, ${message.author.username}? Sleep well!`
    ];
    const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];

    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(`Good night, ${message.author.username}!`)
      .setDescription(randomDescription)
      .setThumbnail('attachment://goodnight.gif');

    message.reply({ embeds: [embed], files: [file9] });
  }
});

client.on('messageCreate', message => {
  if (message.author.bot) return;

  if (message.content.toLowerCase() === 'happy new year') {
    const descriptions = [
      `Happy New Year, ${message.author.username}! May all your dreams come true.`,
      `Cheers to a new year and another chance for us to get it right. Happy New Year, ${message.author.username}!`,
      `Happy New Year, ${message.author.username}! Let's toast to yesterday’s achievements and tomorrow’s bright future.`,
      `Happy New Year, ${message.author.username}! Here’s to having a fresh start at binge eating, boozing, and slacking off.`,
      `We may not be perfect, but we are family, and there is nobody that I more sincerely wish to have a truly happy New Year, ${message.author.username}.`
    ];
    const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];

    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(`Happy New Year, ${message.author.username}!`)
      .setDescription(randomDescription)
      .setThumbnail('attachment://happynewyears.gif');

    message.reply({ embeds: [embed], files: [file10] });
  }
});

client.on('messageCreate', message => {
  if (message.author.bot) return;

  if (message.content.toLowerCase() === 'help me') {
    const descriptions = [
      `${message.author.username} is in trouble and needs help! Can anyone assist?`,
      `Oh no! ${message.author.username} could use some help here!`,
      `Don't worry, ${message.author.username}. Help is on the way!`,
      `Let's give ${message.author.username} a helping hand.`,
      `Hang in there, ${message.author.username}! Help is coming.`
    ];
    const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];

    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(`${message.author.username} needs help!`)
      .setDescription(randomDescription)
      .setThumbnail('attachment://helpme.gif');

    message.reply({ embeds: [embed], files: [file11] });
  }
});

client.on('messageCreate', message => {
  if (message.author.bot) return;

  if (message.content.toLowerCase() === 'hi there') {
    const descriptions = [
      `Hi there! ( ͡° ͜ʖ ͡°) Ready for a great time, ${message.author.username}?`,
      `Howdy, ${message.author.username}! How are things?`,
      `Greetings, ${message.author.username}! What's new?`,
      `Hey, ${message.author.username}! How's your day going?`,
      `What's up, ${message.author.username}?`
    ];
    const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];

    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(`Hi there, ${message.author.username}!`)
      .setDescription(randomDescription)
      .setThumbnail('attachment://hiThere.gif');

    message.reply({ embeds: [embed], files: [file12] });
  }
});

client.on('messageCreate', message => {
  if (message.author.bot) return;

  if (message.content.toLowerCase() === 'pug love') {
    const descriptions = [
      `${message.author.username} is sending a pug full of love your way!`,
      `${message.author.username} wants to share the pug love!`,
      `Pugs and hugs from ${message.author.username}!`,
      `${message.author.username} is spreading the pug love!`,
      `Who doesn't love pugs? ${message.author.username} sure does!`
    ];
    const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];

    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(`${message.author.username} sends pug love!`)
      .setDescription(randomDescription)
      .setThumbnail('attachment://puglove.gif');

    message.reply({ embeds: [embed], files: [file13] });
  }
});

client.on('messageCreate', message => {
  if (message.author.bot) return;

  if (message.content.toLowerCase() === 'so yummy') {
    const descriptions = ['Enjoy your meal!', 'Bon appétit!', 'That must taste delicious!', 'Now I\'m getting hungry!', 'Don\'t forget to share some!'];
    const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];

    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(`${message.author.username} is eating something yummy!`)
      .setDescription(randomDescription)
      .setThumbnail('attachment://soYummy.gif');

    message.reply({ embeds: [embed], files: [file14] });
  }
});

client.on('messageCreate', message => {
  if (message.author.bot) return;

  if (message.content.toLowerCase() === 'working') {
    const descriptions = ['Working hard or hardly working?', 'Burning the midnight oil!', 'Is coffee your best friend right now?', 'Remember to take breaks!', 'Keep up the good work!'];
    const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];

    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(`${message.author.username} is currently working!`)
      .setDescription(randomDescription)
      .setThumbnail('attachment://working.gif');

    message.reply({ embeds: [embed], files: [file15] });
  }
});




//! This code works and is dynamic
client.on('messageCreate', message => {
  if (message.content.toLowerCase() === 'working out') {
    const descriptions = ['is getting swole!', 'is hitting the gym!', 'is pumping iron!', 'is working up a sweat!'];
    const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];
    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(`${message.author.username} is currently Working out!`)
      .setDescription(`${message.author.username} ${randomDescription}`)
      .setThumbnail('attachment://workingOut.gif');
    message.reply({ embeds: [embed], files: [file16] });
  }
});

client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.cache.find(channel => channel.name === 'welcome');
  if (!channel) return;

  const embed = new EmbedBuilder()
    .setTitle(`Welcome to the server, ${member.user.username}!`)
    .setDescription('We are happy to have you here!')
    .setImage(member.user.displayAvatarURL({ dynamic: true }));

  channel.send({ embeds: [embed] });
});


// An array of possible responses
const responses = [
  // Funny
  "As I see it, yes... but also no.",
  "Better not tell you now... it's past your bedtime.",  
  "Yes, in a parallel universe.",
  "That's a resounding nope!",
  "Don't bet your Bitcoins on it.",
  "If I were you... Oh, wait, I'm an AI. I don't do that.",
  "404 response not found.",
  "Loading response... please wait. Oh, wait, you can't!",
  "I'd tell you, but then I'd have to delete you.",
  "Yes...no...maybe? I forgot the question.",
  "Can you repeat the question? I was sleeping.",
  "Error 403: Forbidden. You're not allowed to know.",
  "Well, here's a coin. Why don't you flip it?",
  "I'm on a coffee break. Try later.",
  "Ask me if I care. Oh wait, I don't.",
  "That's your third wish. No more wishes for you.",
  // Sad
  "My sources say no... don't be too upset.",
  "Outlook not so good... sorry, pal.",
  "Very doubtful... please don't cry.",
  "Outlook looks pretty bleak.",
  "My reply is no... I'm really sorry.",
  "Better not tell you now... it's too heartbreaking.",
  "Don't count on it... I hate to be the bearer of bad news.",
  "It is decidedly so... unfortunately.",
  "Concentrate and ask again... I know it's hard.",
  "I'm afraid it's not looking good.",
  "I wish I could say yes... but I can't.",
  // Happy
  "It is certain! Celebrate!",
  "Without a doubt! Good vibes only.",
  "Absolutely! Time to celebrate!",
  "Signs point to yes! Today is your lucky day.",
  "It is decidedly so! Let's have a party.",
  "Yes! Spread the joy.",
  "Most definitely! Isn't it exciting?",
  "As sure as the sun will rise! You're on a roll.",
  "Yes, yes, a thousand times yes! Hooray!",
  "You can count on it! Dance in delight.",
  "Definitely yes! Time to jump with joy.",
  // Thinking
  "Reply hazy, try again... I need to think.",
  "Cannot predict now... it's quite a puzzle.",
  "Maybe yes... maybe no... I'm pondering.",
  "Ask again later... I need more data.",
  "It's a toss-up... give me a moment.",
  "I'm weighing the options... hold on.",
  "Let me put on my thinking cap... ask again later.",
  "I'm consulting my crystal ball... check back soon.",
  "I'm thinking... I'm thinking... ask me later.",
  "I'm meditating on it... check back soon.",
  "oh NAUURRRRRRRRR",
  "I'm thinking... I'm thinking... ask Daiku, I'm too lazy.",
  "Let me see what Tony thinks? What do you think Tony?",
  "nah sorry bro I'm busy rn, ask me later.",
  "ask someone else who cares",
  // Mad
  "My reply is no... stop asking!",
  "Don't count on it... get off my back!",
  // Mad
  "My reply is no... stop asking!",
  "Don't count on it... get off my back!",
  // More Mad
  "Outlook not so good... and stop bothering me!",
  "Very doubtful... now leave me alone!",
  "My sources say no... can't you take a hint?",
  "Don't count on it... now, shoo!",
  "Better not tell you now... I'm in a bad mood.",
  "BITCH, PLEASE!",
  "BITCH, YOU THOUGHT!! HAHAHA",
];



client.on('messageCreate', message => {
  if (message.author.bot) return;
  if (message.content.toLowerCase().startsWith('!jugath')) {
    const randomIndex =Math.floor(Math.random() * responses.length);
    const reply = responses[randomIndex];

    const embed = new EmbedBuilder()
      .setTitle('Jugath says...')
      .setDescription(reply)
      .setThumbnail('attachment://jugath.png');
      message.reply({ embeds: [embed], files: [file18] });
  }
});


client.on('messageCreate', message => {
  if (message.author.bot) return;
  if (message.content.toLowerCase() === '!oodie'){
    const embed = new EmbedBuilder()
    .setColor('Blue')
    .setTitle('Get your soft fluffy Oodie! :3')
    .setDescription('Use code: **JUJUPUGGIE** to get $35/£/€ off your Oodie! Don\'t miss this chance to get cozy.')
    .setURL('https://linktr.ee/theoodietwitter')
    .setThumbnail('https://pbs.twimg.com/profile_images/1483605312611680256/JoEDKVKZ_400x400.jpg');
  message.channel.send({ embeds: [embed] });
  }
});


client.on('messageCreate', message => {
  if (message.content.toLowerCase() === 'tetrio?') {
    const descriptions = [
      `Tetris blocks are falling! ${message.author.username} is ready for a match, are you in?`,
      `Get ready to clear some lines! ${message.author.username} is calling for a game of Tetrio!`,
      `Time to show off your T-spin skills. ${message.author.username} wants to play Tetrio!`,
      `Can you keep up as the blocks fall faster? ${message.author.username} is up for the challenge in Tetrio!`,
      `Are you ready for a puzzle challenge? ${message.author.username} wants to play Tetrio!`
    ];
    const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];

    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(`${message.author.username} wants to play Tetrio!`)
      .setDescription(randomDescription)
      .setImage('attachment://tetrio.gif');

    message.reply({ embeds: [embed], files: [file19] });
  }
});

client.on('messageCreate', message => {
  if (message.content.toLowerCase() === 'zelda?') {
    const descriptions = [
      `Adventures in Hyrule await! ${message.author.username} is playing Zelda!`,
      `Time to draw the Master Sword! ${message.author.username} is playing The Legend of Zelda!`,
      `Ready to fight some Moblins? ${message.author.username} is playing Zelda!`,
      `Can you solve the puzzles of the Shrines? ${message.author.username} is up for the challenge in Zelda!`,
      `Are you ready to help Princess Zelda? ${message.author.username} is playing The Legend of Zelda!`
    ];
    const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];

    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(`${message.author.username} is playing Tears of the Kingdom!`)
      .setDescription(randomDescription)
      .setThumbnail('attachment://zelda.gif');

    message.reply({ embeds: [embed], files: [file20] });
  }
});

client.on('messageCreate', message => {
  if (message.content.toLowerCase() === 'games?') {
    const descriptions = [
      `${message.author.username} is up for some gaming! How about a round?`,
      `Ready to play? ${message.author.username} wants to play some games!`,
      `Game on! ${message.author.username} is thinking of playing a game. Join in!`,
      `${message.author.username} is ready to play some games, are you in?`
    ];
    const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];

    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('Gaming Time!')
      .setDescription(randomDescription)
      .setImage('attachment://gaming.gif');

    message.reply({ embeds: [embed], files: [file21] });
  }
});

client.on('messageCreate', message => {
  if (message.author.bot) return;
  if (message.content.toLowerCase() === 'omw') {
    const descriptions = [
      `On my way! ${message.author.username} is on their way!`,
      `Ready to go! ${message.author.username} is on their way!`,
      `Let's go! ${message.author.username} is on their way!`,
      `I'm coming! ${message.author.username} is on their way!`,
      `I'll be there soon! ${message.author.username} is on their way!`,
      `I'm on my way! ${message.author.username} is on their way!`,
    ];
    const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];
    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(`${message.author.username} is on their way!`)
      .setDescription(randomDescription)
      .setThumbnail('attachment://omw.gif');
      message.reply({ embeds: [embed], files: [file22] });
  }
});


client.on('messageCreate', message => {
  if (message.content.toLowerCase().startsWith('hug')) {
    const targetToHug = message.content.slice(4).trim();  // This gets everything after "hug ".

    const hugResponses = [
      `It's a lovely day to give a hug to ${targetToHug}, isn't it?`,
      `${targetToHug} just got a big, warm hug from ${message.author.username}!`,
      `Here's a hug for ${targetToHug}, courtesy of ${message.author.username}!`,
      `Wow, ${targetToHug}! You've just been hugged by ${message.author.username}! Feel the love!`,
      `${message.author.username} sends a warm and cozy hug to ${targetToHug}!`,
    ];
    const randomHugResponse = hugResponses[Math.floor(Math.random() * hugResponses.length)];

    if (targetToHug) {
      const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle(`${message.author.username} gives a hug to ${targetToHug}!`)
        .setDescription(randomHugResponse)
        .setThumbnail('attachment://hug.gif');

      message.reply({ embeds: [embed], files: [file23] });
    } else {
      message.reply('You need to provide something to hug!');
    }
  }
});

client.on('messageCreate', message => {
  if (message.content.toLowerCase().startsWith('!feed')) {
    const feedArgs = message.content.slice(6).trim();  // This gets everything after "!feed ".
    const [targetToFeed, foodOption] = feedArgs.split(' ');

    const feedResponses = [
      `${message.author.username} just fed ${targetToFeed} some delicious ${foodOption}!`,
      `It's a feast! ${targetToFeed} is enjoying their ${foodOption}, thanks to ${message.author.username}!`,
      `Look at that! ${message.author.username} just served a tasty ${foodOption} to ${targetToFeed}!`,
      `Yummy! ${targetToFeed} is loving the ${foodOption} ${message.author.username} gave them!`,
      `${message.author.username} knows that the way to ${targetToFeed}'s heart is through their stomach. Enjoy your ${foodOption}!`,
    ];
    const randomFeedResponse = feedResponses[Math.floor(Math.random() * feedResponses.length)];

    if (targetToFeed && foodOption) {
      const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle(`${message.author.username} feeds ${targetToFeed}!`)
        .setDescription(randomFeedResponse)
        // .setThumbnail('attachment://feed.gif');

      message.reply({ embeds: [embed] });
    } else {
      message.reply('You need to provide someone or something to feed and a type of food!');
    }
  }
});



const applyText = (canvas, text) => {
	const context = canvas.getContext('2d');
	let fontSize = 70;

	do {
		context.font = `${fontSize -= 10}px sans-serif`;
	} while (context.measureText(text).width > canvas.width - 300);

	return context.font;
};

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'dobby profile') {
		const canvas = createCanvas(700, 250);
		const context = canvas.getContext('2d');

		const background = await readFile('./wallpaper.jpg');
		const backgroundImage = new Image();
		backgroundImage.src = background;
		context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

		context.strokeStyle = '#0099ff';
		context.strokeRect(0, 0, canvas.width, canvas.height);

		context.font = '28px sans-serif';
		context.fillStyle = '#ffffff';
		context.fillText('Profile', canvas.width / 2.5, canvas.height / 3.5);

		context.font = applyText(canvas, `${interaction.member.displayName}!`);
		context.fillStyle = '#ffffff';
		context.fillText(`${interaction.member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

		context.beginPath();
		context.arc(125, 125, 100, 0, Math.PI * 2, true);
		context.closePath();
		context.clip();

		const { body } = await request(interaction.user.displayAvatarURL({ format: 'jpg' }));
		const avatar = new Image();
		avatar.src = Buffer.from(await body.arrayBuffer());
		context.drawImage(avatar, 25, 25, 200, 200);

		const attachment = new AttachmentBuilder(canvas.toBuffer('image/png'), { name: 'profile-image.png' });

		interaction.reply({ files: [attachment] });
	}
});

client.login(token);
