import cors from "@fastify/cors"
import Fastify from "fastify"
import { z } from "zod"
import { storageGet } from "./storage.js"

const UserInfo = z.object({
  sub: z.string().min(1),
  email: z.string().min(1),
})
type TUserInfo = z.infer<typeof UserInfo>

const server = Fastify({})
await server.register(cors, {})

server.post("/api/login", async (request, reply) => {
  if (!request.headers.authorization) return reply.code(400)
  const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${request.headers.authorization}`)

  let userInfo: TUserInfo
  try {
    userInfo = UserInfo.parse(await response.json())
  } catch {
    return reply.code(401)
  }

  const userData = await storageGet(`/${userInfo.sub}`)
  if (!userData) return {}
  return userData
})

const start = async () => {
  try {
    await server.listen({ port: 3000 })
    console.log("server started")
  } catch (error) {
    console.error(error)
  }
}

void start()
