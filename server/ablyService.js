const Ably = require('ably');

class AblyService {
  constructor() {
    this.client = new Ably.Realtime(process.env.ABLY_API_KEY);
  }

  subscribe(channelName, callback) {
    const channel = this.client.channels.get(channelName);
    channel.subscribe(callback);
  }

  
}

// Create a single instance of the AblyService
const ablyService = new AblyService();

module.exports = ablyService;
