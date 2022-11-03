import fg from "fast-glob"
import { mkdir } from "node:fs/promises"
import sharp from "sharp"

const entries = await fg("./book_covers_full/**/*", { objectMode: true })

for (const entry of entries) {
  const path = entry.path.slice(0, entry.path.lastIndexOf("/"))
  const outPath = path.replace("book_covers_full", "book_covers")
  const outFileName = entry.name.slice(0, entry.name.lastIndexOf(".")) || entry.name
  const outFullPath = `${outPath}/${outFileName}.webp`

  await mkdir(outPath, { recursive: true })
  sharp(entry.path).webp().resize(300).toFile(outFullPath)
}
