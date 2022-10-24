import { resolver } from '@blitzjs/rpc';
import db from 'db';
import { GetGroupInput } from '../validations';

export default resolver.pipe(resolver.zod(GetGroupInput), resolver.authorize(), async ({ groupName }) => {
	const group = await db.group.findFirst({ where: { name: groupName }, include: { members: true } });

	return group;
});
