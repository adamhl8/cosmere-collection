import cors from "@fastify/cors"
import Fastify from "fastify"
import { z } from "zod"
import storage, { storageGet } from "./storage.js"

const server = Fastify({})
await server.register(cors, { exposedHeaders: "userid" })

const LoginData = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
})
type TLoginData = z.infer<typeof LoginData>

server.post("/api/register", async (request, reply) => {
  let registerData: TLoginData

  try {
    registerData = LoginData.parse(request.body)
  } catch {
    return reply.code(400).send()
  }

  const { email, password } = registerData

  const userEmail = await storageGet<string>(`/${email}`)
  if (userEmail) return reply.code(409).send()

  await storage.push(`/${email}/password`, password)
  await storage.push(`/${email}/data`, {})
})

server.post("/api/login", async (request, reply) => {
  let loginData: TLoginData

  try {
    loginData = LoginData.parse(request.body)
  } catch {
    return reply.code(400).send()
  }

  const { email, password } = loginData

  const userEmail = await storageGet<string>(`/${email}`)
  if (!userEmail) return reply.code(404).send()

  const userPassword = await storageGet<string>(`/${email}/password`)
  if (password !== userPassword) return reply.code(401).send()

  return await storageGet(`/${email}/data`)
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
  const userEmail = request.headers.useremail
  if (!userEmail || typeof userEmail !== "string") return reply.code(400).send()

  const bookUpdate = BookUpdate.parse(request.body)
  const shortName = Object.keys(bookUpdate)[0]
  if (!shortName) return reply.code(400).send()

  await storage.push(`/${userEmail}/data/${shortName}/isRead`, bookUpdate[shortName]?.isRead)
})

server.patch("/api/updateOwnedFormats", async (request, reply) => {
  const userEmail = request.headers.useremail
  if (!userEmail || typeof userEmail !== "string") return reply.code(400).send()

  const bookUpdate = BookUpdate.parse(request.body)
  const shortName = Object.keys(bookUpdate)[0]
  if (!shortName) return reply.code(400).send()

  await storage.push(`/${userEmail}/data/${shortName}/ownedFormats`, bookUpdate[shortName]?.ownedFormats)
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
