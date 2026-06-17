import Link from 'next/link';
import Image from 'next/image';

const Article = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-10">
    <h2 style={{
      fontFamily: 'var(--font-cinzel)', fontWeight: 700,
      fontSize: 'clamp(13px, 1.5vw, 17px)', color: '#071229',
      textTransform: 'uppercase', letterSpacing: '.1em',
      borderBottom: '2px solid rgba(212,168,83,0.35)',
      paddingBottom: 8, marginBottom: 16,
    }}>
      {title}
    </h2>
    <div style={{ fontFamily: 'var(--font-baloo)', fontSize: 15, color: '#2a3a55', lineHeight: 1.8, fontWeight: 500 }}>
      {children}
    </div>
  </section>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-3">{children}</p>
);

export default function CgvPage() {
  return (
    <main className="min-h-screen" style={{ background: '#FDFBF7' }}>
      {/* Header */}
      <header className="relative overflow-hidden py-14 px-4 text-center"
        style={{ background: 'linear-gradient(180deg, #071229 0%, #0d1b3e 100%)', borderBottom: '3px solid rgba(212,168,83,0.4)' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,transparent,#e8c96a 30%,#EC6426 50%,#e8c96a 70%,transparent)' }} />
        <div className="flex justify-center mb-4">
          <Image src="/chadlogo.jpeg" alt="Maths Ultime" width={40} height={40} className="rounded-full" style={{ border: '2px solid rgba(212,168,83,0.5)' }} />
        </div>
        <p style={{ fontFamily: 'var(--font-cinzel)', fontSize: 11, letterSpacing: '.25em', color: '#D4A853', textTransform: 'uppercase', marginBottom: 8 }}>
          ★ Maths Ultime ★
        </p>
        <h1 style={{ fontFamily: 'var(--font-cinzel)', fontWeight: 900, fontSize: 'clamp(20px,4vw,38px)', color: '#f5ecd4', textTransform: 'uppercase', letterSpacing: '.06em' }}>
          Conditions Générales de Vente
        </h1>
        <p style={{ fontFamily: 'var(--font-baloo)', fontSize: 13, color: 'rgba(245,236,212,0.55)', marginTop: 8 }}>
          ChadScience – Formation « MATHS ULTIME »
        </p>
      </header>

      <div className="mx-auto max-w-2xl px-5 py-14">

        <P>Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre l&apos;entreprise ChadScience et toute personne souscrivant à la formation en ligne « MATHS ULTIME ».</P>

        <Article title="Article 1 – Champ d'application">
          <P>Les présentes CGV s&apos;appliquent à l&apos;ensemble des offres liées à la formation MATHS ULTIME, incluant l&apos;accès aux contenus pédagogiques et aux services associés.</P>
          <P>Toute souscription implique l&apos;acceptation pleine et entière des présentes CGV, sans réserve.</P>
          <P>L&apos;entreprise ChadScience se réserve le droit de modifier les CGV à tout moment. Les CGV applicables sont celles en vigueur à la date de la souscription.</P>
        </Article>

        <Article title="Article 2 – Description du produit">
          <P>La formation MATHS ULTIME comprend :</P>
          <ul className="list-none space-y-1 mb-3" style={{ paddingLeft: 16 }}>
            <li>• Plusieurs heures de contenu éducatif, vulgarisé et expliqué avec une approche pédagogique approfondie</li>
            <li>• Un accès à vie aux contenus de la formation</li>
            <li>• Les mises à jour illimitées des contenus</li>
          </ul>
          <P>Les vidéos sont hébergées et diffusées via la plateforme Stripe.</P>
          <P>L&apos;entreprise ChadScience se réserve le droit de faire évoluer le contenu, les formats et les modalités d&apos;accès, sans que cela n&apos;altère la nature du produit.</P>
        </Article>

        <Article title="Article 3 – Offre et accès">
          <P><strong>Prix :</strong> 97 € (paiement unique)</P>
          <P>Lors de certaines opérations spéciales (notamment en semaine d&apos;ouverture, lorsque cela est précisé), le prix peut être réduit à 47 € (paiement unique).</P>
          <P>L&apos;offre comprend :</P>
          <ul className="list-none space-y-1 mb-3" style={{ paddingLeft: 16 }}>
            <li>• Un accès illimité dans le temps aux 13 vidéos de la formation</li>
            <li>• Les mises à jour illimitées des contenus</li>
          </ul>
          <P>L&apos;offre « accès à vie » confère au client un droit d&apos;accès illimité dans le temps aux contenus de la formation tant que le service, la plateforme associée (Stripe) et l&apos;activité de l&apos;entreprise ChadScience existent.</P>
          <P>Cet accès à vie ne saurait être interprété comme une obligation pour l&apos;entreprise ChadScience de maintenir indéfiniment la formation, la plateforme, les fonctionnalités ou les services associés.</P>
          <P>En cas d&apos;arrêt définitif du service ou de l&apos;activité, aucune indemnité ni remboursement ne pourra être exigé au titre de l&apos;accès à vie.</P>
        </Article>

        <Article title="Article 4 – Commande et conclusion du contrat">
          <P>Le contrat est conclu dès :</P>
          <ul className="list-none space-y-1 mb-3" style={{ paddingLeft: 16 }}>
            <li>• Validation de la commande en ligne</li>
            <li>• Et encaissement du paiement par le processeur de paiement Stripe</li>
          </ul>
          <P>Un email de confirmation est envoyé au client, permettant l&apos;accès aux services.</P>
        </Article>

        <Article title="Article 5 – Tarifs et paiement">
          <P>Les prix sont exprimés en euros (€).</P>
          <P>TVA non applicable, article 293 B du Code général des impôts (franchise en base de TVA).</P>
          <P>Le paiement est effectué via le processeur de paiement Stripe, par les moyens proposés lors de la commande.</P>
          <P>Tout incident de paiement peut entraîner la suspension immédiate de l&apos;accès.</P>
        </Article>

        <Article title="Article 6 – Achat par un mineur">
          <P>La formation MATHS ULTIME s&apos;adresse notamment à des élèves de Terminale, susceptibles d&apos;être mineurs.</P>
          <P>Toute souscription effectuée par un mineur doit être réalisée avec l&apos;accord et sous la responsabilité de son représentant légal (parent ou tuteur). Le représentant légal reconnaît avoir pris connaissance des présentes CGV et en accepter l&apos;ensemble des termes.</P>
        </Article>

        <Article title="Article 7 – Droit de rétractation">
          <P>Conformément à l&apos;article L221-28 du Code de la consommation, le client reconnaît et accepte que :</P>
          <ul className="list-none space-y-1 mb-3" style={{ paddingLeft: 16 }}>
            <li>• L&apos;accès à des contenus numériques fournis immédiatement</li>
            <li>• L&apos;accès à des services en ligne</li>
          </ul>
          <P>entraîne la renonciation expresse au droit de rétractation, dès lors que l&apos;accès est activé après paiement.</P>
          <P>Cette renonciation est formalisée lors de la souscription.</P>
        </Article>

        <Article title="Article 8 – Politique de remboursement">
          <P>Aucun remboursement n&apos;est possible, quel qu&apos;en soit le motif, sauf dans les cas suivants :</P>
          <ul className="list-none space-y-1 mb-3" style={{ paddingLeft: 16 }}>
            <li>• Erreur avérée du processeur de paiement Stripe (double débit, débit erroné, dysfonctionnement technique)</li>
            <li>• Absence manifeste d&apos;amélioration du client malgré une utilisation sérieuse du contenu, attestant que le produit ne lui a été d&apos;aucune aide</li>
          </ul>
          <P>Toute demande de remboursement doit être adressée au support avec justificatifs.</P>
          <P>Contact support : <a href="mailto:chadsciences@maths-ultime.fr" style={{ color: '#EC6426' }}>chadsciences@maths-ultime.fr</a></P>
        </Article>

        <Article title="Article 9 – Accès personnel et usage">
          <P>L&apos;accès à MATHS ULTIME est strictement :</P>
          <ul className="list-none space-y-1 mb-3" style={{ paddingLeft: 16 }}>
            <li>• Personnel</li>
            <li>• Non cessible</li>
            <li>• Non partageable</li>
          </ul>
          <P>Toute tentative de partage de compte, revente ou diffusion non autorisée entraînera une suspension ou résiliation immédiate, sans remboursement.</P>
        </Article>

        <Article title="Article 10 – Obligations de l'entreprise ChadScience">
          <P>L&apos;entreprise ChadScience s&apos;engage à :</P>
          <ul className="list-none space-y-1 mb-3" style={{ paddingLeft: 16 }}>
            <li>• Mettre à disposition les accès aux services</li>
            <li>• Assurer un fonctionnement raisonnable de la plateforme</li>
            <li>• Proposer des contenus dans la limite de ses moyens</li>
          </ul>
          <P>L&apos;entreprise ChadScience est tenue à une obligation de moyens et non de résultat. Aucun résultat personnel, scolaire, professionnel ou financier n&apos;est garanti.</P>
        </Article>

        <Article title="Article 11 – Responsabilité">
          <P>L&apos;entreprise ChadScience ne saurait être tenue responsable :</P>
          <ul className="list-none space-y-1 mb-3" style={{ paddingLeft: 16 }}>
            <li>• Des décisions prises par le client</li>
            <li>• Des résultats obtenus ou non</li>
            <li>• Des interruptions temporaires liées à la maintenance ou à des causes externes</li>
          </ul>
          <P>La responsabilité de l&apos;entreprise ChadScience est limitée, tous préjudices confondus, au montant des sommes encaissées au cours des 12 derniers mois.</P>
        </Article>

        <Article title="Article 12 – Propriété intellectuelle">
          <P>L&apos;ensemble des contenus (vidéos, supports, concepts, marques) est protégé par le droit de la propriété intellectuelle.</P>
          <P>Toute reproduction, diffusion ou exploitation sans autorisation écrite est strictement interdite.</P>
        </Article>

        <Article title="Article 13 – Force majeure">
          <P>L&apos;entreprise ChadScience ne pourra être tenue responsable en cas d&apos;inexécution due à un événement de force majeure tel que reconnu par la jurisprudence française.</P>
        </Article>

        <Article title="Article 14 – Droit applicable et litiges">
          <P>Les présentes CGV sont régies par le droit français.</P>
          <P>En cas de litige, les parties rechercheront une solution amiable avant toute action judiciaire.</P>
          <P>À défaut, les tribunaux compétents seront ceux du ressort du siège social de l&apos;entreprise ChadScience.</P>
        </Article>

        <Article title="Article 15 – Support et contact">
          <P>Pour toute question concernant les présentes CGV :</P>
          <P>Support client : <a href="mailto:chadsciences@maths-ultime.fr" style={{ color: '#EC6426' }}>chadsciences@maths-ultime.fr</a></P>
        </Article>

        <p style={{ fontFamily: 'var(--font-baloo)', fontSize: 12, color: 'rgba(26,45,74,0.45)', marginBottom: 8 }}>
          Dernière mise à jour : Avril 2026
        </p>
        <p style={{ fontFamily: 'var(--font-baloo)', fontSize: 12, color: 'rgba(26,45,74,0.45)', marginBottom: 24 }}>
          © ChadScience – Tous droits réservés
        </p>

        <Link href="/" style={{ fontFamily: 'var(--font-cinzel)', fontWeight: 700, color: '#EC6426', fontSize: 13, letterSpacing: '.08em', textTransform: 'uppercase' }}>
          ← Retour à l&apos;accueil
        </Link>
      </div>
    </main>
  );
}
