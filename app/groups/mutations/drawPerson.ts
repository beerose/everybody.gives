import { resolver } from '@blitzjs/rpc'
import db from 'db'
import { DrawPersonInput } from '../validations'

export default resolver.pipe(resolver.zod(DrawPersonInput), async ({ memberName, groupName }, ctx) => {
  const existingResult = await db.groupMember.count({
    where: {
      drawResult: memberName,
      group: {
        name: groupName,
      },
    },
  })

  if (existingResult !== 0) {
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

  const result = availableMembers[Math.floor(Math.random() * availableMembers.length)]

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
