const Telegraf = require('telegraf');
const session = require('telegraf/session');
const Stage = require('telegraf/stage');
const WizardScene = require('telegraf/scenes/wizard');
const mysql = require('mysql');
const nodemailer = require("nodemailer");
const util = require('util');




const bot = new Telegraf('1969516967:AAFPXAcbSn3pZHCfcE3MD6rfyMq-sLvLgIA');
bot.use(session());
//bot.use(stage.middleware());

bot.command('name', (ctx) => ctx.reply(ctx.from.username));

bot.launch();
