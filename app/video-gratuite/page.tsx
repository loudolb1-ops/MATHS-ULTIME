export const metadata = {
  title: 'Ta vidéo gratuite — Maths Ultime',
  robots: { index: false },
};

export default function VideoGratuitePage() {
  return (
    <main style={{
      minHeight: '100vh',
      background: '#0f0f0f',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px 16px',
    }}>
      <h1 style={{
        color: '#ffffff',
        fontFamily: 'Georgia, serif',
        fontSize: 'clamp(18px, 3vw, 26px)',
        fontWeight: 700,
        marginBottom: 24,
        textAlign: 'center',
        letterSpacing: '.02em',
      }}>
        Ta 1ère vidéo gratuite Maths Ultime
      </h1>
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: 900,
        paddingTop: 'min(56.25%, 506px)',
      }}>
        <iframe
          src="https://iframe.mediadelivery.net/embed/651267/5d0d7e5b-edb5-444f-b257-a2bd59c2a934?autoplay=false&loop=false&muted=false&preload=true&responsive=true"
          loading="lazy"
          allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture"
          allowFullScreen
          style={{
            border: 0,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: 8,
          }}
        />
      </div>
    </main>
  );
}
