import { SecurePassword } from '@blitzjs/auth';
import { resolver } from '@blitzjs/rpc';
import db from 'db';
import { CreateGroupInput } from '../validations';

export default resolver.pipe(
	resolver.zod(CreateGroupInput),
	async ({ name, password, members, settings, createdBy }, ctx) => {
		const hashedPassword = await SecurePassword.hash(password.trim());

		const group = await db.group.create({
			data: { name, settings, hashedPassword },
			select: { id: true, name: true }
		});

		for (const member of members) {
			let user = await db.groupMember.create({
				data: {
					name: member.name,
					constraints: member.constraints,
					groupId: group.id
				}
			});
			if (user.name === createdBy) {
				await ctx.session.$setPrivateData({
					groupId: group.id,
					userId: user.id
				});
			}
		}

		console.log(ctx.session.$getPrivateData());

		return group;
	}
);
