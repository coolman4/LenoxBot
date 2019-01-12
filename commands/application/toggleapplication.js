const LenoxCommand = require('../LenoxCommand.js');

module.exports = class toggleapplicationCommand extends LenoxCommand {
	constructor(client) {
		super(client, {
			name: 'toggleapplication',
			group: 'application',
			memberName: 'toggleapplication',
			description: 'Toggles the applications on or off',
			format: 'toggleapplication',
			aliases: [],
			examples: ['toggleapplication'],
			clientPermissions: ['SEND_MESSAGES'],
			userPermissions: ['ADMINISTRATOR'],
			shortDescription: 'Settings',
			dashboardsettings: true
		});
	}

	async run(msg) {
		const langSet = msg.client.provider.getGuild(msg.message.guild.id, 'language');
		const lang = require(`../../languages/${langSet}.json`);

		if (msg.client.provider.getGuild(msg.message.guild.id, 'application').status === 'false') {
			const currentApplication = msg.client.provider.getGuild(msg.message.guild.id, 'application');
			currentApplication.status = 'true';
			await msg.client.provider.setGuild(msg.message.guild.id, 'application', currentApplication);

			return msg.channel.send(lang.toggleapplication_activated);
		}
		const currentApplication = msg.client.provider.getGuild(msg.message.guild.id, 'application');
		currentApplication.status = 'false';
		await msg.client.provider.setGuild(msg.message.guild.id, 'application', currentApplication);

		return msg.channel.send(lang.toggleapplication_disabled);
	}
};