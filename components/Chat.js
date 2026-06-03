import { useState, useRef, useEffect } from 'react';
import ChatKitty from '@chatkitty/core';
import Image from 'next/image';

const chatkitty = ChatKitty.getInstance(process.env.CHATKITTY_API_KEY);

let channel;

function Chat() {
  const [messages, setMessages] = useState([]);
  const inputRef = useRef('');

  const startChatSession = async (channel) => {
    const channelMessages = await getChannelMessages(channel);
    setMessages(channelMessages);

    const result = chatkitty.startChatSession({
      channel,
      onMessageReceived: (message) => {
        // handle received messages
      },
      onKeystrokesReceived: (keystrokes) => {
        // handle received typing keystrokes
      },
      onTypingStarted: (user) => {
        // handle user starts typing
      },
      onTypingStopped: (user) => {
        // handle user stops typing
      },
      onParticipantEnteredChat: (user) => {
        // handle user who just entered the chat
      },
      onParticipantLeftChat: (user) => {
        // handle user who just left the chat
      },
      onParticipantPresenceChanged: (user) => {
        // handle user who became online, offline, do not disturb, invisible
      },
      onMessageRead: (message, receipt) => {
        // handle read receipt for message
      },
      onMessageUpdated: (message) => {
        // handle message changes
      },
      onChannelUpdated: (channel) => {
        // handle channel changes
      },
    });

    if (result.succeeded) {
      const session = result.session; // Handle session
    }

    if (result.failed) {
      const error = result.error; // Handle error
    }
  };

  const getChannel = async (channelId) => {
    const result = await chatkitty.retrieveChannel(channelId);
    if (result.succeeded) {
      return result.channel; // Handle channel
    }

    if (result.failed) {
      const error = result.error; // Handle error
    }
    return null;
  };

  const startChannel = async () => {
    const channelName = 'dashboard-public-channel-new';
    channel = await getChannel('143481');
    if (channel) {
      await startChatSession(channel);
      return;
    }
    const channelResult = await chatkitty.createChannel({
      type: 'PUBLIC',
      name: channelName,
    });

    if (channelResult.succeeded) {
      channel = channelResult.channel; // Handle channel
      await startChatSession(channel);
    }

    if (channelResult.failed) {
      const error = channelResult.error; // Handle error
    }
  };

  const initialChatkitty = async () => {
    const result = await chatkitty.startSession({
      username: 'weisen.li@hotmail.com',
    });

    if (result.succeeded) {
      const session = result.session; // Handle session
      await startChannel();
    }

    if (result.failed) {
      const error = result.error; // Handle error
    }
  };

  const getChannelMessages = async (channel) => {
    const result = await chatkitty.listMessages({
      channel,
    });

    if (result.succeeded) {
      return result.paginator.items; // Handle messages
    }

    if (result.failed) {
      const error = result.error; // Handle error
      return [];
    }
  };

  useEffect(() => {
    initialChatkitty();
    return () => {
      chatkitty.endSession();
    };
  }, []);

  const sendMessage = async (body) => {
    const result = await chatkitty.sendMessage({
      channel,
      body,
    });

    if (result.succeeded) {
      const message = result.message; // Handle message
      const channelMessages = await getChannelMessages(channel);
      setMessages(channelMessages);
    }

    if (result.failed) {
      const error = result.error; // Handle error
    }
  };

  const handleSendMsg = (event) => {
    event.preventDefault();
    const message = inputRef.current?.value;
    sendMessage(message);
    inputRef.current.value = '';
  };
  return (
    <section className="fixed bg-white p-3 right-0 bottom-0 w-96">
      <h4 className="text-3xl">Chat</h4>
      <section className="overflow-y h-96">
        {messages.reverse().map((m) => {
          return (
            <div className="flex items-center" key={m.id}>
              <Image
                className="rounded-lg"
                src={m.user.displayPictureUrl}
                alt={m.user.displayName}
                width={30}
                height={30}
              />
              <span className="ml-2 border bg-purple-400 text-white p-2 mb-2 inline-block rounded-lg">
                {m.body}
              </span>
            </div>
          );
        })}
      </section>
      <form onSubmit={handleSendMsg} className="flex ">
        <input
          ref={inputRef}
          placeholder="Type Your Message"
          className="flex-1 border rounded-sm p-2"
        />
        <button className="flex-none border rounded-sm p-2">Send</button>
      </form>
    </section>
  );
}

export default Chat;
