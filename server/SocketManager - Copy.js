

const { VERIFY_USER, USER_CONNECTED, USER_DISCONNECTED,
	LOGOUT, COMMUNITY_CHAT, MESSAGE_RECIEVED, MESSAGE_SENT,
	TYPING, PRIVATE_MESSAGE } = require('../client/src/Events')

const { createUser, createMessage, createChat } = require('../client/src/Factories')

let connectedUsers = {}

let communityChat = createChat()

module.exports = function (socket) {
	const io = require('./index.js');



	console.log("Socket Id:" + socket.id);

	let sendMessageToChatFromUser;

	let sendTypingFromUser;


	socket.on(VERIFY_USER, (nickname, callback) => {

		if (connectedUsers, nickname) {
			callback({ user: null });
		} else {
			callback({ user: createUser({ name: nickname, socketId: socket.id }) });
		}
	})


	socket.on(USER_CONNECTED, (user) => {
		console.log('I am in the socket.on');
		user.socketId = socket.id;
		connectedUsers = addUser(connectedUsers, user);
		socket.user = user;

		sendMessageToChatFromUser = sendMessageToChat(user.name);
		sendTypingFromUser = sendTypingToChat(user.name);

		io.emit(USER_CONNECTED, connectedUsers);
		console.log(connectedUsers);

	})


	socket.on('disconnect', () => {
		if ("user" in socket) {
			connectedUsers = removeUser(connectedUsers, socket.user.name);

			io.emit(USER_DISCONNECTED, connectedUsers);
			console.log("Disconnect", connectedUsers);
		}
	})



	socket.on(LOGOUT, () => {
		connectedUsers = removeUser(connectedUsers, socket.user.name);
		io.emit(USER_DISCONNECTED, connectedUsers);
		console.log("Disconnect", connectedUsers);

	})

	//Get Community Chat
	socket.on(COMMUNITY_CHAT, (callback) => {
		callback(communityChat);
	})

	socket.on(MESSAGE_SENT, ({ chatId, message }) => {
		sendMessageToChatFromUser(chatId, message);
	})

	socket.on(TYPING, ({ chatId, isTyping }) => {
		sendTypingFromUser(chatId, isTyping);
	})

	socket.on(PRIVATE_MESSAGE, ({ receiver, sender }) => {
		if (receiver in connectedUsers) {
			const newChat = createChat({ name: `${receiver}&${sender}`, users: [receiver, sender] })
			const receiverSocket = connectedUsers[receiver].socketId
			socket.to(receiverSocket).emit(PRIVATE_MESSAGE, newChat)
			socket.emit(PRIVATE_MESSAGE, newChat)
		}
	})

}


function sendTypingToChat(user) {
	return (chatId, isTyping) => {
		io.emit(`${TYPING}-${chatId}`, { user, isTyping })
	}
}


function sendMessageToChat(sender) {
	return (chatId, message) => {
		io.emit(`${MESSAGE_RECIEVED}-${chatId}`, createMessage({ message, sender }))
	}
}


function addUser(userList, user) {
	let newList = Object.assign({}, userList)
	newList[user.name] = user
	return newList
}


function removeUser(userList, username) {
	let newList = Object.assign({}, userList)
	delete newList[username]
	return newList
}


function isUser(userList, username) {
	return username in userList
}