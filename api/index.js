const { JOIN_CHANNEL, LEAVE_CHANNEL, BROADCAST_OPEN_CHANNELS } = require('./_types.config');
const WebSocketServer = require('websocket').server;
const http = require('http');

const CHANNEL_FULL_ERROR = { error: 'CHANNEL_FULL' };
const CHANNEL_NOT_DEFINED_ERROR = { error: 'CHANNEL_NOT_DEFINED' };
const NO_FREE_CHANNELS_ERROR = { error: 'NO_FREE_CHANNELS_ERROR'};

const CHANNELS = new Map();
const CONNECTIONS = new Set();

const server = http.createServer(({ response }) => {
    response.writeHead(404);
    response.end();
});

server.listen(4000, () => console.log('API is up an running at port 4000'));

const WS_SERVER = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});

const whitelist = ['http://localhost:4200'];
const isValidOrigin = origin => whitelist.includes(origin);

// Connection helpers
const addConnection = (connection) => {
  if (!CONNECTIONS.has(connection)) {
    CONNECTIONS.add(connection);
  }
}

const removeConnection = (connection) => {
  if (CONNECTIONS.has(connection)) {
    CONNECTIONS.delete(connection);
  }
}

const broadcastOpenChannels = (connection = null) => {
  const openChannels = Array.from(CHANNELS)
    .filter(([channelName, channel]) => channel.connections.size < channel.maxSize)
    .map(([channelName, channel]) => channelName);

  const message = {
    type: BROADCAST_OPEN_CHANNELS,
    payload: { openChannels }
  };

  if (connection) {
    connection.send(JSON.stringify(message));
  } else {
    CONNECTIONS.forEach((connection) => connection.send(JSON.stringify({ message })));
  }
};

const isJoinChannelEvent = message =>
    (message.type && message.payload && message.type === JOIN_CHANNEL)

const isLeaveChannelEvent = message =>
    (message.type && message.type === LEAVE_CHANNEL)

const leaveAllChannels = (connection) => {
  CHANNELS.forEach((x, channelName) => leaveChannel(channelName, connection));
}

const leaveChannel = (channelName, connection) => {
    const { channel, error } = getChannelByName(channelName);
    if (error) {
      return connection.send(getError(channelName, error));
    }
    channel.connections.delete(connection);
    if (channel.connections.size === 0) {
      CHANNELS.delete(channel);
    }
}
const getChannel = (channelConfig) => {
    if (!CHANNELS.has(channelConfig.name)) {
        CHANNELS.set(channelConfig.name, {
            connections: new Set(),
            ...channelConfig
        });
    }
    return CHANNELS.get(channelConfig.name);
};
const joinChannel = (message, connection) => {
    let channel = getChannel(message.payload);
    if (channel.connections.size === channel.maxSize) {
        return CHANNEL_FULL_ERROR;
    }
    channel.connections.add(connection);
    return { channel };
}
const getChannelByName = channelName => {
  const channel = CHANNELS.get(channelName);
  if (!channel) {
    return CHANNEL_NOT_DEFINED_ERROR;
  }
  return { channel };
};

const getFirstFreeChannel = () => {
  const channel = CHANNELS.find((channel) => channel.size === 1);
  if (!channel) {
    return NO_FREE_CHANNELS_ERROR;
  }

  return { channel };
}

const getError = (channelName, error) => JSON.stringify({
    channel: { name: channelName },
    ...error
})

WS_SERVER.on('request', request => {
    if (!isValidOrigin(request.origin)) {
        request.reject();
        return;
    };
    const connection = request.accept('echo-protocol', request.origin);
    addConnection(connection);
    broadcastOpenChannels(connection);
    // Broadcast incoming messages back to other connections on channel
    // First connection to send a JOIN_CHANNEL message, creates the channel
    connection.on('message', (data) => {
        const { message, channelName, meta = {} } = JSON.parse(data.utf8Data);

        if (isJoinChannelEvent(message)) {
          let { error } = joinChannel(message, connection);
          broadcastOpenChannels();
          if (error) {
              return connection.send(getError(channelName, error));
          }
        }

        if (isLeaveChannelEvent(message)) {
          leaveChannel(channelName, connection);
        }

        const { error, channel } = getChannelByName(channelName);
        if (error) {
          return connection.send(getError(channelName, error));
        }
        Array.from(channel.connections)
            .filter(con => con !== connection)
            .forEach(con => con.send(JSON.stringify({
                    message, meta,
                    channel: {
                        size: channel.connections.size,
                        name: channelName
                    }
                }
            )));
    });

    connection.on('close', () => {
      leaveAllChannels(connection);
      removeConnection(connection);
    });
});
