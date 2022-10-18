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
      constraints: z.array(z.string()).optional(),
    }),
  ),
})

export const CreateGroupInput = CreateGroupBasicInfo.merge(CreateGroupMembersInfo)

export const GetGroupInput = z.object({
  groupName: z.string(),
})

export const DrawPersonInput = z.object({
  groupName: z.string(),
  memberName: z.string(),
})
