import { SecurePassword } from "@blitzjs/auth"
import { resolver } from "@blitzjs/rpc"
import { AuthenticationError } from "blitz"
import db from "db"
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

export default resolver.pipe(resolver.zod(Login), async ({ groupName, password }, ctx) => {
  // This throws an error if credentials are invalid
  const group = await authenticateGroup(groupName, password)

  await ctx.session.$setPrivateData({groupName, password})

  return group
})
