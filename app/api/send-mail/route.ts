import { NextRequest, NextResponse } from 'next/server';

const BREVO_API_KEY = process.env.BREVO_API_KEY ?? process.env.NEXT_PUBLIC_BREVO_API_KEY;
const SENDER_EMAIL  = 'chadsciences@maths-ultime.fr';
const SENDER_NAME   = 'Maths Ultime';
const VIDEO_URL = 'https://maths-ultime.fr/video-gratuite';

export async function POST(req: NextRequest) {
  try {
    const { nom, prenom, email, telephone: rawTelephone, classe, pays } = await req.json();
    // rawTelephone = "+33 07 59 48 30 24" — on extrait l'indicatif et le numéro local séparément
    // Normalise en E.164 : "+33 07 59 48 30 24" → "+33759483024"
    const rawPhone = rawTelephone ? String(rawTelephone).trim() : '';
    const dialMatch = rawPhone.match(/^(\+\d+)\s*(.*)$/);
    const sms = dialMatch
      ? dialMatch[1] + dialMatch[2].replace(/\s+|-/g, '').replace(/^0/, '')
      : rawPhone.replace(/\s+|-/g, '');

    if (!nom || !prenom || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, message: 'Nom, prénom ou email invalide.' }, { status: 400 });
    }

    if (!BREVO_API_KEY) {
      return NextResponse.json({ success: false, message: 'Configuration serveur manquante.' }, { status: 500 });
    }

    const htmlContent = `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 16px">
    <tr><td align="center">
      <table width="100%" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)">
        <tr>
          <td style="background:linear-gradient(135deg,#FF8040 0%,#EC6426 50%,#E04A10 100%);padding:32px;text-align:center">
            <p style="margin:0 0 6px;color:rgba(255,255,255,0.8);font-size:12px;letter-spacing:.15em;text-transform:uppercase">MATHS ULTIME — CHADSCIENCES</p>
            <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:900;line-height:1.2">Ta 1ère vidéo gratuite est là&nbsp;! 🎬</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:36px 32px">
            <p style="margin:0 0 18px;font-size:16px;color:#1A1A1A;line-height:1.6">Salut <strong>${prenom}</strong>&nbsp;👋</p>
            <p style="margin:0 0 20px;font-size:15px;color:#444;line-height:1.7">
              Tu t'apprêtes à regarder les <strong>5 premières minutes</strong> de la vidéo Maths Ultime sur les <strong>fonctions et les suites</strong>. Clique ci-dessous pour y accéder&nbsp;:
            </p>
            <table cellpadding="0" cellspacing="0" width="100%">
              <tr><td align="center" style="padding:0 0 28px">
                <a href="${VIDEO_URL}"
                   style="display:inline-block;background:linear-gradient(135deg,#F5C842 0%,#E8A800 100%);color:#1A1A1A;font-weight:900;font-size:16px;text-decoration:none;padding:16px 36px;border-radius:12px;letter-spacing:.02em">
                  ▶&nbsp;&nbsp;Regarder la vidéo gratuite
                </a>
              </td></tr>
            </table>
            <p style="margin:0 0 16px;font-size:15px;color:#444;line-height:1.7">
              Tu vas découvrir la méthode MATHS ULTIME en action&nbsp;: comprendre le cours
              <em>avant</em> de l'apprendre, pour que tout devienne logique et que tu retiennes tout.
            </p>
            <p style="margin:0;font-size:15px;color:#444;line-height:1.7">Bonne révision&nbsp;! 💪</p>
          </td>
        </tr>
        <tr>
          <td style="background:#F8F5F0;padding:18px 32px;border-top:1px solid #EEE8DF">
            <p style="margin:0;font-size:12px;color:#999;text-align:center;line-height:1.6">
              Maths Ultime — ChadSciences<br>
              Vos données sont utilisées uniquement pour l'envoi de ce guide, conformément au RGPD.
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

    // 1. Créer/mettre à jour le contact (SMS inclus dans le même appel)
    const contactRes = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': BREVO_API_KEY,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email,
        attributes: {
          PRENOM: prenom,
          NOM:    nom,
          ...(sms    ? { SMS:    sms    } : {}),
          ...(classe ? { CLASSE: classe } : {}),
          ...(pays   ? { PAYS:   pays   } : {}),
        },
        updateEnabled: true,
      }),
    });
    if (!contactRes.ok) {
      const contactErr = await contactRes.json().catch(() => ({}) as { code?: string });
      // duplicate_parameter = numéro déjà utilisé par un autre contact : retry sans SMS
      const isDuplicateSms = (contactErr as { code?: string }).code === 'duplicate_parameter';
      if (!isDuplicateSms) {
        console.error('[Brevo contacts] status:', contactRes.status, 'body:', JSON.stringify(contactErr));
      }
      if (isDuplicateSms || sms) {
        const retryRes = await fetch('https://api.brevo.com/v3/contacts', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'api-key': BREVO_API_KEY,
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            email,
            attributes: {
              PRENOM: prenom,
              NOM:    nom,
              ...(classe ? { CLASSE: classe } : {}),
              ...(pays   ? { PAYS:   pays   } : {}),
            },
            updateEnabled: true,
          }),
        });
        if (!retryRes.ok) {
          const retryErr = await retryRes.json().catch(() => ({}));
          console.error('[Brevo contacts retry] status:', retryRes.status, 'body:', JSON.stringify(retryErr));
        }
      }
    }

    // 2. Envoyer l'email de bienvenue avec le lien YouTube
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': BREVO_API_KEY,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender:      { name: SENDER_NAME, email: SENDER_EMAIL },
        to:          [{ email, name: `${prenom} ${nom}` }],
        subject:     'Ta 1ère vidéo gratuite Maths Ultime est là 🎬',
        htmlContent,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({})) as { message?: string };
      return NextResponse.json({ success: false, message: err.message ?? 'Erreur Brevo.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, message: 'Erreur serveur.' }, { status: 500 });
  }
}
