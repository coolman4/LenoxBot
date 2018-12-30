const LenoxCommand = require('../LenoxCommand.js');

module.exports = class welcomemsgCommand extends LenoxCommand {
	constructor(client) {
		super(client, {
			name: 'welcomemsg',
			group: 'administration',
			memberName: 'welcomemsg',
			description: 'Sets a welcome message to greet your users',
			format: 'welcomemsg {welcome msg}',
			aliases: [],
			examples: ['welcomemsg Hello $username$, welcome on the $servername$ discord-server!'],
			clientPermissions: ['SEND_MESSAGES'],
			userPermissions: ['ADMINISTRATOR'],
			shortDescription: 'XP',
			dashboardsettings: true
		});
	}

	async run(msg) {
		const langSet = msg.client.provider.getGuild(msg.message.guild.id, 'language');
		const lang = require(`../../languages/${langSet}.json`);
		const args = msg.content.split(' ').slice(1);

		const content = args.slice().join(' ');

		if (!content) return msg.channel.send(lang.welcomemsg_error);

		await msg.client.provider.setGuild(msg.message.guild.id, 'welcomemsg', content);

		return msg.channel.send(lang.welcomemsg_set);
	}
};