const TelegramBot = require('node-telegram-bot-api')

const TOKEN = process.env.TOKEN
const bot = new TelegramBot(TOKEN, { polling: true })


bot.onText(/\/ping$/, msg => {
  bot.sendMessage(msg.chat.id, 'pong!')
})

bot.onText(/\/tag ([A-Za-z0-9]+(?:-[A-Za-z0-9]+)*) (.+)/, (msg, match) => {
  const [_, tag, data] = match
  bot.sendMessage(msg.chat.id, `Valor armazenado com sucesso para a tag ${tag}`)
})
