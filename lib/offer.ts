/** Source unique : prix, VSL, FAQ, formulations validables avec le client. */
export const offerConfig = {
  regularPrice: 97,
  launchPrice: 47,
  discountPercent: 0,
  guaranteeDays: 14,
  /** Affichage hero / trust : éviter d’attribuer une note produit non sourcée */
  ratingDisplay: '4.9/5',
  trustSocialProofLine: 'Méthode suivie par +100k abonnés sur YouTube',
  vslUrl: 'https://www.youtube.com/watch?v=Wa4Xu9uZMS0',
  vslYoutubeId: 'Wa4Xu9uZMS0',
  /** CTA secondaire : ancre ou URL de paiement */
  checkoutUrl: 'https://guide.maths-ultime.fr/paiement' as string,
  workHours: 300,
  /** Deadline du compte à rebours (ISO 8601). Laissez vide pour +48h dynamique. */
  countdownTarget: '2026-05-23T00:00:00',
  /** Promesse qualifiée (objectif pédagogique, pas garantie de note) */
  promiseQualified:
    'Objectif : viser 15/20 en maths en révisant plus intelligemment (sans tourner en rond pendant des heures).',
  promiseShort: "Comprends avant d’apprendre — méthode visuelle pour le lycée.",
  midCtaLine:
    "+300h de conception pour expliquer le programme du lycée si simplement qu'un singe le comprendrait.",
} as const;

export const faqItems = [
  {
    q: "J'ai pas le temps, j'ai trop de devoirs.",
    a: "Justement : l'objectif est de te faire gagner du temps. Une vidéo courte peut remplacer des heures de révision dans le vide quand tu comprends enfin la logique qu'il y a derrière ton cours.",
  },
  {
    q: 'Ça sert à rien je suis vraiment trop nul en maths.',
    a: "Au contraire ! Le guide est pensé pour repartir du blocage : aucune formule, des schémas visuels, et de la logique. On reconstruit le fil étape par étape.",
  },
  {
    q: "C'est aligné sur le programme officiel au moins ?",
    a: "Totalement, le socle couvre tout le programme du lycée, de la seconde à la terminale, et bientôt même l'option Maths Expertes. La structure est simplement réorganisée pour être encore plus efficace que le parcours \"classique\".",
  },
  {
    q: "C'est un abonnement ?",
    a: "Non : paiement unique. Tu gardes l'accès au contenu du guide après achat, et à toutes les futures améliorations du guide, même quand le prix augmentera.",
  },
  {
    q: 'Et si ça ne me convient pas ?',
    a: `Tu as ${offerConfig.guaranteeDays} jours pour tester. Si le contenu ne te convient pas, tu nous envoies un mail et on gère ça !`,
  },
] as const;

/** hqdefault est plus fiable que maxres (toujours servi par YouTube). */
export function getYouTubeThumbnailUrl(videoId: string, quality: 'maxres' | 'hq' = 'hq') {
  if (quality === 'maxres') {
    return `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
  }
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}
