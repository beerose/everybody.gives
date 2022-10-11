import * as z from 'zod';

export const CreateGroupInput = z.object({
	name: z.string(),
	eventName: z.string(),
	description: z.string().optional(),
	createdBy: z.string(),
	allowEdits: z.union([ z.boolean(), z.array(z.string()) ]).default(false),
	members: z
		.array(
			z.object({
				name: z.string(),
				constraints: z.array(z.string()).optional()
			})
		)
		.default([]),
	password: z.string()
});

export const GetGroupInput = z.object({
	groupName: z.string()
});
