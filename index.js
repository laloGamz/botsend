const Telegraf = require('telegraf');
const session = require('telegraf/session');
const Stage = require('telegraf/stage');
const WizardScene = require('telegraf/scenes/wizard');
const mysql = require('mysql');
const nodemailer = require("nodemailer");
const util = require('util');

const superWizard = new WizardScene(
  'super-wizard',
  ctx => {
    ctx.reply("Ingrese su key");
    ctx.wizard.state.data = {};
    return ctx.wizard.next();
  },
  ctx => {
    ctx.reply("Ingrese el mail de destino?");
    ctx.wizard.state.data.key = ctx.message.text;
    return ctx.wizard.next();
  },
  ctx => {
    ctx.wizard.state.data.email = ctx.message.text;
    ctx.reply('Ingrese su mensaje');
    return ctx.wizard.next();
  },
  ctx => {
    
    var con = mysql.createConnection({
        host: "185.201.11.128",
        user: "u270568211_pablod",
        password: "Guillermo2020.",
        database: "u270568211_juegosgamer"
      });
    
    ctx.wizard.state.data.mensaje = ctx.message.text;
    
    const query = util.promisify(con.query).bind(con);

    var rows = '' ;
    
    var rows2 = '' ;

    (async () => {
      try {
        rows = await query(`SELECT * FROM user WHERE llave = "${ctx.wizard.state.data.key}"`);

        console.log(rows.length);
        
        rows2 = await query(`SELECT credito FROM user WHERE llave ="${ctx.wizard.state.data.key}"`);
        
        console.log(rows2)
        
        var creditos = rows2[0].credito;

        if(creditos>0){

            if(rows.length !=0){

                rows2 = await query(`UPDATE user SET credito=${creditos -1} WHERE llave="${ctx.wizard.state.data.key}"`);
              
                  
                  const mails =['golondrinasient@gmail.com','axonzte58@gmail.com','greciatonally@gmail.com','aaronpinzon30q@gmail.com','golondrina202221@gmail.com','fuegocruzado2020@gmail.com','plugin8080@gmail.com','plugin252525@gmail.com','guilleamazon.2016@gmail.com','mexicotierrahackers2020@gmail.com','musicaalairelibre2020@gmail.com','greciatonally@gmail.com','sheinofertas525@gmail.com','amazonprime20u@gmail.com','chedraguicuestamenos@gmail.com','negociosonline17u@gmail.com','sheinhistorial@gmail.com','coppelrenueva@gmail.com'];
    
                mails.forEach(function myFunction(value) {
                  
                  try{
            
                    var transporter = nodemailer.createTransport({
                      service: 'Gmail',
                      auth: {
                          user: value,
                          pass: 'Alor_1130'
                          }
                      });
                    
                    var mailOptions = {
                      from: value,
                      to: ctx.wizard.state.data.email,
                      subject: 'Asunto',
                      text: ctx.wizard.state.data.mensaje
                    };
                    
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error){
                        console.log(error);
                        //res.send(500, err.message);
                    } else {
                        console.log("Email sent");
                        ctx.reply('mensaje enviado');
                        //res.status(200).jsonp(req.body);
                    }
                })
                    
                  }
                  
                  catch{
                    
                    console.log('no esta login ese mail');
                  
                  }
            
     
                      
                  
                });
            }


        }

        

      } finally {
        con.end();
        return ctx.scene.leave();
      }
    })()
    

  }
);

const stage = new Stage([superWizard]);


const bot = new Telegraf('1969516967:AAFPXAcbSn3pZHCfcE3MD6rfyMq-sLvLgIA');
bot.use(session());

bot.use(stage.middleware());

bot.command('info', (ctx) => {
        
 var con = mysql.createConnection({
        host: "185.201.11.128",
        user: "u270568211_pablod",
        password: "Guillermo2020.",
        database: "u270568211_juegosgamer"
      });
 
       
  const query = util.promisify(con.query).bind(con);
 
        
  (async () => {
          
          try{
                  
                  const info = await query(`SELECT * FROM user WHERE first_name ="${ctx.from.username}"`);
  
                  console.log(info[0].llave);
                  ctx.reply('key: '+info[0].llave);
                  ctx.reply('credito: '+info[0].credito);
          }
          finally {
                con.end();
     
      }
  
  })()
  
  
});

bot.command('newMail', (ctx) => {
  
  id = ctx.message.text.replace('/newMail', '')
  
  var con3 = mysql.createConnection({
        host: "185.201.11.128",
        user: "u270568211_pablod",
        password: "Guillermo2020.",
        database: "u270568211_juegosgamer"
      });
    
    const query3 = util.promisify(con3.query).bind(con3);
  
    (async () => {
      
      rows3 = await query3(`INSERT INTO mail (mail) VALUES ('${id}')`);
  
      console.log(rows3);
    
    
    })()
  


});

bot.command('name', (ctx) => ctx.reply(ctx.from.username));

bot.command('mails', (ctx) => {
  
  var con = mysql.createConnection({
        host: "185.201.11.128",
        user: "u270568211_pablod",
        password: "Guillermo2020.",
        database: "u270568211_juegosgamer"
      });
 
       
  const query = util.promisify(con.query).bind(con);
  
  (async () => {
  
    rows6 = await query(`SELECT mail FROM mail`);
                      
    console.log(rows6);
  
  })();
  


});

bot.command('send', ctx => {

  
    ctx.scene.enter('super-wizard');
});

bot.launch();
