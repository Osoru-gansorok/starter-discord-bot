//process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
//process.env['AWS_REGION'] = 'eu-west-2';
//process.env['AWS_ACCESS_KEY_ID']='ASIAQUW77A7WVYKGXU6O'
//process.env['AWS_SECRET_ACCESS_KEY']='/c2hl4RrHa8YYmfaLVQfxUleHee0dZjiPVAgi8Tl'
//process.env['AWS_SESSION_TOKEN']='IQoJb3JpZ2luX2VjEP///////////wEaCXVzLWVhc3QtMiJHMEUCIQC5iJn+l7KkWFAZ6o66VXgH4DqRUSSWARJIoBgCOsXOFAIgTo8abXlAuwjWbPy7Pd/JkyFt8cxouzgfgd2R+87xnwoqqQIIGBAAGgwwNDQ0OTMxMTMzMjUiDDtm1QfLBMnCyum4sCqGAnHGMOxPwfEoT+UDfiH9B/iNfHWOaTsjngbQ8kxt5rEaIXg3i+h0BMYuE0q71wnK+Yg4hcBjvloXyVSUWbjr2tZyd55NXy0mLFa+iayWa48Y+SZb9XkS0DMZvKCIi8cOXWvQf8uxCT3imPFdETmh8JrCPgTbFL7k3DuoSGADnzbXcKY1oR7DPSTzz5Wv5v4BOd3vGBDWLEvQRaPqdC8ZutwJC/se6D448QqVi/eeU0MEJ9W8j4bf+MFUGgy/CFCqKbRcrm02ksRxAQIREqrgDhdpNJ5Sfu46ajto2rwthelx+kgyjNKEiloJYWcnHC50DFpzlKclGMsMTCD4UvvWf0ZaheSWyqkw392InAY6nQE4H4NpgpVDu/Ka2rVjCTZj+voz82XosHfgKvGO5tDJLG2XEt6Pxfy5F9nRBHvHaog4hLyoRKbNhSobtDoMCaK67zW3Ysim0coN/+C1/CRZXqpKb4Au3FIkNrLuV93Z63YIffmEegVxdzKP4dNwtFhevVAWsSM+mMX/IFEgPidqYtX11ezFTesmJJzWKUvjt1XCaj36aA5j4hLFbMG3'

//const AWS = require("aws-sdk");
//const s3 = new AWS.S3()
const { Client, Intents, GatewayIntentBits,AttachmentBuilder } = require("discord.js");
//const config = require("./config.json");
//const allIntents = Intents.ALL
//const fs = require("node:fs");
//const fs = require('fs/promises');
//const fetch = require("node-fetch")
const http = require("https");
const filejson = "base_user.json"
//const client = new Client({intents : allIntents });
//const client = new Client({intents :[IntentsBitField.Flags.Guilds,
//IntentsBitField.Flags.GuildMessages,IntentsBitField.Flags.DirectMessages,IntentsBitField.Flags.GuildPresences,]})
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

//const fsPromises = require('fs').promises;

//const KIO = '1044683549237846116';
const KIO ='1042558380012736614'
const express = require("express")
const app = express()
const serverless = require('serverless-http');
//const bodyParser = require('body-parser');

//app.use(bodyParser);

const router = express.Router();

router.get("/",(req,res) =>{
	res.send("le banquier est en ligne!")
})
app.post('/', (req, res) => {
  res.send("le banquier est en ligne!")
})

app.use('/time/', router)
app.listen(3333,()=>{
	console.log("The project is ready")
})


module.exports.handler = serverless(app)
//const download = function(uri, filename, callback){
//	request.head(uri, function(err, res, body){
//	console.log('content-type:', res.headers['content-type']);
//	console.log('content-length:', res.headers['content-length']);
//	request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
//
//	});
//};



//try {
//	 const s3Response = await s3.putObject({
//				Body: JSON.stringify({key:"value"}),
//				Bucket: "cyclic-hungry-antelope-eu-west-2",
//				Key: "base_user.json",
//			}).promise()
//	console.log(s3Response);
//} catch (e) {
//  console.log(e);
//  //callback(e);
//}
//
//// get it back
//let base_user = await s3.getObject({
//				Bucket: "cyclic-hungry-antelope-eu-west-2",
//				Key: "base_user.json",
//			}).promise()





//const download = function(url, dest, cb) {
//  const file = fs.createWriteStream(dest);
//  const request = http.get(url, function(response) {
//    response.pipe(file);
//    file.on('finish', function() {
//      file.close(cb);  // close() is async, call cb after close completes.
//    });
//  }).on('error', function(err) { // Handle errors
//    fs.unlink(dest); // Delete the file async. (But we don't check the result)
//    if (cb) cb(err.message);
//  });
//};



client.on("ready",async () =>{
	console.log("Préparation du bot");
	const kio = client.channels.cache.get(KIO);
	if (!kio) {
	console.log("The channel does not exist!");
	return
	}
	console.log("La chaine existe");
	const kiotest =kio.messages.fetch({ limit: 1 }).then(messages => {
		console.log("Préparation des variables....");
		const lastMessage = messages.filter(msg => msg.author.id === client.user.id).last()
		//const lastMessage = messages.first();
		const filename =  lastMessage.attachments.first()?.name
		const file = lastMessage.attachments.first()?.attachment
		const url = lastMessage.attachments.first()?.url
		console.log("Préparation des variables ok");
		if (typeof file !== 'undefined'){
			if(filename == filejson){
				console.log("Download last json");
				http.get(url, (res) => {
					const data = [];
					res.on('data', (chunk) => {
						data.push(chunk);
						}).on('end', () => {
							let buffer = Buffer.concat(data);
								console.log("***************************");
								console.log(JSON.parse(buffer.toString('utf8'),'utf8'));
								console.log('le bot est pret')
							});
						}).on('error', (err) => {
					  		console.log('download error:', err);
					});

			}
		} else {
			console.log("Download last json failed");
			return
		}
		}).catch(err => {
			console.log(err)
		})

})


client.on("messageCreate", function(message) { 
	if (message.author.bot) return;
	const nbre_mot = message.content.split(' ').length;
	const userdiscord = message.author.username;
	const userdiscorddis = message.author.discriminator;
	const userdiscordID = message.author.id;
	const score = 250 - nbre_mot;
	//const rep = "Le solde de " + userdiscord + " s'élève à " + str(dictj.get(userdiscord+"#"+userdiscorddis)) + " car son message comporte " + nbre_mot + " mot(s) donc il a recu: " + score + " unité(s) monétaire(s)"
	const kio = client.channels.cache.get(KIO);
	const kiotest =kio.messages.fetch({ limit: 1 }).then(messages => {
	const lastMessage = messages.filter(msg => msg.author.id === client.user.id).last()
	//const lastMessage = messages.first()
	//console.log(lastMessage.content)
	const filename =  lastMessage.attachments.first()?.name
	const file = lastMessage.attachments.first()?.attachment
	const url = lastMessage.attachments.first()?.url
	if (typeof file !== 'undefined'){
		if(filename == filejson){
			http.get(url, (res) => {
				const data = [];
				res.on('data', (chunk) => {
					data.push(chunk);
					}).on('end', () => {
						let buffer = Buffer.concat(data);
						console.log("***************************");
						//let dataparse = JSON.parse(data);
						console.log(JSON.parse(buffer.toString('utf8'),'utf8'));
						let dataparse = JSON.parse(buffer.toString('utf8'),'utf8');
						const ancien_score = dataparse[userdiscord+"#"+userdiscorddis];
						console.log(dataparse);
						console.log(userdiscord+""+userdiscorddis+" : "+ ancien_score);
						const nouveau_score =dataparse[userdiscord+"#"+userdiscorddis] = ancien_score + score;
						console.log(userdiscord+"#"+userdiscorddis+" : "+ ancien_score+" + "+score+ " = "+nouveau_score+" Updated");
						const strdata = JSON.stringify(dataparse,'utf8');
						//const buffersend = Buffer.from(strdata, 'base64');
						//const filerep = new MessageAttachment(buffer, filejson);
						const rep = "Le solde de " + userdiscord + " s'élève à " + userdiscorddis + " car son message comporte " + nbre_mot + " mot(s) donc il a recu: " + score + " unité(s) monétaire(s)"
						console.log(rep);
						message.channel.send(rep)
							.then(m => setTimeout(() => m.delete(),60000) ,(err) => {
								if (err) {
									console.log("Probleme pour la suppression du message");
									throw err}
								else {
									console.log("Message supprimé")}
							});

						message.author.send(rep).catch(erreur =>{
							console.log('I was unable to send a message.')});
						const filerep = new AttachmentBuilder(buffer, { name : filejson});
						const kio = client.channels.cache.get(KIO);
						kio.send({content :strdata, files: [filerep]});
						console.log('Update Success');
						setTimeout(() => lastMessage.delete(), 5000)
						});
					}).on('error', (err) => {
				  		console.log('download error:', err);
				});
			}
		}
	})
});   

client.login(process.env['BOT_TOKEN']);