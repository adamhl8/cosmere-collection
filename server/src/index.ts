import cors from "@fastify/cors"
import Fastify from "fastify"
import { z } from "zod"
import storage, { storageGet } from "./storage.js"

const UserInfo = z.object({
  sub: z.string().min(1),
  email: z.string().min(1),
})
type TUserInfo = z.infer<typeof UserInfo>

const server = Fastify({})
await server.register(cors, { exposedHeaders: "userid" })

server.post("/api/login", async (request, reply) => {
  if (!request.headers.authorization) return await reply.code(400)
  const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${request.headers.authorization}`)

  let userInfo: TUserInfo
  try {
    userInfo = UserInfo.parse(await response.json())
  } catch {
    return await reply.code(401)
  }

  const userData = await storageGet(`/${userInfo.sub}`)
  if (!userData) return await reply.header("userid", userInfo.sub).send({})
  return await reply.header("userid", userInfo.sub).send(userData)
})

const BookUpdate = z.record(
  z.string().min(1),
  z
    .object({
      isRead: z.boolean(),
      ownedFormats: z.string().array(),
    })
    .partial(),
)

server.patch("/api/updateIsRead", async (request, reply) => {
  if (!request.headers.userid || typeof request.headers.userid !== "string") return await reply.code(400)

  const userId = request.headers.userid
  const bookUpdate = BookUpdate.parse(request.body)
  const shortName = Object.keys(bookUpdate)[0]
  if (!shortName) return await reply.code(400)

  await storage.push(`/${userId}/${shortName}/isRead`, bookUpdate[shortName]?.isRead)

  return await reply.code(200)
})

server.patch("/api/updateOwnedFormats", async (request, reply) => {
  if (!request.headers.userid || typeof request.headers.userid !== "string") return await reply.code(400)

  const userId = request.headers.userid
  const bookUpdate = BookUpdate.parse(request.body)
  const shortName = Object.keys(bookUpdate)[0]
  if (!shortName) return await reply.code(400)

  await storage.push(`/${userId}/${shortName}/ownedFormats`, bookUpdate[shortName]?.ownedFormats)

  return await reply.code(200)
})

const start = async () => {
  try {
    await server.listen({ port: 3000, host: "0.0.0.0" })
    console.log("server started")
  } catch (error) {
    console.error(error)
  }
}

void start()
