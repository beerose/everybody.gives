import { SecurePassword } from "@blitzjs/auth"
import { resolver } from "@blitzjs/rpc"
import { AuthenticationError, AuthorizationError } from "blitz"
import db from "db"
import { z } from "zod"
import { Login } from "../validations"

export const authenticateGroup = async (rawGroupName: string, rawPassword: string) => {
  const { password, groupName } = Login.parse({ groupName: rawGroupName, password: rawPassword })
  const group = await db.group.findFirst({ where: { name: groupName } })
  if (!group) throw new AuthenticationError()

  const result = await SecurePassword.verify(group.hashedPassword, password)

  if (result === SecurePassword.VALID_NEEDS_REHASH) {
    // Upgrade hashed password with a more secure hash
    const improvedHash = await SecurePassword.hash(password)
    await db.group.update({ where: { name: groupName }, data: { hashedPassword: improvedHash } })
  }

  const { hashedPassword, ...rest } = group
  return rest
}

export default resolver.pipe(resolver.zod(z.object({groupName: z.string(), memberName: z.string()})), async ({ groupName, memberName }, ctx) => {
  const privateData = await ctx.session.$getPrivateData();
	if (!privateData.groupName || privateData.groupName !== groupName) {
		throw new AuthorizationError()
	}
	const password = privateData.password
  // This throws an error if credentials are invalid
  const group = await authenticateGroup(groupName, password)

  const groupMember = await db.groupMember.findFirst({
    where: {
      name: memberName,
      group: {
        name: groupName,
      },
    },
  })

   if (!groupMember) {
    throw new AuthenticationError()
   }

  await ctx.session.$create({ userId: groupMember.id, role: "member", userName: memberName, groupName}, {groupName, password} )

  return group
})
