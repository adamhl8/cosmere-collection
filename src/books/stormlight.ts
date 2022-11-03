import dsCoverUrl from "/book_covers/stormlight/ds.webp"
import edCoverUrl from "/book_covers/stormlight/ed.webp"
import obCoverUrl from "/book_covers/stormlight/ob.webp"
import rowCoverUrl from "/book_covers/stormlight/row.webp"
import wokCoverUrl from "/book_covers/stormlight/wok.webp"
import worCoverUrl from "/book_covers/stormlight/wor.webp"

const books = {
  wok: {
    name: "The Way of Kings",
    coverUrl: wokCoverUrl,
  },
  wor: {
    name: "Words of Radiance",
    coverUrl: worCoverUrl,
  },
  ed: {
    name: "Edgedancer",
    coverUrl: edCoverUrl,
  },
  ob: {
    name: "Oathbringer",
    coverUrl: obCoverUrl,
  },
  ds: {
    name: "Dawnshard",
    coverUrl: dsCoverUrl,
  },
  row: {
    name: "Rhythm of War",
    coverUrl: rowCoverUrl,
  },
}

export default books
