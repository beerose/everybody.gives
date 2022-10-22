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

  if (memberInfo.drawResult) {
    return { error: 'You already have a person' }
  }

  const availableMembers = await db.groupMember.findMany({
    where: {
      name: { not: memberName },
      drawResult: null,
      group: {
        name: groupName,
      },
    },
  })

  if (availableMembers.length === 0) {
    return { error: 'No more people to draw' }
  }

  const result = availableMembers.filter((m) => !memberInfo.cannotDraw.includes(m.name))[
    Math.floor(Math.random() * availableMembers.length)
  ]

  if (!result) {
    return { error: 'No more people to draw' }
  }

  await db.groupMember.update({
    where: {
      id: result.id,
    },
    data: {
      drawResult: memberName,
    },
  })

  return { result: result.name }
})
