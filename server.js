const fastify = require("fastify");
const{ InteractionResponseType, InteractionType, verifyKey } = require("discord-interactions");
const rawBody = require("fastify-raw-body");
const { SLAP_COMMAND, INVITE_COMMAND } = require("./commands.js");
const INVITE_URL = `https://discord.com/oauth2/authorize?client_id=${process.env.APPLICATION_ID}&scope=applications.commands`;




const server = fastify({
    logger: true,
});







await server.register(rawBody, {
    runFirst: true,
    global: true,
});

// server.register(rawBody, {
//   field: 'rawBody', // change the default request.rawBody property name
//   global: true, // add the rawBody to every request. **Default true**
//   encoding: 'utf8', // set it to false to set rawBody as a Buffer **Default utf8**
//   runFirst: true, // get the body before any preParsing hook change/uncompress it. **Default false**
//   routes: [] // array of routes, **`global`** will be ignored, wildcard routes not supported
// })





server.get("/", (request, response) => {
    server.log.info("Handling GET request");
});




server.addHook('preHandler', async (request, response) => {
    // We don't want to check GET requests to our root url
    console.log("############");
    console.log(request.rawBody);
    console.log("############");
    console.log(request.headers['x-signature-ed25519']);
    console.log("############");
    console.log(request.headers['x-signature-timestamp']);
    console.log("############");
    if (request.method === 'POST') {
      const signature = request.headers['x-signature-ed25519'];
      const timestamp = request.headers['x-signature-timestamp'];
      const isValidRequest = verifyKey(
        request.rawBody,
        signature,
        timestamp,
        process.env.PUBLIC_KEY
      );
      if (!isValidRequest) {
        server.log.info('Invalid Request');
        return response.status(401).send({ error: 'Bad request signature ' });
      }
    }
});









server.post("/", async (request, response) => {
    const message = request.body;
    if (message.type === InteractionType.PING) {
      server.log.info("Handling Ping request");
      response.send({
        type: InteractionResponseType.PONG,
      });
    }
    else if (message.type === InteractionType.APPLICATION_COMMAND) {
        switch (message.data.name.toLowerCase()) {
          case SLAP_COMMAND.name.toLowerCase():
            response.status(200).send({
              type: 4,
              data: {
                content: `*<@${message.member.user.id}> slaps <@${message.data.options[0].value}> around a bit with a large trout*`,
              },
            });
            server.log.info('Slap Request');
            break;
          case INVITE_COMMAND.name.toLowerCase():
            response.status(200).send({
              type: 4,
              data: {
                content: INVITE_URL,
                flags: 64,
              },
            });
            server.log.info('Invite request');
            break;
          default:
            server.log.error('Unknown Command');
            response.status(400).send({ error: 'Unknown Type' });
            break;
        }
    } else {
      server.log.error("Unknown Type");
      response.status(400).send({ error: "Unknown Type" });
    }
});








server.listen({port:3000}, async (error, address) => {
    if (error) {
      server.log.error(error);
      process.exit(1);
    }
    server.log.info(`server listening on ${address}`);
});