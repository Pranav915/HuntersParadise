const Ably = require("ably");

const createAuthToken = async (req, res) => {
  let tokenParams;
  let token;
  // Check if the user is logged in
  if (req.query.clientId != "undefined") {
    /* Issue a token with pub & sub privileges for all channels and
        configure the token with an client ID */
    tokenParams = {
      capability: { "*": ["publish", "subscribe", "presence"] },
      clientId: req.query?.clientId,
    };
  } else {
    /* Issue a token request with sub privileges restricted to one channel
        and configure the token without a client ID (anonymous) */
    tokenParams = {};
  }
  const ably = new Ably.Rest({
    key: process.env.ABLY_API_KEY,
  });
  ably.auth.createTokenRequest(tokenParams, null, (err, tokenRequest) => {
    /* tokenRequest => {
         "capability": "{\"*\":[\"*\"]}",
         "clientId": "client@example.com",
         "keyName": "{{API_KEY_NAME}}",
         "nonce": "5576521221082658",
         "timestamp": {{MS_SINCE_EPOCH}},
         "mac": "GZRgXssZDCegRV....EXAMPLE"
       } */
    res.send(tokenRequest);
  });
};

module.exports = createAuthToken;
