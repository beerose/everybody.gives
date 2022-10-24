import { resolver } from '@blitzjs/rpc';
import { AuthorizationError } from 'blitz';
import db from 'db';
import { GetGroupInput } from '../validations';

export default resolver.pipe(resolver.zod(GetGroupInput), async ({ groupName }, ctx) => {
  const privateData = await ctx.session.$getPrivateData();
	if (!privateData.groupName || privateData.groupName !== groupName) {
		throw new AuthorizationError()
	}
	
	const group = await db.group.findFirst({ where: { name: groupName }, select: { members: true } });

	return group?.members.map(m => m.name);
});
