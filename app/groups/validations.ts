import * as z from 'zod';

export const GroupSettings = z.object({
	allowEdits: z.union([ z.boolean(), z.array(z.string()) ]).default(false),
	eventDescription: z.string().optional(),
	amount: z.number().optional()
});

export const CreateGroupInput = z.object({
	name: z.string(),
	createdBy: z.string(),
	members: z
		.array(
			z.object({
				name: z.string(),
				constraints: z.array(z.string()).optional()
			})
		)
		.default([]),
	password: z.string(),
	settings: GroupSettings.optional()
});
