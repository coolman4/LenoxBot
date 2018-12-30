const LenoxCommand = require('../LenoxCommand.js');

module.exports = class removechatfilterCommand extends LenoxCommand {
	constructor(client) {
		super(client, {
			name: 'removechatfilter',
			group: 'administration',
			memberName: 'removechatfilter',
			description: 'Removes words from the chatfilter',
			format: 'removechatfilter {word}',
			aliases: [],
			examples: ['removechatfilter bastard', 'removechatfilter idiot'],
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
		if (input.length !== 1) return msg.channel.send(lang.removechatfilter_error);

		if (!msg.client.provider.getGuild(msg.message.guild.id, 'chatfilter')) {
			await msg.client.provider.setGuild(msg.message.guild.id, 'chatfilter', {
				chatfilter: 'false',
				array: []
			});
		}

		for (let i = 0; i < msg.client.provider.getGuild(msg.message.guild.id, 'chatfilter').array.length; i++) {
			if (input.join(' ').toLowerCase() === msg.client.provider.getGuild(msg.message.guild.id, 'chatfilter').array[i]) {
				const currentChatfilter = msg.client.provider.getGuild(msg.message.guild.id, 'chatfilter');
				currentChatfilter.array.splice(i, 1);
				await msg.client.provider.setGuild(msg.message.guild.id, 'chatfilter', currentChatfilter);

				const removed = lang.removechatfilter_removed.replace('%input', input.join(' '));
				msg.channel.send(removed);
			}
		}
	}
};