import aolCoverUrl from "/book_covers/mistborn/aol.webp"
import bomCoverUrl from "/book_covers/mistborn/bom.webp"
import hoaCoverUrl from "/book_covers/mistborn/hoa.webp"
import shCoverUrl from "/book_covers/mistborn/sh.webp"
import sosCoverUrl from "/book_covers/mistborn/sos.webp"
import tfeCoverUrl from "/book_covers/mistborn/tfe.webp"
import tlmCoverUrl from "/book_covers/mistborn/tlm.webp"
import woaCoverUrl from "/book_covers/mistborn/woa.webp"

const books = {
  tfe: {
    name: "The Final Empire",
    coverUrl: tfeCoverUrl,
  },
  woa: {
    name: "Well of Ascension",
    coverUrl: woaCoverUrl,
  },
  hoa: {
    name: "Hero of Ages",
    coverUrl: hoaCoverUrl,
  },
  aol: {
    name: "Allow of Law",
    coverUrl: aolCoverUrl,
  },
  sos: {
    name: "Shadows of Self",
    coverUrl: sosCoverUrl,
  },
  bom: {
    name: "Bands of Mourning",
    coverUrl: bomCoverUrl,
  },
  sh: {
    name: "Mistborn: Secret History",
    coverUrl: shCoverUrl,
  },
  tlm: {
    name: "The Lost Metal",
    coverUrl: tlmCoverUrl,
  },
}

export default books
