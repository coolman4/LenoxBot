const LenoxCommand = require('../LenoxCommand.js');

module.exports = class toggleannounceCommand extends LenoxCommand {
	constructor(client) {
		super(client, {
			name: 'toggleannounce',
			group: 'administration',
			memberName: 'toggleannounce',
			description: 'Sets a channel for announcements, where you can use the announce-command',
			format: 'toggleannounce',
			aliases: [],
			examples: ['toggleannounce'],
			clientPermissions: ['SEND_MESSAGES'],
			userPermissions: ['ADMINISTRATOR'],
			shortDescription: 'Announcements',
			dashboardsettings: true
		});
	}

	async run(msg) {
		const langSet = msg.client.provider.getGuild(msg.message.guild.id, 'language');
		const lang = require(`../../languages/${langSet}.json`);

		const channelid = msg.channel.id;
		if (msg.client.provider.getGuild(msg.message.guild.id, 'announce') === 'false') {
			await msg.client.provider.setGuild(msg.message.guild.id, 'announce', 'true');
			await msg.client.provider.setGuild(msg.message.guild.id, 'announcechannel', channelid);

			const channelset = lang.toggleannounce_channelset.replace('%channelname', `**#${msg.channel.name}**`);
			return msg.channel.send(channelset);
		}
		await msg.client.provider.setGuild(msg.message.guild.id, 'announce', 'false');

		return msg.channel.send(lang.toggleannounce_channeldeleted);
	}
};