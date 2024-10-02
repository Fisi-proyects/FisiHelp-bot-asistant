const { Client, AuthStrategy, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('message_create', message => {
    console.log(`${message.from} says: ${message.body}`);
    console.log(`${message.author} : ${message.to}`);
    console.log(MessageChannel.name);
    console.log(message.type);
    console.log(message.description);
    console.log(message.id);
    console.log(message.timestamp);
    console.log(message.deviceType);
    console.log();



    
});

client.on('message', async(msg) =>{
    if(msg.body === "!!!start"){
        const media = await MessageMedia.fromUrl("https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png");   
        //mandar la imagen acompañada de un mensaje
        //await client.sendMessage(msg.from, media, {sendMediaAsSticker: true});
        await client.sendMessage(msg.from,"a\n\n\n\naaaa", {media});
    }
})

// Start your client
client.initialize();
