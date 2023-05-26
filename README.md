# My Discord Bot

This is a Discord bot created using Node.js and the discord.js library.

## Overview
The bot is designed to interact with users in the server by replying to certain command messages and welcoming new users. The bot can also provide visual responses by attaching images or gifs to its messages. The bot's command messages and corresponding actions are stored in a commands directory, which can be easily expanded for more functionality.

## Getting Started

1. Install [Node.js](https://nodejs.org) and [npm](https://www.npmjs.com/get-npm).
2. Clone this repository.
3. Install the necessary dependencies by running `npm install` in the project's root directory.
4. You must have a bot token from the [Discord developer portal](https://discord.com/developers/applications). The token should be added to a file named `config.json` in the root directory of the project. The file should look something like this:
```json
{
  "token": "your-token-goes-here"
}
```
5. Run the bot by running `node .` in the project's root directory.

## Features

- When the bot starts, it logs a confirmation message in the console.
- The bot can log incoming messages to the console (currently commented out for testing purposes).
- When a new user joins the server, the bot sends a welcome message to a channel named "welcome" with an image.
- The bot responds to specific message content with pre-defined responses. For example, when a user sends a message with content "daikuu", the bot replies with "DAIKUUUUUUUUUU XD".
- The bot can reply with a custom embed message, which includes a random description and an attached gif image when a user sends a message with content "league?".

## Commands and how they work
- !jugath : Returns a random funny, sad, happy, thinking, or mad response.
- !oodie : Sends a promotional message about The Oodie, with an image and a link.
- tetrio? : Sends a message indicating the user wants to play Tetrio, with a random description and a gif.
- zelda? : Sends a message indicating the user is playing Zelda, with a random description and a gif.
- games? : Sends a message indicating the user is ready to play some games, with a random description and a gif.
- omw : Sends a message indicating the user is on their way, with a random description and a gif.
- hug : Sends a message indicating the user is giving a hug, with a random description and a gif.
- !feed : Sends a message indicating the user is feeding someone, with a random description and a gif.
- !dobby profile : Creates a dynamic profile picture with the user's name and avatar.

## How to Extend This Bot
If you want to add new commands to the bot, you can create new .js files in the commands directory. Each command file should export an object with two properties: `data` and `execute`. The `data` property should be an instance of the `SlashCommandBuilder` class, and `execute` should be a function that takes an `interaction` parameter and executes the command's action.

## Dependencies

- [Node.js](https://nodejs.org)
- [discord.js](https://discord.js.org)
- [@napi-rs/canvas](https://www.npmjs.com/package/@napi-rs/canvas)
- [axios](https://www.npmjs.com/package/axios)
- [undici](https://www.npmjs.com/package/undici)

## Note
Some code sections in the main file are commented out but are left as placeholders for features like testing and attaching gifs/images. Be sure to modify these sections according to your specific needs.
