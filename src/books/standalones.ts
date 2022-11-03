import auCoverUrl from "/book_covers/standalones/au.webp"
import elantrisCoverUrl from "/book_covers/standalones/elantris.webp"
import sfsCoverUrl from "/book_covers/standalones/sfs.webp"
import sotdCoverUrl from "/book_covers/standalones/sotd.webp"
import tesCoverUrl from "/book_covers/standalones/tes.webp"
import wbCoverUrl from "/book_covers/standalones/wb.webp"

const books = {
  elantris: {
    name: "Elantris",
    coverUrl: elantrisCoverUrl,
  },
  tes: {
    name: "The Emperor's Soul",
    coverUrl: tesCoverUrl,
  },
  wb: {
    name: "Warbreaker",
    coverUrl: wbCoverUrl,
  },
  sfs: {
    name: "Shadows for Silence",
    coverUrl: sfsCoverUrl,
  },
  sotd: {
    name: "Sixth of the Dusk",
    coverUrl: sotdCoverUrl,
  },
  au: {
    name: "Arcanum Unbounded",
    coverUrl: auCoverUrl,
  },
}

export default books
