const Ably = require('ably');

class AblyService {
  constructor() {
    this.client = new Ably.Realtime(process.env.ABLY_API_KEY);
  }

  // Add methods to interact with Ably as needed
  subscribe(channelName, callback) {
    const channel = this.client.channels.get(channelName);
    channel.subscribe(callback);
  }
}

// Create a single instance of the AblyService
const ablyService = new AblyService();

module.exports = ablyService;
