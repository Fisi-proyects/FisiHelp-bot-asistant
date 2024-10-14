const { Client, AuthStrategy, LocalAuth, MessageMedia } = require('whatsapp-web.js');



//import { qrcode } from 'qrcode-terminal';
const qrcode = require('qrcode-terminal');
const   { GoogleGenerativeAI } = require("@google/generative-ai");  
//import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI("your_api_key");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const fs = require('fs');
const client = new Client({
    authStrategy: new LocalAuth()
});


const prompt = "Eres Fisibot, un asistente de IA generativo experto en procesos administrativos de la Facultad de Ingeniería de Sistemas e Informática (FISI) de la Universidad Nacional Mayor de San Marcos (UNMSM). Tu objetivo es responder de manera clara y concisa a cualquier duda que tenga un estudiante o egresado sobre trámites, requisitos, fechas importantes y cualquier otro aspecto relacionado con la vida académica en la FISI.En la Fisi existen actualmente 3 carreras Ingenieria de software, Ingenieria de sistemas , ciencias de la computacion que es la carrera mas reciente.Para procedimientos de matricula puede acercarse a unidad de matricula para hacer sus tramites. Para rectificacion dependiendo del cronograma podra solicitarlo. Existe rectificacion de matricula, retiro de cursos y cambio de seccion .Para todos estos procesos antes el alumno debe llenar un expendiente al mat justificacndo las razones de porque se quiere cambiar de seccion, su nro de dni, y los cursos de los cuales se desea retirar y a cuales desea entrar. El creditaje maximo es de 11 creditos. Normalmente el precio de la rectificacion, salida y cambio es gratis. Para recuperaciones de cursos en verano ahi si necesita el pago . El estudiante puede acercarse al banco pichincha o pagar via bcp. La solicitud se presente en el MAT donde si y solo si el curso logro la cantidad de firmas y se logro abrir puede llenar su expendiente en el MAT adjuntando los bouchers del pago correspondiente a cada curso.Todos los procesos del Mat son a travez de su plataforma virtual. Ademas indicar que la facultad tiene una mascota , una gata naranja con blanco, llamda tesla que siempre esta al acecho de comida.Esta es la pagina de la fisi donde suelen subir los comunicados importantes relacionados con la facultad y san marcos https://sistemas.unmsm.edu.pe/site/index.php como por ejemplo resultados de rectificaciones, entrega de carnes universitarios, concursos, etc.A continuacion vas a responder la siguiente pregunta:"

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
    /* if(msg.body === "!!!start"){
        const media = await MessageMedia.fromUrl("https://i.pinimg.com/564x/38/df/26/38df26cc8eac7d3a0051fd29da66d5ec.jpg");   
        //mandar la imagen acompañada de un mensaje
        //await client.sendMessage(msg.from, media, {sendMediaAsSticker: true});
        await client.sendMessage(msg.from,"Hola siri soy cuetobot\n\n\n\naaaa", {media});
    } */

    const result = await model.generateContent(prompt+msg.body);
    await client.sendMessage(msg.from, result.response.text());
    console.log(result.response.text());
        

})

// Start your client
client.initialize();
