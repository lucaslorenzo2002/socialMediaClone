const ChatsUsersDAO = require('../database/chats_users');
const UsersApi = require('../services/users');

class ChatsApi{
	constructor(){
		this.chatsUsersDAO = new ChatsUsersDAO();
		this.usersApi = new UsersApi();
	}

	async createChat(user1Id, user2Id){
		return await this.chatsUsersDAO.createChatUser(user1Id, user2Id);
	}

	async getMyChats(userId){
		const withWhoIAmChattingId = await this.chatsUsersDAO.getWithWhoIAmChatting(userId);
		const withWhoIAmChattingUser = await this.usersApi.getUsersById(withWhoIAmChattingId[0]);

		return withWhoIAmChattingUser.map(({id, profile_photo, username, full_name}) => (
			{	
				id, 
				profile_photo, 
				username, 
				full_name, 
				chat_id: withWhoIAmChattingId[1][withWhoIAmChattingUser.findIndex(user => user.id === id)]
			}
		));
	} 

	async getChatUsers(chatId){
		return await this.chatsUsersDAO.getUsersInChat(chatId);
	}

}
module.exports = ChatsApi;