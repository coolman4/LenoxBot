const LenoxCommand = require('../LenoxCommand.js');

module.exports = class addchatfilterCommand extends LenoxCommand {
	constructor(client) {
		super(client, {
			name: 'addchatfilter',
			group: 'administration',
			memberName: 'addchatfilter',
			description: 'Inserts a new entry in the chat filter',
			format: 'addchatfilter {word}',
			aliases: [],
			examples: ['addchatfilter bitch', 'addchatfilter idiot'],
			clientPermissions: ['SEND_MESSAGES'],
			userPermissions: ['ADMINISTRATOR'],
			shortDescription: 'Chatfilter',
			dashboardsettings: true
		});
	}

	async run(msg) {
		const langSet = msg.client.provider.getGuild(msg.message.guild.id, 'language');
		const lang = require(`../../languages/${langSet}.json`);
		const args = msg.content.split(' ').slice(1);

		const input = args.slice();

		if (input.length !== 1) return msg.channel.send(lang.addchatfilter_error);

		if (!msg.client.provider.getGuild(msg.message.guild.id, 'chatfilter')) {
			await msg.client.provider.setGuild(msg.message.guild.id, 'chatfilter', {
				chatfilter: 'false',
				array: []
			});
		}

		for (let i = 0; i < msg.client.provider.getGuild(msg.message.guild.id, 'chatfilter').array.length; i++) {
			if (input.join(' ').toLowerCase() === msg.client.provider.getGuild(msg.message.guild.id, 'chatfilter').array[i].toLowerCase()) return msg.channel.send(lang.addchatfilter_already);
		}

		const currentChatfilter = msg.client.provider.getGuild(msg.message.guild.id, 'chatfilter');
		currentChatfilter.array.push(input.join(' ').toLowerCase());
		await msg.client.provider.setGuild(msg.message.guild.id, 'chatfilter', currentChatfilter);

		const added = lang.addchatfilter_added.replace('%input', input.join(' '));
		msg.channel.send(added);
	}
};