const TelegramBot = require('node-telegram-bot-api')

const TOKEN = process.env.TOKEN
const bot = new TelegramBot(TOKEN, { polling: true })

require('./database/mongodb')
const Tag = require('./database/models/tag-model')


bot.onText(/\/ping$/, msg => {
  bot.sendMessage(msg.chat.id, 'pong!')
})

bot.onText(/\/tag ([A-Za-z0-9]+(?:-[A-Za-z0-9]+)*) (.+)/, (msg, match) => {
  const [_, tag, value] = match
  const handleSuccess = () => bot.sendMessage(msg.chat.id, `Valor armazenado com sucesso para a tag ${tag}`)
  const handleError = () => bot.sendMessage(msg.chat.id, `Ocorreu um erro ao salvar essa tag`)
  Tag.create({ name: tag, value, msg })
    .then(handleSuccess, handleError)
})

bot.onText(/\/listar ([A-Za-z0-9]+(?:-[A-Za-z0-9]+)*)/, async (msg, match) => {
  const documents = await Tag.find({ name: match[1] })
  if (!documents.length) {
    bot.sendMessage(msg.chat.id, `Nenhum documento encontrado com a tag ${match[1]}`)
  } else {
    documents.forEach(d => bot.sendMessage(msg.chat.id, d.value))
  }
})
