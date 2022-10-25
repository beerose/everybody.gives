import { SecurePassword } from '@blitzjs/auth'
import { resolver } from '@blitzjs/rpc'
import db from 'db'
import { CreateGroupInput } from '../validations'

export default resolver.pipe(
  resolver.zod(CreateGroupInput),
  async ({ name, password, members, createdBy, eventName, description, rules }, ctx) => {
    const hashedPassword = await SecurePassword.hash(password.trim())

    const group = await db.group.create({
      data: {
        name,
        createdBy,
        eventName,
        description,
        hashedPassword,
        members: {
          createMany: {
            data: members.map((m) => ({
              name: m.name,
              cannotDraw: rules.filter((rule) => rule.person1 === m.name).map((rule) => rule.person2),
            })),
          },
        },
      },
      select: { id: true, name: true, members: { select: { id: true, name: true } } },
    })

    const adminUser = group.members.find(m => m.name === createdBy)
    if (adminUser) {
      await ctx.session.$create({ userId: adminUser.id, role: "admin", userName: createdBy, groupName: name}, {groupName: name, password} )
    }

    return group
  },
)
