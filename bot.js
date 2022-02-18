require('dotenv').config();
const {Telegraf} = require('telegraf');
const { format } = require('date-fns');

const { checkAuth } = require('./auth');
const { getSheetsValues } = require('./getSheetsValues');

const bot = new Telegraf(process.env.BOT_TOKEN);

const {google} = require('googleapis');

bot.use(async (ctx, next) => {
  const auth = await checkAuth();
  ctx.sheets = google.sheets({version: 'v4', auth});
  next();
});

async function replyTodayBalans(ctx) {
  const rows = await getSheetsValues(ctx.sheets, 'G2:K32');
  const todayRow = rows.find(row => row[0] === format(new Date(), 'yyyy-MM-dd'));
  if (todayRow) {
    ctx.reply(todayRow[4]);
  } else {
    console.log('No data found.');
  }
}

bot.command('todaybalance', replyTodayBalans);
bot.launch();