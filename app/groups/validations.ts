import * as z from 'zod'

export const CreateGroupBasicInfo = z.object({
  name: z.string(),
  password: z.string(),
  eventName: z.string(),
  description: z.string().optional(),
  createdBy: z.string(),
})

export const CreateGroupMembersInfo = z.object({
  allowEdits: z.union([z.boolean(), z.array(z.string())]).default(false),
  members: z.array(
    z.object({
      name: z.string(),
    }),
  ),
})

export const CreateGroupRules = z.object({
  rules: z
    .array(
      z.object({
        person1: z.string(),
        person2: z.string(),
      }),
    )
    .default([]),
})

export const membersRefine = (values, ctx) => {
  if (values.members.length < 3) {
    ctx.addIssue({
      message: 'You have to add at least three group members',
      path: ['members'],
      code: z.ZodIssueCode.too_small,
      inclusive: true,
      minimum: 3,
      type: 'array',
    })
  }
  const members = values.members.map((m) => m.name)
  for (let member of values.members) {
    if (members.filter((m) => m === member.name).length > 1) {
      ctx.addIssue({
        message: `Ooops, looks like you added the same name twice: ${member.name}.`,
        path: ['members'],
        code: z.ZodIssueCode.custom,
      })
    }
  }
  return null
}

export const CreateGroupInput = CreateGroupBasicInfo.merge(CreateGroupMembersInfo)
  .merge(CreateGroupRules)
  .superRefine(membersRefine)

export const GetGroupInput = z.object({
  password: z.string().optional(),
  groupName: z.string(),
})

export const DrawPersonInput = z.object({
  groupName: z.string(),
  memberName: z.string(),
})

export const Login = z.object({
  groupName: z.string(),
  password: z.string(),
})
