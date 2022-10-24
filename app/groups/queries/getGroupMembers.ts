import { resolver } from '@blitzjs/rpc';
import { AuthorizationError } from 'blitz';
import db from 'db';
import { GetGroupInput } from '../validations';

export default resolver.pipe(resolver.zod(GetGroupInput), async ({ groupName }, ctx) => {
  const privateData = await ctx.session.$getPrivateData();
	if (!privateData.groupName || privateData.groupName !== groupName) {
		throw new AuthorizationError()
	}
	
	const members = await db.groupMember.findMany({
		where: {
			group: {
				name: groupName,
			},
		},
		select: {
			name: true,
			selectedBy: true,
		}
	})

	const alreadyHasPerson = members.map((m) => m.selectedBy)

	return members.map((m) => m.name).filter(name => !alreadyHasPerson.includes(name))
});
