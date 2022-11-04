import { z } from "zod"
import { TBooksData } from "./views.js"

const ImageModule = z.object({
  default: z.string().min(1),
})

const bookNames: Record<string, string> = {
  // Mistborn
  tfe: "The Final Empire",
  woa: "Well of Ascension",
  hoa: "Hero of Ages",
  aol: "Allow of Law",
  sos: "Shadows of Self",
  bom: "Bands of Mourning",
  sh: "Mistborn: Secret History",
  tlm: "The Lost Metal",
  // The Stormlight Archive
  wok: "The Way of Kings",
  wor: "Words of Radiance",
  ed: "Edgedancer",
  ob: "Oathbringer",
  ds: "Dawnshard",
  row: "Rhythm of War",
  // Standalones / Novellas
  elantris: "Elantris",
  tes: "The Emperor's Soul",
  wb: "Warbreaker",
  sfs: "Shadows for Silence",
  sotd: "Sixth of the Dusk",
  au: "Arcanum Unbounded",
  // White Sand
  ws1: "White Sand Vol. 1",
  ws2: "White Sand Vol. 2",
  ws3: "White Sand Vol. 3",
}

const defaultBooksData: TBooksData = {}

const imageModules = import.meta.glob("/book_covers/**/*")
for (const [path, imageModule] of Object.entries(imageModules)) {
  const file = path.slice(path.lastIndexOf("/") + 1)
  const key = file.slice(0, file.lastIndexOf(".")) || file

  const name = bookNames[key] ?? ""
  const { default: coverUrl } = ImageModule.parse(await imageModule())

  defaultBooksData[key] = {
    shortName: key,
    name,
    coverUrl,
    isRead: false,
    ownedFormats: [],
  }
}

export default defaultBooksData
