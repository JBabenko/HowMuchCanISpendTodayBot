require('dotenv').config();
const {Telegraf} = require('telegraf');
const { format } = require('date-fns');
const express = require('express');

const { checkAuth } = require('./auth');
const { getSheetsValues } = require('./getSheetsValues');
const { updateSheetsValues } = require('./updateSheetsValues');

const bot = new Telegraf(process.env.BOT_TOKEN);

const {google} = require('googleapis');

bot.use(async (ctx, next) => {
  const auth = await checkAuth();
  ctx.sheets = google.sheets({version: 'v4', auth});
  next();
});

async function replyTodayBalans(ctx) {
  const rows = await getSheetsValues(ctx.sheets, 'G2:K35');
  const todayRow = rows.find(row => row[0] === format(new Date(), 'yyyy-MM-dd'));
  if (todayRow) {
    ctx.reply(`Сегодня можно ещё потратить: ${todayRow[4]} руб.`);
  } else {
    console.log('No data found.');
  }
}

async function addExpense(ctx) {
  const message = ctx.update.message.text;
  const inputedNumber = parseInt(message.substr(1));
  if (!['+', '-'].includes(message[0]) || !inputedNumber) {
    ctx.reply('Не знаю, что с этим делать...');
    return;
  };

  const rows = await getSheetsValues(ctx.sheets, 'G2:K35');
  const todayRowIndex = rows.findIndex(row => row[0] === format(new Date(), 'yyyy-MM-dd'));

  const invertedMessage = message[0] === '+'
    ? `-${inputedNumber}`
    : `+${inputedNumber}`;

  // const date = new Date().getDate();
  const range = `I${todayRowIndex + 2}`;
  const currentValue = (await getSheetsValues(ctx.sheets, range, 'FORMULA'))?.[0][0];

  const newValue = currentValue
    ? `${currentValue}${invertedMessage}`
    : `=0${invertedMessage}`;

  await updateSheetsValues(ctx.sheets, range, [[newValue]]);

  const replyMsg = message[0] === '-'
    ? 'Добавлен расход'
    : 'Добавлен доход';
  ctx.reply(replyMsg);
  replyTodayBalans(ctx);
}

bot.command('todaybalance', replyTodayBalans);
bot.on('text', addExpense);
bot.launch();

const app = express()
const port = 8080

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
})