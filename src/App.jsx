import { useState, useEffect } from "react";
import ProductAntiAge from "./ProductAntiAge.jsx";
import ProductNila from "./ProductNila.jsx";

// ─── Config — à personnaliser ─────────────────────────────────────
export const WA_NUMBER    = "212XXXXXXXXX";          // ← remplacer par le vrai numéro
const FORMSPREE_ID = "TON_ID";                // ← remplacer par l'ID Formspree

// ─── Images ──────────────────────────────────────────────────────
const IMG_ARGAN      = "/images/argan.jpg";
const IMG_ALOE       = "/images/aloe.jpg";
const IMG_FIGUE      = "/images/figue.jpg";
const IMG_KARITE     = "/images/karite.jpg";
const IMG_TEXTURE    = "/images/texture.jpg";
const IMG_OLIBAN     = "/images/eclat-bois.jpg.png";
const IMG_OLIBAN2    = "/images/eclat-bois2.jpg.png";
const IMG_NILA       = "/images/nila-bois.jpg.png";
const IMG_NILA2      = "/images/nila-lin.jpg.png";
const IMG_ANTIAGE    = "/images/antiage-beldi.jpg.png";
const IMG_ANTIAGE2   = "/images/antiage-cactus.jpg.png";
const IMG_PHILOSOPHIE= "/images/antiage-mains.jpg.png";
const IMG_MARBRE     = "/images/eclat-marbre.jpg.png";

// ─── Palette ─────────────────────────────────────────────────────
export const C = {
  ocre: "#C4724A", ocreDark: "#9E5835", gold: "#A07842",
  goldLight: "#C9A96E", ivory: "#F7F3EE", cream: "#EDE5D8",
  sand: "#D4C4B0", dark: "#2E1E12", darkMid: "#5C3D28", white: "#FDFAF6",
};

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap');`;

const RESPONSIVE_CSS = `
  html { scroll-behavior:smooth; scroll-padding-top:108px; }
  .g2  { display:grid; grid-template-columns:1fr 1fr; }
  .g3  { display:grid; grid-template-columns:repeat(3,1fr); }
  .gi  { display:grid; grid-template-columns:repeat(3,1fr); }
  .g4  { display:grid; grid-template-columns:repeat(4,1fr); }
  .gf  { display:grid; grid-template-columns:2fr 1fr 1fr 1fr; }
  .modal-grid { display:grid; grid-template-columns:1fr 1fr; }
  .nav-hamburger { display:none; flex-direction:column; gap:6px; background:none; border:none; cursor:pointer; padding:8px; }

  @media(max-width:1024px){
    .g3  { grid-template-columns:repeat(2,1fr) !important; }
    .gi  { grid-template-columns:repeat(2,1fr) !important; }
    .g4  { grid-template-columns:repeat(2,1fr) !important; }
    .hero-jar-img { width:160px !important; }
  }

  @media(max-width:768px){
    .g2  { grid-template-columns:1fr !important; }
    .g3  { grid-template-columns:1fr !important; }
    .gi  { grid-template-columns:repeat(2,1fr) !important; }
    .g4  { grid-template-columns:repeat(2,1fr) !important; }
    .gf  { grid-template-columns:repeat(2,1fr) !important; }
    .modal-grid { grid-template-columns:1fr !important; }
    .modal-img  { height:260px !important; }
    .section-pad { padding:64px 5% !important; }
    .nav-links    { display:none !important; }
    .nav-hamburger{ display:flex !important; }
    .hero-jar-wrap{ display:none !important; }
    .hero-arch    { display:none !important; }
    .hero-content { max-width:100% !important; padding-top:108px !important; }
    .stat-banner  { flex-direction:column !important; text-align:center !important; gap:20px !important; align-items:center !important; }
    .newsletter-form  { flex-direction:column !important; max-width:100% !important; }
    .newsletter-input { border-right:1px solid #D4C4B0 !important; border-radius:2px !important; }
    .newsletter-btn   { border-radius:2px !important; width:100% !important; }
    .footer-bottom    { flex-direction:column !important; gap:10px !important; text-align:center !important; }
    .footer-col-links { display:none !important; }
    .hero-bg-img      { object-position: right center !important; }
    .hero-content     { padding-left:5% !important; padding-right:5% !important; max-width:100% !important; }
    .nav-logo-img     { height:38px !important; }
  }

  @media(max-width:480px){
    .gi { grid-template-columns:1fr !important; }
    .g4 { grid-template-columns:1fr !important; }
    .gf { grid-template-columns:1fr !important; }
  }
`;

// ─── Produits ─────────────────────────────────────────────────────
export const PRODUCTS = [
  {
    id: "oliban", name: "Éclat du Teint", subtitle: "Renouvellement Cellulaire",
    tagline: "Oliban · Collagène · Résine de Boswellia",
    description: "Le secret des femmes du Souss depuis des générations. L\'encens oliban, trésor des caravanes sahariennes, révèle l\'éclat naturel tout en renforçant la barrière cutanée.",
    color: "#C4724A", colorLight: "#E8A882", label: "Purifiant · Apaisant",
    price: "240 MAD", size: "50ml", skin: "Tous types de peau",
    image: IMG_OLIBAN, image2: IMG_OLIBAN2,
    benefits: ["Purifie en profondeur", "Apaise les rougeurs", "Renforce la barrière cutanée", "Révèle l\'éclat naturel"],
    howToUse: "Appliquer matin et/ou soir sur visage propre et sec. Masser en mouvements circulaires jusqu\'à absorption complète.",
    inci: "Aqua, Boswellia Serrata Resin Extract, Hydrolyzed Collagen, Argania Spinosa Kernel Oil, Butyrospermum Parkii Butter, Aloe Barbadensis Leaf Juice, Glycerin, Tocopherol.",
  },
  {
    id: "nila", name: "Soin Hydratant", subtitle: "Unifiant au Nila Pur",
    tagline: "Huile d\'argan bio · Nila · Indigo naturel",
    description: "La plante indigo, utilisée au hammam depuis des siècles, illumine et unifie le teint. Enrichi d\'huile d\'argan vierge du Souss-Massa, pressée à froid.",
    color: "#7B9BAD", colorLight: "#B8D0DB", label: "Effet perfecteur · Teint terne",
    price: "210 MAD", size: "50ml", skin: "Peaux ternes",
    image: IMG_NILA, image2: IMG_NILA2,
    benefits: ["Unifie le teint", "Hydratation longue durée", "Effet bonne mine immédiat", "Réduit l\'aspect terne"],
    howToUse: "Utiliser matin et soir après nettoyage. Déposer une noisette sur le visage et le cou, masser doucement jusqu\'à pénétration complète.",
    inci: "Aqua, Argania Spinosa Kernel Oil*, Indigofera Tinctoria Leaf Powder, Aloe Barbadensis Leaf Juice, Sodium Hyaluronate, Glycerin, Tocopherol. *Agriculture biologique.",
  },
  {
    id: "figue", name: "Soin Anti-Âge", subtitle: "Raffermissant",
    tagline: "Graines de figue de Barbarie · Karité · Cactus",
    description: "L\'huile précieuse extraite des pépins de figue de barbarie — il faut 1 tonne de fruits pour obtenir 1 litre. Un concentré de régénération pour une peau redensifiée.",
    color: "#7A9B6E", colorLight: "#B5CC9E", label: "Régénérant · Hydratant",
    price: "290 MAD", size: "50ml", skin: "Tous types de peau",
    image: IMG_ANTIAGE, image2: IMG_ANTIAGE2,
    benefits: ["Réduit visiblement les rides", "Raffermit et redensifie", "Régénère en profondeur", "Nourrit intensément"],
    howToUse: "Appliquer le soir sur visage et cou propres. Masser délicatement en insistant sur les zones de tension. Laisser agir toute la nuit.",
    inci: "Aqua, Opuntia Ficus-Indica Seed Oil, Butyrospermum Parkii Butter, Opuntia Ficus-Indica Stem Extract, Glycerin, Tocopherol, Rosmarinus Officinalis Leaf Extract.",
  },
];

// ─── Ingrédients ──────────────────────────────────────────────────
const INGREDIENTS = [
  {
    name: "Argan bio", origin: "Souss-Massa, Maroc",
    benefit: "Nutrition profonde & protection",
    detail: "L\'or liquide du Maroc, pressé à froid par des coopératives de femmes berbères.",
    image: IMG_ARGAN, objectPosition: "center",
  },
  {
    name: "Figue de Barbarie", origin: "Haut Atlas, Maroc",
    benefit: "Anti-âge intense",
    detail: "1 tonne de fruits pour 1 litre d\'huile. Le plus puissant des anti-âge naturels.",
    image: IMG_FIGUE, objectPosition: "center",
  },
  {
    name: "Aloé vera", origin: "Maroc",
    benefit: "Apaisement & hydratation profonde",
    detail: "Cultivé localement, il apporte hydratation immédiate et effet calmant durable.",
    image: IMG_ALOE, objectPosition: "center top",
  },
  {
    name: "Beurre de karité", origin: "Afrique de l\'Ouest",
    benefit: "Protection & douceur intense",
    detail: "Récolté artisanalement, il scelle l\'hydratation et nourrit en profondeur.",
    image: IMG_KARITE, objectPosition: "center",
  },
  {
    name: "Oliban (Encens)", origin: "Afrique de l\'Est",
    benefit: "Régénération cellulaire",
    detail: "Résine sacrée de Boswellia, utilisée depuis l\'Antiquité pour régénérer la peau.",
    image: IMG_TEXTURE, objectPosition: "center",
  },
  {
    name: "Nila pur", origin: "Maghreb",
    benefit: "Éclat & unification du teint",
    detail: "L\'indigo naturel des artisanes marocaines, transmis de génération en génération.",
    image: IMG_NILA, objectPosition: "center top",
  },
];

// ─── Avis clients ─────────────────────────────────────────────────
const REVIEWS = [
  {
    name: "Fatima Z.", city: "Agadir", stars: 5,
    text: "Le soin à l\'oliban a transformé ma peau en trois semaines. Mes amies me demandent mon secret. C\'est exactement ce que ma grand-mère utilisait, mais en version moderne et raffinée.",
  },
  {
    name: "Nadia B.", city: "Casablanca", stars: 5,
    text: "La crème au Nila est incroyable. Mon teint est unifié et lumineux dès le matin. Un luxe accessible et tellement naturel — je ne peux vraiment plus m\'en passer.",
  },
  {
    name: "Samira M.", city: "Marrakech", stars: 5,
    text: "J\'utilise le soin anti-âge depuis deux mois. Ma peau est plus ferme et les petites ridules ont nettement diminué. Un concentré de nature marocaine, pur et efficace.",
  },
];

// ─── Pattern zellige ──────────────────────────────────────────────
function ZelligePattern({ opacity = 0.06 }) {
  return (
    <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="z" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <g fill="none" stroke={C.ocre} strokeWidth="0.8" opacity={opacity}>
            <polygon points="30,2 58,15 58,45 30,58 2,45 2,15"/>
            <polygon points="30,12 48,20 48,40 30,48 12,40 12,20"/>
            <line x1="30" y1="2" x2="30" y2="12"/><line x1="58" y1="15" x2="48" y2="20"/>
            <line x1="58" y1="45" x2="48" y2="40"/><line x1="30" y1="58" x2="30" y2="48"/>
            <line x1="2" y1="45" x2="12" y2="40"/><line x1="2" y1="15" x2="12" y2="20"/>
            <circle cx="30" cy="30" r="4"/>
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#z)"/>
    </svg>
  );
}

// ─── Trust Bar ────────────────────────────────────────────────────
function TrustBar() {
  return (
    <div style={{
      position:"fixed", top:72, left:0, right:0, zIndex:99,
      height:36, background:C.ocre,
      display:"flex", alignItems:"center", justifyContent:"center", gap:32,
    }}>
      {["Livraison à Agadir", "Paiement à la livraison", "Produits 100% naturels"].map(item => (
        <span key={item} style={{ fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:"0.2em", color:C.ivory, fontWeight:300 }}>
          ✦ {item.toUpperCase()}
        </span>
      ))}
    </div>
  );
}

// ─── NavBar ───────────────────────────────────────────────────────
const NAV_LINKS = [
  { label:"Soins",        href:"#soins" },
  { label:"Ingrédients",  href:"#ingredients" },
  { label:"Histoire",     href:"#histoire" },
  { label:"Boutique",     href:"#boutique" },
];

function NavBar({ scrolled }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const barColor = scrolled ? C.dark : C.ivory;
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Bonjour, je souhaite commander un soin Care Yelli")}`;

  return (
    <nav style={{
      position:"fixed", top:0, left:0, right:0, zIndex:100,
      background: scrolled ? "rgba(247,243,238,0.96)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? `1px solid ${C.sand}` : "none",
      transition:"all 0.4s ease", padding:"0 6%",
    }}>
      <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", height:72 }}>
        {/* Logo */}
        <a href="#" style={{ textDecoration:"none", display:"flex", alignItems:"center" }}>
          <img
            src="/images/yellicare_clean.png"
            alt="Care Yelli — Soins Naturels Marocains"
            className="nav-logo-img"
            style={{ height:50, width:"auto", display:"block" }}
          />
        </a>
        {/* Desktop links */}
        <div className="nav-links" style={{ display:"flex", gap:36, alignItems:"center" }}>
          {NAV_LINKS.map(({ label, href }) => (
            <a key={label} href={href} style={{
              fontFamily:"'Jost',sans-serif", fontSize:11, letterSpacing:"0.18em",
              color: scrolled ? C.darkMid : C.ivory, textDecoration:"none",
              fontWeight:300, opacity:0.85,
            }}>{label.toUpperCase()}</a>
          ))}
          <a href={waUrl} target="_blank" rel="noopener noreferrer" style={{
            background:C.ocre, color:C.ivory, border:"none", borderRadius:2,
            padding:"10px 24px", fontFamily:"'Jost',sans-serif", fontSize:11,
            letterSpacing:"0.2em", cursor:"pointer", textDecoration:"none", display:"inline-block",
          }}>COMMANDER</a>
        </div>
        {/* Hamburger */}
        <button className="nav-hamburger" onClick={() => setMenuOpen(true)} aria-label="Ouvrir le menu">
          <span style={{ display:"block", width:24, height:2, background:barColor, borderRadius:1 }}/>
          <span style={{ display:"block", width:24, height:2, background:barColor, borderRadius:1 }}/>
          <span style={{ display:"block", width:24, height:2, background:barColor, borderRadius:1 }}/>
        </button>
      </div>

      {/* Mobile overlay */}
      {menuOpen && (
        <div style={{
          position:"fixed", inset:0, background:"rgba(46,26,14,0.98)", zIndex:200,
          display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:32,
        }}>
          <button onClick={() => setMenuOpen(false)} style={{
            position:"absolute", top:24, right:28, background:"none", border:"none",
            color:C.ivory, fontSize:32, cursor:"pointer", lineHeight:1,
          }}>✕</button>
          {NAV_LINKS.map(({ label, href }) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)} style={{
              fontFamily:"'Jost',sans-serif", fontSize:13, letterSpacing:"0.22em",
              color:C.ivory, textDecoration:"none", fontWeight:300,
            }}>{label.toUpperCase()}</a>
          ))}
          <a href={waUrl} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} style={{
            background:C.ocre, color:C.ivory, border:"none", borderRadius:2,
            padding:"14px 40px", fontFamily:"'Jost',sans-serif", fontSize:11,
            letterSpacing:"0.2em", cursor:"pointer", textDecoration:"none", marginTop:8,
          }}>COMMANDER</a>
        </div>
      )}
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────
function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Bonjour, je souhaite découvrir les soins Care Yelli")}`;

  return (
    <section style={{ position:"relative", minHeight:"100vh", overflow:"hidden", display:"flex", alignItems:"center" }}>

      {/* Image plein écran */}
      <img
        className="hero-bg-img"
        src="/images/hero-trio.jpg.png"
        alt="Les trois soins Care Yelli — Éclat du Teint, Nila et Anti-Âge sur fond lin naturel"
        style={{
          position:"absolute", inset:0,
          width:"100%", height:"100%",
          objectFit:"cover", objectPosition:"center",
          display:"block",
          opacity: loaded ? 1 : 0,
          transition:"opacity 1.6s ease",
        }}
      />

      {/* Overlay général — lisibilité du texte */}
      <div style={{ position:"absolute", inset:0, background:"rgba(28,14,6,0.48)", pointerEvents:"none" }}/>

      {/* Gradient top — lisibilité du header / trust bar */}
      <div style={{
        position:"absolute", top:0, left:0, right:0, height:180,
        background:"linear-gradient(to bottom, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.15) 70%, transparent 100%)",
        pointerEvents:"none",
      }}/>

      {/* Pattern zellige discret */}
      <ZelligePattern opacity={0.04}/>

      {/* Contenu texte superposé */}
      <div
        className="hero-content"
        style={{
          position:"relative", zIndex:2,
          padding:"140px 8% 100px 8%",
          maxWidth:760, width:"100%",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "none" : "translateY(28px)",
          transition:"all 1.2s cubic-bezier(0.22,1,0.36,1) 0.5s",
        }}
      >
        <div style={{ fontFamily:"'Jost',sans-serif", fontSize:10, letterSpacing:"0.5em", color:C.ocre, marginBottom:28, fontWeight:300, display:"flex", alignItems:"center", gap:16 }}>
          <span style={{ display:"inline-block", width:40, height:1, background:C.ocre }}/>
          SOINS NATURELS DU TERROIR MAROCAIN
        </div>
        <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(40px,6vw,96px)", color:C.ivory, fontWeight:300, lineHeight:1.05, margin:"0 0 8px" }}>Transmis</h1>
        <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(40px,6vw,96px)", color:C.ocre, fontWeight:400, fontStyle:"italic", lineHeight:1.05, margin:"0 0 40px" }}>de mère en fille.</h1>
        <p style={{ fontFamily:"'Jost',sans-serif", fontSize:15, fontWeight:300, color:"rgba(237,229,216,0.82)", lineHeight:1.85, maxWidth:480, marginBottom:52 }}>
          Des soins enracinés dans la tradition berbère et africaine. Huile d\'argan, oliban, figue de barbarie — les secrets de beauté que nos mères nous ont confiés.
        </p>
        <div style={{ display:"flex", gap:16, alignItems:"center", flexWrap:"wrap" }}>
          <a href="#soins" style={{ background:C.ocre, color:C.ivory, border:"none", borderRadius:2, padding:"16px 36px", fontFamily:"'Jost',sans-serif", fontSize:11, letterSpacing:"0.25em", cursor:"pointer", textDecoration:"none" }}>DÉCOUVRIR LES SOINS</a>
          <a href={waUrl} target="_blank" rel="noopener noreferrer" style={{ fontFamily:"'Jost',sans-serif", fontSize:11, letterSpacing:"0.2em", color:"rgba(237,229,216,0.65)", textDecoration:"none", fontWeight:300, display:"flex", alignItems:"center", gap:10 }}>
            COMMANDER <span style={{ display:"inline-block", width:30, height:1, background:"currentColor" }}/>
          </a>
        </div>
      </div>

    </section>
  );
}

// ─── Stats Band ───────────────────────────────────────────────────
const STATS = [
  { n:"100%", l:"Ingrédients naturels" },
  { n:"3",    l:"Soins iconiques"      },
  { n:"0",    l:"Parabènes & sulfates" },
];

function StatsBand() {
  return (
    <div style={{
      background: C.ocre,
      display:"flex", alignItems:"stretch", justifyContent:"center",
      width:"100%",
    }}>
      {STATS.map((s, i) => (
        <>
          {i > 0 && (
            <div key={`sep-${i}`} style={{
              width:1, background:"rgba(255,255,255,0.25)",
              margin:"16px 0",
              flexShrink:0,
            }}/>
          )}
          <div key={s.l} style={{
            flex:1, display:"flex", flexDirection:"column",
            alignItems:"center", justifyContent:"center",
            padding:"22px 16px",
          }}>
            <div style={{
              fontFamily:"'Cormorant Garamond',serif",
              fontSize:"clamp(28px,4vw,44px)",
              color:C.ivory, fontWeight:500, lineHeight:1,
              marginBottom:7,
            }}>{s.n}</div>
            <div style={{
              fontFamily:"'Jost',sans-serif",
              fontSize:9, fontWeight:300,
              color:"rgba(253,250,246,0.82)",
              letterSpacing:"0.22em", textAlign:"center",
            }}>{s.l.toUpperCase()}</div>
          </div>
        </>
      ))}
    </div>
  );
}

// ─── Philosophy ───────────────────────────────────────────────────
function PhilosophySection() {
  return (
    <section id="histoire" className="section-pad" style={{ background:C.ivory, padding:"120px 6%", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", left:-80, top:"50%", transform:"translateY(-50%)", fontFamily:"'Cormorant Garamond',serif", fontSize:200, color:C.cream, fontWeight:300, lineHeight:1, userSelect:"none" }}>يلي</div>
      <div className="g2" style={{ maxWidth:1200, margin:"0 auto", gap:80, alignItems:"center", position:"relative", zIndex:1 }}>
        <div>
          <div style={{ fontFamily:"'Jost',sans-serif", fontSize:10, letterSpacing:"0.5em", color:C.ocre, marginBottom:24, fontWeight:300, display:"flex", alignItems:"center", gap:16 }}>
            <span style={{ display:"inline-block", width:30, height:1, background:C.ocre }}/> NOTRE PHILOSOPHIE
          </div>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(28px,4vw,56px)", color:C.dark, fontWeight:400, lineHeight:1.2, margin:"0 0 32px" }}>
            Yelli — <em>« ma fille »</em><br/>en langue berbère
          </h2>
          <p style={{ fontFamily:"'Jost',sans-serif", fontSize:15, fontWeight:300, color:C.darkMid, lineHeight:1.9, marginBottom:24 }}>
            Chaque pot Care Yelli est une lettre d\'amour. Celle qu\'une mère écrit à sa fille en lui transmettant les gestes ancestraux du soin — l\'application du savon beldi, le rituel du ghassoul, l\'huile d\'argan chauffée dans les paumes.
          </p>
          <p style={{ fontFamily:"'Jost',sans-serif", fontSize:15, fontWeight:300, color:C.darkMid, lineHeight:1.9 }}>
            Nos formules s\'ancrent dans ce patrimoine vivant, enrichi par les savoirs des femmes du Souss, des souks de Marrakech et des caravanes sahariennes.
          </p>
        </div>
        <div style={{ position:"relative" }}>
          <div style={{ borderRadius:4, overflow:"hidden", position:"relative" }}>
            <img
              src={IMG_PHILOSOPHIE}
              alt="Mains appliquant un soin Yelli Care — rituel de beauté berbère"
              loading="lazy"
              style={{ width:"100%", height:480, objectFit:"cover", objectPosition:"center", display:"block" }}
            />
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(46,30,18,0.6) 0%, transparent 60%)" }}/>
            <div style={{ position:"absolute", bottom:32, left:32, right:32 }}>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, fontStyle:"italic", color:C.ivory, lineHeight:1.6, margin:"0 0 12px" }}>
                « La beauté de notre peau est héritée. Elle se nourrit des mêmes terres, des mêmes herbes. »
              </p>
              <div style={{ fontFamily:"'Jost',sans-serif", fontSize:10, color:C.goldLight, letterSpacing:"0.2em" }}>— FONDATRICE, CARE YELLI</div>
            </div>
          </div>
          <div style={{ position:"absolute", bottom:-16, right:-16, width:"100%", height:"100%", border:`1px solid ${C.sand}`, borderRadius:4, zIndex:-1 }}/>
        </div>
      </div>
    </section>
  );
}

// ─── Product Modal ────────────────────────────────────────────────
function ProductModal({ product, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Bonjour, je souhaite commander le soin ${product.name} - Care Yelli`)}`;

  return (
    <div
      onClick={onClose}
      style={{
        position:"fixed", inset:0, zIndex:400,
        background:"rgba(46,30,18,0.75)", display:"flex",
        alignItems:"center", justifyContent:"center", padding:"20px",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background:C.ivory, borderRadius:4, maxWidth:860, width:"100%",
          maxHeight:"92vh", overflow:"auto", position:"relative",
        }}
      >
        {/* Close */}
        <button onClick={onClose} style={{
          position:"sticky", top:0, float:"right", zIndex:10,
          margin:"16px 16px 0 0",
          background:"rgba(46,30,18,0.07)", border:"none", borderRadius:"50%",
          width:36, height:36, fontSize:16, cursor:"pointer", color:C.dark,
          display:"flex", alignItems:"center", justifyContent:"center",
        }}>✕</button>

        <div className="modal-grid" style={{ gap:0 }}>
          {/* Image */}
          <div className="modal-img" style={{
            background:C.cream, display:"flex", alignItems:"center",
            justifyContent:"center", padding:40, minHeight:360, position:"relative",
          }}>
            <ZelligePattern opacity={0.04}/>
            <img src={product.image} alt={product.name} style={{
              width:"100%", maxWidth:280, height:"auto", objectFit:"contain",
              position:"relative", zIndex:1,
            }}/>
            <div style={{
              position:"absolute", bottom:20, left:20,
              background:product.color, color:C.ivory, borderRadius:40,
              padding:"4px 14px", fontFamily:"'Jost',sans-serif",
              fontSize:9, letterSpacing:"0.2em",
            }}>{product.label.toUpperCase()}</div>
          </div>

          {/* Details */}
          <div style={{ padding:"40px 36px 40px" }}>
            <div style={{ fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:"0.4em", color:product.color, marginBottom:8 }}>{product.tagline.toUpperCase()}</div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(26px,3.5vw,36px)", fontWeight:400, color:C.dark, margin:"0 0 4px" }}>{product.name}</h2>
            <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:16, fontStyle:"italic", color:C.gold, margin:"0 0 20px" }}>{product.subtitle}</p>
            <p style={{ fontFamily:"'Jost',sans-serif", fontSize:13, fontWeight:300, color:C.darkMid, lineHeight:1.8, margin:"0 0 24px" }}>{product.description}</p>

            {/* Bénéfices */}
            <div style={{ marginBottom:24 }}>
              <div style={{ fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:"0.3em", color:product.color, marginBottom:12 }}>BÉNÉFICES</div>
              {product.benefits.map(b => (
                <div key={b} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
                  <span style={{ width:6, height:6, borderRadius:"50%", background:product.color, flexShrink:0 }}/>
                  <span style={{ fontFamily:"'Jost',sans-serif", fontSize:13, fontWeight:300, color:C.darkMid }}>{b}</span>
                </div>
              ))}
            </div>

            {/* Mode d'emploi */}
            <div style={{ marginBottom:24 }}>
              <div style={{ fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:"0.3em", color:product.color, marginBottom:8 }}>MODE D'EMPLOI</div>
              <p style={{ fontFamily:"'Jost',sans-serif", fontSize:13, fontWeight:300, color:C.darkMid, lineHeight:1.8, margin:0 }}>{product.howToUse}</p>
            </div>

            {/* INCI */}
            <div style={{ marginBottom:28, padding:16, background:C.cream, borderRadius:2 }}>
              <div style={{ fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:"0.3em", color:C.gold, marginBottom:8 }}>INGRÉDIENTS (INCI)</div>
              <p style={{ fontFamily:"'Jost',sans-serif", fontSize:11, fontWeight:300, color:C.darkMid, lineHeight:1.7, margin:0 }}>{product.inci}</p>
            </div>

            {/* Prix + CTA */}
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", borderTop:`1px solid ${C.cream}`, paddingTop:20, gap:16, flexWrap:"wrap" }}>
              <div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:28, color:C.dark, fontWeight:400 }}>{product.price}</div>
                <div style={{ fontFamily:"'Jost',sans-serif", fontSize:9, color:C.gold, letterSpacing:"0.15em" }}>{product.size} — {product.skin}</div>
              </div>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background:product.color, color:C.ivory, border:"none", borderRadius:2,
                  padding:"14px 28px", fontFamily:"'Jost',sans-serif",
                  fontSize:10, letterSpacing:"0.2em", cursor:"pointer",
                  textDecoration:"none", display:"inline-flex", alignItems:"center", gap:8,
                }}
              >
                <span>📱</span> COMMANDER VIA WHATSAPP
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Product Card ─────────────────────────────────────────────────
function ProductCard({ product, onOpen }) {
  const [hovered, setHovered] = useState(false);
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Bonjour, je souhaite commander le soin ${product.name} - Care Yelli`)}`;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(product)}
      style={{
        background:C.white, border:`1px solid ${hovered ? product.color : C.sand}`,
        borderRadius:4, overflow:"hidden",
        transition:"all 0.4s ease",
        transform: hovered ? "translateY(-8px)" : "none",
        boxShadow: hovered ? "0 24px 60px rgba(0,0,0,0.08)" : "none",
        cursor:"pointer",
      }}
    >
      <div style={{ position:"relative", height:300, overflow:"hidden", background:C.cream }}>
        <ZelligePattern opacity={0.04}/>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          style={{
            position:"absolute", inset:0, width:"100%", height:"100%",
            objectFit:"cover", objectPosition:"center",
            transform: hovered ? "scale(1.04)" : "scale(1)",
            transition:"transform 0.5s ease, opacity 0.4s ease",
            opacity: hovered && product.image2 ? 0 : 1,
          }}
        />
        {product.image2 && (
          <img
            src={product.image2}
            alt={`${product.name} — vue détail`}
            loading="lazy"
            style={{
              position:"absolute", inset:0, width:"100%", height:"100%",
              objectFit:"cover", objectPosition:"center",
              transform: hovered ? "scale(1.04)" : "scale(1.08)",
              transition:"transform 0.5s ease, opacity 0.4s ease",
              opacity: hovered ? 1 : 0,
            }}
          />
        )}
        <div style={{
          position:"absolute", bottom:16, left:16,
          background:product.color, color:C.ivory, borderRadius:40,
          padding:"4px 14px", fontFamily:"'Jost',sans-serif",
          fontSize:9, letterSpacing:"0.2em", fontWeight:300,
        }}>{product.label.toUpperCase()}</div>
      </div>
      <div style={{ padding:"24px 24px 28px" }}>
        <div style={{ fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:"0.4em", color:product.color, marginBottom:6 }}>{product.tagline.toUpperCase()}</div>
        <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:400, color:C.dark, margin:"0 0 4px", lineHeight:1.2 }}>{product.name}</h3>
        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:15, fontStyle:"italic", color:C.gold, margin:"0 0 14px" }}>{product.subtitle}</p>
        <p style={{ fontFamily:"'Jost',sans-serif", fontSize:13, fontWeight:300, color:C.darkMid, lineHeight:1.75, margin:"0 0 20px" }}>{product.description}</p>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", borderTop:`1px solid ${C.cream}`, paddingTop:16 }}>
          <div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, color:C.dark, fontWeight:400 }}>{product.price}</div>
            <div style={{ fontFamily:"'Jost',sans-serif", fontSize:9, color:C.gold, letterSpacing:"0.15em" }}>{product.size}</div>
          </div>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{
              background: hovered ? product.color : "transparent",
              color: hovered ? C.ivory : product.color,
              border:`1px solid ${product.color}`, borderRadius:2,
              padding:"10px 20px", fontFamily:"'Jost',sans-serif",
              fontSize:10, letterSpacing:"0.2em", cursor:"pointer",
              textDecoration:"none", transition:"all 0.3s ease",
            }}
          >AJOUTER</a>
        </div>
      </div>
    </div>
  );
}

// ─── Products section ─────────────────────────────────────────────
function ProductsSection({ onOpen, onOpenAntiAge, onOpenNila }) {
  return (
    <section id="soins" className="section-pad" style={{ background:C.cream, padding:"120px 6%", position:"relative" }}>
      <ZelligePattern opacity={0.04}/>
      <div style={{ maxWidth:1200, margin:"0 auto", position:"relative", zIndex:1 }}>
        <div style={{ textAlign:"center", marginBottom:72 }}>
          <div style={{ fontFamily:"'Jost',sans-serif", fontSize:10, letterSpacing:"0.5em", color:C.ocre, marginBottom:20 }}>◦ NOS SOINS ◦</div>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(28px,4vw,54px)", color:C.dark, fontWeight:400, margin:"0 0 20px" }}>La collection <em>Yelli</em></h2>
          <p style={{ fontFamily:"'Jost',sans-serif", fontSize:14, fontWeight:300, color:C.darkMid, maxWidth:560, margin:"0 auto", lineHeight:1.8 }}>
            Trois formules d\'exception, nourries par les richesses botaniques du Maroc et du continent africain.
          </p>
        </div>
        <div className="g3" style={{ gap:28 }}>
          {PRODUCTS.map(p => <ProductCard key={p.id} product={p} onOpen={p.id === "figue" ? onOpenAntiAge : p.id === "nila" ? onOpenNila : onOpen}/>)}
        </div>
        <div style={{ textAlign:"center", marginTop:56 }}>
          <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Bonjour, je souhaite voir toute la gamme Care Yelli")}`} target="_blank" rel="noopener noreferrer" style={{
            display:"inline-block", background:"transparent", color:C.dark,
            border:`1px solid ${C.dark}`, borderRadius:2, padding:"16px 48px",
            fontFamily:"'Jost',sans-serif", fontSize:11, letterSpacing:"0.25em",
            cursor:"pointer", textDecoration:"none",
          }}>
            VOIR TOUTE LA GAMME
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Ingredient Card ──────────────────────────────────────────────
function IngredientCard({ ing }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius:4, overflow:"hidden", position:"relative", cursor:"pointer",
        transform: hovered ? "translateY(-4px)" : "none",
        transition:"transform 0.35s ease",
        boxShadow: hovered ? "0 20px 48px rgba(0,0,0,0.12)" : "none",
      }}
    >
      <div style={{ height:220, overflow:"hidden", position:"relative" }}>
        <img src={ing.image} alt={ing.name} loading="lazy" style={{
          width:"100%", height:"100%", objectFit:"cover",
          objectPosition: ing.objectPosition || "center",
          transform: hovered ? "scale(1.07)" : "scale(1)",
          transition:"transform 0.5s ease", display:"block",
        }}/>
        <div style={{ position:"absolute", inset:0, background: hovered ? "rgba(46,30,18,0.45)" : "rgba(46,30,18,0.25)", transition:"background 0.35s ease" }}/>
        <div style={{
          position:"absolute", top:14, left:14,
          background:"rgba(46,30,18,0.7)", backdropFilter:"blur(4px)",
          borderRadius:40, padding:"4px 12px",
          fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:"0.2em", color:C.goldLight,
        }}>{ing.origin.toUpperCase()}</div>
      </div>
      <div style={{ background:C.ivory, padding:"20px 20px 22px" }}>
        <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, color:C.dark, fontWeight:400, margin:"0 0 6px" }}>{ing.name}</h3>
        <div style={{ fontFamily:"'Jost',sans-serif", fontSize:10, color:C.ocre, letterSpacing:"0.15em", marginBottom:10 }}>{ing.benefit.toUpperCase()}</div>
        <p style={{ fontFamily:"'Jost',sans-serif", fontSize:12, fontWeight:300, color:C.darkMid, lineHeight:1.7, margin:0 }}>{ing.detail}</p>
      </div>
    </div>
  );
}

function IngredientsSection() {
  return (
    <section id="ingredients" className="section-pad" style={{ background:C.ivory, padding:"120px 6%" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:72 }}>
          <div style={{ fontFamily:"'Jost',sans-serif", fontSize:10, letterSpacing:"0.5em", color:C.ocre, marginBottom:20, display:"flex", alignItems:"center", justifyContent:"center", gap:16 }}>
            <span style={{ width:30, height:1, background:C.ocre, display:"inline-block" }}/> TERROIR & PLANTES <span style={{ width:30, height:1, background:C.ocre, display:"inline-block" }}/>
          </div>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(28px,4vw,54px)", color:C.dark, fontWeight:400, margin:"0 0 20px" }}>Des ingrédients qui ont une <em>histoire</em></h2>
          <p style={{ fontFamily:"'Jost',sans-serif", fontSize:14, fontWeight:300, color:C.darkMid, maxWidth:580, margin:"0 auto", lineHeight:1.8 }}>
            Chaque ingrédient est sélectionné pour son efficacité prouvée et sa provenance traçable. Nous travaillons directement avec des coopératives de femmes du Maroc et d\'Afrique subsaharienne.
          </p>
        </div>
        <div className="gi" style={{ gap:24 }}>
          {INGREDIENTS.map(ing => <IngredientCard key={ing.name} ing={ing}/>)}
        </div>
        {/* Visuel d'ambiance marbre / texture */}
        <div style={{ marginTop:56, borderRadius:4, overflow:"hidden", position:"relative", height:220 }}>
          <img
            src={IMG_MARBRE}
            alt="Texture marbre et poudres naturelles — matières premières Care Yelli"
            loading="lazy"
            style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center", display:"block" }}
          />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right, rgba(46,30,18,0.55) 0%, rgba(46,30,18,0.1) 60%, transparent 100%)" }}/>
          <div style={{ position:"absolute", top:"50%", left:48, transform:"translateY(-50%)" }}>
            <div style={{ fontFamily:"'Jost',sans-serif", fontSize:10, letterSpacing:"0.4em", color:C.goldLight, marginBottom:10 }}>MATIÈRES PREMIÈRES</div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(22px,3vw,36px)", color:C.ivory, fontWeight:300, lineHeight:1.2 }}>Sélectionnées à la source,<br/><em>tracées jusqu'à vous.</em></div>
          </div>
        </div>

        <div className="stat-banner" style={{ marginTop:24, background:C.ocre, borderRadius:4, padding:"40px 48px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(36px,6vw,48px)", color:C.ivory, fontWeight:300 }}>1T</div>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, color:"rgba(253,250,246,0.85)", fontStyle:"italic", maxWidth:400, lineHeight:1.5 }}>
            de fruits de figue de barbarie pour obtenir un litre d\'huile précieuse
          </div>
          <div style={{ fontFamily:"'Jost',sans-serif", fontSize:10, color:"rgba(253,250,246,0.6)", letterSpacing:"0.2em" }}>HAUT ATLAS · MAROC</div>
        </div>
      </div>
    </section>
  );
}

// ─── Reviews ─────────────────────────────────────────────────────
function ReviewsSection() {
  return (
    <section className="section-pad" style={{ background:C.cream, padding:"120px 6%", position:"relative", overflow:"hidden" }}>
      <ZelligePattern opacity={0.04}/>
      <div style={{ maxWidth:1200, margin:"0 auto", position:"relative", zIndex:1 }}>
        <div style={{ textAlign:"center", marginBottom:64 }}>
          <div style={{ fontFamily:"'Jost',sans-serif", fontSize:10, letterSpacing:"0.5em", color:C.ocre, marginBottom:20, display:"flex", alignItems:"center", justifyContent:"center", gap:16 }}>
            <span style={{ width:30, height:1, background:C.ocre, display:"inline-block" }}/> TÉMOIGNAGES <span style={{ width:30, height:1, background:C.ocre, display:"inline-block" }}/>
          </div>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(28px,4vw,54px)", color:C.dark, fontWeight:400, margin:0 }}>Elles ont essayé. <em>Elles ont aimé.</em></h2>
        </div>
        <div className="g3" style={{ gap:28 }}>
          {REVIEWS.map((r, i) => (
            <div key={i} style={{ background:C.ivory, borderRadius:4, padding:"36px 32px", position:"relative" }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:48, color:C.sand, lineHeight:1, position:"absolute", top:16, left:28, opacity:0.6 }}>"</div>
              {/* Étoiles */}
              <div style={{ display:"flex", gap:4, marginBottom:20 }}>
                {Array.from({length:5}).map((_,s) => (
                  <span key={s} style={{ color: s < r.stars ? C.gold : C.sand, fontSize:14 }}>★</span>
                ))}
              </div>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:18, fontStyle:"italic", color:C.dark, lineHeight:1.7, margin:"0 0 24px", position:"relative", zIndex:1 }}>
                « {r.text} »
              </p>
              <div style={{ display:"flex", alignItems:"center", gap:12, borderTop:`1px solid ${C.cream}`, paddingTop:20 }}>
                <div style={{ width:36, height:36, borderRadius:"50%", background:C.ocre, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Cormorant Garamond',serif", fontSize:16, color:C.ivory, flexShrink:0 }}>
                  {r.name[0]}
                </div>
                <div>
                  <div style={{ fontFamily:"'Jost',sans-serif", fontSize:11, color:C.dark, fontWeight:400 }}>{r.name}</div>
                  <div style={{ fontFamily:"'Jost',sans-serif", fontSize:9, color:C.gold, letterSpacing:"0.15em", marginTop:2 }}>{r.city.toUpperCase()}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Values ───────────────────────────────────────────────────────
function ValuesSection() {
  const values = [
    { title:"Beldi & Chic", desc:"Le luxe marocain dans toute sa subtilité — ni ostentatoire ni banal. Une élégance qui vient de l\'intérieur.", icon:"◇" },
    { title:"Formules propres", desc:"Sans parabènes, sulfates, huiles minérales ni colorants artificiels. Ce que vous ne trouvez pas dedans compte autant.", icon:"◈" },
    { title:"Circuits courts", desc:"Coopératives de femmes berbères, producteurs bio du Souss-Massa. Chaque achat soutient une chaîne humaine.", icon:"◉" },
    { title:"Héritage vivant", desc:"Les recettes évoluent, mais l\'intention reste. Transmettre un geste de soin qui traverse les générations.", icon:"◊" },
  ];
  return (
    <section className="section-pad" style={{ background:`linear-gradient(160deg,#2E1A0E 0%,#3D2410 100%)`, padding:"120px 6%", position:"relative", overflow:"hidden" }}>
      <ZelligePattern opacity={0.04}/>
      <div style={{ maxWidth:1200, margin:"0 auto", position:"relative", zIndex:1 }}>
        <div style={{ textAlign:"center", marginBottom:72 }}>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(28px,4vw,54px)", color:C.ivory, fontWeight:300, margin:"0 0 20px" }}>Ce qui nous définit</h2>
        </div>
        <div className="g4" style={{ gap:1, background:"rgba(196,114,74,0.15)" }}>
          {values.map(v => (
            <div key={v.title} style={{ background:"rgba(46,26,14,0.95)", padding:"44px 32px" }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:28, color:C.ocre, marginBottom:20, opacity:0.7 }}>{v.icon}</div>
              <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, color:C.ivory, fontWeight:400, margin:"0 0 16px" }}>{v.title}</h3>
              <p style={{ fontFamily:"'Jost',sans-serif", fontSize:13, fontWeight:300, color:"rgba(237,229,216,0.65)", lineHeight:1.75, margin:0 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact / Newsletter ─────────────────────────────────────────
function NewsletterSection() {
  const [form, setForm] = useState({ email:"", prenom:"", message:"" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const inputStyle = {
    width:"100%", padding:"14px 18px", border:`1px solid ${C.sand}`,
    borderRadius:2, fontFamily:"'Jost',sans-serif", fontSize:13,
    background:C.ivory, color:C.dark, outline:"none", display:"block",
  };

  return (
    <section id="boutique" className="section-pad" style={{ background:C.cream, padding:"100px 6%", position:"relative", overflow:"hidden" }}>
      <ZelligePattern opacity={0.06}/>
      <div style={{ maxWidth:560, margin:"0 auto", textAlign:"center", position:"relative", zIndex:1 }}>
        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:32, color:C.ocre, marginBottom:16, opacity:0.5 }}>✦</div>
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(28px,5vw,42px)", color:C.dark, fontWeight:400, margin:"0 0 16px" }}>Rejoignez la communauté <em>Yelli</em></h2>
        <p style={{ fontFamily:"'Jost',sans-serif", fontSize:14, fontWeight:300, color:C.darkMid, lineHeight:1.8, marginBottom:40 }}>
          Rituels de soin, coulisses de nos formules, conseils des coopératives — la lettre qui sent bon l\'argan.
        </p>

        {status === "success" ? (
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, color:C.ocre, fontStyle:"italic" }}>
            Merci ! Votre message a bien été envoyé ✦
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:12, textAlign:"left" }}>
            <input
              type="text"
              placeholder="Votre prénom"
              value={form.prenom}
              onChange={e => setForm({ ...form, prenom: e.target.value })}
              required
              style={inputStyle}
            />
            <input
              type="email"
              placeholder="Votre adresse e-mail"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
              style={inputStyle}
            />
            <textarea
              placeholder="Message (optionnel)"
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              rows={4}
              style={{ ...inputStyle, resize:"vertical" }}
            />
            {status === "error" && (
              <p style={{ fontFamily:"'Jost',sans-serif", fontSize:12, color:"#c0392b", margin:0, textAlign:"center" }}>
                Une erreur est survenue. Veuillez réessayer.
              </p>
            )}
            <button
              type="submit"
              disabled={status === "loading"}
              style={{
                background: status === "loading" ? C.sand : C.ocre,
                color:C.ivory, border:"none", borderRadius:2,
                padding:"14px 32px", fontFamily:"'Jost',sans-serif",
                fontSize:10, letterSpacing:"0.2em", cursor: status === "loading" ? "default" : "pointer",
                transition:"background 0.3s ease",
              }}
            >
              {status === "loading" ? "ENVOI EN COURS…" : "ENVOYER"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background:C.dark, padding:"64px 6% 40px" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div className="gf" style={{ gap:48, marginBottom:56 }}>
          <div>
            <div style={{ marginBottom:20 }}>
              <img
                src="/images/yellicare_clean.png"
                alt="Care Yelli — Soins Naturels Marocains"
                style={{ height:90, width:"auto", display:"block" }}
              />
            </div>
            <p style={{ fontFamily:"'Jost',sans-serif", fontSize:12, fontWeight:300, color:"rgba(237,229,216,0.5)", lineHeight:1.8, maxWidth:260 }}>
              Soins naturels du terroir marocain et africain. Formulés avec amour, transmis avec âme.
            </p>
            <p style={{ fontFamily:"'Jost',sans-serif", fontSize:11, color:C.ocre, marginTop:16 }}>Agadir, Maroc 🇲🇦</p>
          </div>
          {[
            { title:"Soins",     links:[["Éclat du Teint","#soins"],["Soin Hydratant","#soins"],["Anti-Âge Raffermissant","#soins"],["Toute la gamme","#soins"]] },
            { title:"La Marque", links:[["Notre Histoire","#histoire"],["Nos Ingrédients","#ingredients"],["Coopératives","#histoire"],["Blog","#"]] },
            { title:"Service",   links:[["FAQ","#"],["Livraison","#"],["Retours","#"],["Contact","#boutique"]] },
          ].map(col => (
            <div key={col.title} className="footer-col-links">
              <div style={{ fontFamily:"'Jost',sans-serif", fontSize:10, letterSpacing:"0.3em", color:C.gold, marginBottom:20 }}>{col.title.toUpperCase()}</div>
              {col.links.map(([label, href]) => (
                <a key={label} href={href} style={{ display:"block", fontFamily:"'Jost',sans-serif", fontSize:12, fontWeight:300, color:"rgba(237,229,216,0.5)", marginBottom:10, textDecoration:"none", cursor:"pointer" }}>{label}</a>
              ))}
            </div>
          ))}
        </div>
        <div className="footer-bottom" style={{ borderTop:`1px solid rgba(196,114,74,0.15)`, paddingTop:24, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div style={{ fontFamily:"'Jost',sans-serif", fontSize:11, color:"rgba(237,229,216,0.35)", fontWeight:300 }}>© 2026 Care Yelli · Tous droits réservés</div>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:13, color:"rgba(196,114,74,0.5)", fontStyle:"italic" }}>Organic. Natural. Luxurious.</div>
        </div>
      </div>
    </footer>
  );
}

// ─── Cookie Banner ────────────────────────────────────────────────
function CookieBanner() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("yelli_cookies")) setVisible(true);
  }, []);
  if (!visible) return null;
  return (
    <div style={{
      position:"fixed", bottom:0, left:0, right:0, zIndex:500,
      background:C.dark, padding:"16px 6%",
      display:"flex", alignItems:"center", justifyContent:"space-between",
      gap:16, flexWrap:"wrap", borderTop:`1px solid rgba(196,114,74,0.2)`,
    }}>
      <p style={{ fontFamily:"'Jost',sans-serif", fontSize:12, fontWeight:300, color:"rgba(237,229,216,0.65)", margin:0, lineHeight:1.6 }}>
        Ce site utilise des cookies pour améliorer votre expérience.{" "}
        <a href="#" style={{ color:C.goldLight, textDecoration:"underline" }}>En savoir plus</a>
      </p>
      <button
        onClick={() => { localStorage.setItem("yelli_cookies", "1"); setVisible(false); }}
        style={{
          background:C.ocre, color:C.ivory, border:"none", borderRadius:2,
          padding:"8px 28px", fontFamily:"'Jost',sans-serif",
          fontSize:10, letterSpacing:"0.2em", cursor:"pointer", whiteSpace:"nowrap", flexShrink:0,
        }}
      >ACCEPTER</button>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────
export default function CareYelliWebsite() {
  const [scrolled, setScrolled] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);
  const [openProduct, setOpenProduct] = useState(false);
  const [openNila, setOpenNila] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      <style>{FONTS}</style>
      <style>{`* { margin:0; padding:0; box-sizing:border-box; } body { background:${C.ivory}; } a:hover,button:hover { opacity:0.88; } ::-webkit-scrollbar { width:4px; } ::-webkit-scrollbar-track { background:${C.cream}; } ::-webkit-scrollbar-thumb { background:${C.ocre}; border-radius:2px; }`}</style>
      <style>{RESPONSIVE_CSS}</style>

      <TrustBar/>
      <NavBar scrolled={scrolled}/>
      <HeroSection/>
      <StatsBand/>
      <PhilosophySection/>
      <ProductsSection onOpen={setModalProduct} onOpenAntiAge={() => { setModalProduct(null); setOpenProduct(true); }} onOpenNila={() => { setModalProduct(null); setOpenNila(true); }}/>
      <IngredientsSection/>
      <ReviewsSection/>
      <ValuesSection/>
      <NewsletterSection/>
      <Footer/>
      <CookieBanner/>

      {openProduct && <ProductAntiAge onClose={() => setOpenProduct(false)}/>}
      {openNila && <ProductNila onClose={() => setOpenNila(false)}/>}
      {modalProduct && (
        <ProductModal product={modalProduct} onClose={() => setModalProduct(null)}/>
      )}
    </>
  );
}
