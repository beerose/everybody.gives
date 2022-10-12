import { SecurePassword } from '@blitzjs/auth';
import { resolver } from '@blitzjs/rpc';
import db from 'db';
import { CreateGroupInput } from '../validations';

export default resolver.pipe(
	resolver.zod(CreateGroupInput),
	async ({ name, password, members, createdBy, eventName, description }, ctx) => {
		const hashedPassword = await SecurePassword.hash(password.trim());

		const group = await db.group.create({
			data: {
				name,
				createdBy,
				eventName,
				description,
				hashedPassword,
				members: {
					createMany: {
						data: [ { name: createdBy }, ...members ].map((m) => ({
							name: m.name,
							constraints: m.constraints
						}))
					}
				}
			},
			select: { id: true, name: true, members: { select: { id: true } } }
		});

		return group;
	}
);
