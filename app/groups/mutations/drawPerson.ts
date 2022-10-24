import { resolver } from '@blitzjs/rpc'
import db from 'db'
import { DrawPersonInput } from '../validations'

export default resolver.pipe(resolver.zod(DrawPersonInput), async ({ memberName, groupName }, ctx) => {
  const memberInfo = await db.groupMember.findFirst({
    where: {
      name: memberName,
      group: {
        name: groupName,
      },
    },
  })

  if (!memberInfo) {
    throw new Error('Member not found')
  }

  const availableMembers = (await db.groupMember.findMany({
    where: {
      name: { not: memberName },
      selectedBy: null,
      group: {
        name: groupName,
      },
    },
  })).filter((m) => !memberInfo.cannotDraw.includes(m.name))

  if (availableMembers.length === 0) {
    return { error: 'Oops, it looks like there are no more people to draw 😬. Contact your group\'s admin.' }
  }

  const result = availableMembers[Math.floor(Math.random() * availableMembers.length)]

  if (!result) {
    return { error: 'No more people to draw' }
  }

  try {
    await db.groupMember.update({
      where: {
        id: result.id,
      },
      data: {
        selectedBy: memberName,
      },
    })
    return { result: result.name }
  } catch (e) {
    if (e.code === "P2002" && e.meta?.target?.includes("selectedBy")) {
      return { error: 'Oops, it looks like you have your person 😬. Ask your group\'s admin if you forgot who it was!' }
    }
    throw e
  }
})
