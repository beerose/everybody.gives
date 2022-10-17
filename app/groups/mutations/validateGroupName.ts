import { resolver } from '@blitzjs/rpc';
import db from 'db';
import * as z from 'zod';

export default resolver.pipe(resolver.zod(z.object({ name: z.string() })), async ({ name }) => {
	const group = await db.group.findFirst({ where: { name } });

	if (group) {
		return { name: 'Group name already exists' };
	}

	return {};
});
