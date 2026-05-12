import { useState } from "react";
import { C, WA_NUMBER, PRODUCTS } from "./App.jsx";

// ─── Couleur d'accent Nila ────────────────────────────────────────
const NILA = "#7B9BAD";

// ─── Images ──────────────────────────────────────────────────────
const IMG_NILA = "/images/2.png";
const IMG_JAR  = "/images/jar.jpg";

// ─── Données produit ──────────────────────────────────────────────
const THUMBS = [IMG_NILA, IMG_JAR, IMG_NILA];

const KEY_INGREDIENTS = [
  { icon:"💙", name:"Nila (Indigo naturel)", origin:"Maghreb",           benefit:"Unifie & illumine le teint" },
  { icon:"💧", name:"Huile d'Argan bio",     origin:"Souss-Massa, Maroc", benefit:"Nourrit & protège" },
  { icon:"🌊", name:"Glycérine",             origin:"Naturelle",           benefit:"Hydratation longue durée" },
  { icon:"✨", name:"Vitamine E (Tocophérol)", origin:"Naturelle",          benefit:"Antioxydant, éclat" },
];

const INCI = "AQUA, STEARIC ACID, GLYCERIN, CETYL ALCOHOL, CETEARYL ALCOHOL, ARGANIA SPINOSA KERNEL OIL, INDIGOFERA SUFFRUTICOSA EXTRACT, TOCOPHERYL ACETATE, ETHYLHEXYLGLYCERIN, PARFUM";

const STEPS = [
  ["01", "Nettoyez votre visage",              "à l'eau tiède avant l'application"],
  ["02", "Prélevez une noisette de crème",     "et réchauffez-la légèrement entre vos paumes"],
  ["03", "Massez en mouvements circulaires",   "jusqu'à absorption complète sur visage et cou"],
];

const STATS = [
  { n:"5000",  label:"ans d'utilisation du Nila au Maghreb" },
  { n:"2 sem", label:"pour un teint visible plus unifié" },
  { n:"0",     label:"colorant artificiel, parfum synthétique" },
  { n:"1",     label:"ingrédient star : l'indigo naturel pur" },
];

const PRODUCT_REVIEWS = [
  { name:"Amina K.", city:"Agadir",   stars:5, text:"Mon teint est beaucoup plus unifié. Je l'utilise chaque matin, ma peau est lumineuse." },
  { name:"Sara B.",  city:"Rabat",    stars:5, text:"Texture légère, s'absorbe très vite. Le parfum est subtil et agréable." },
  { name:"Halima T.", city:"Agadir",  stars:4, text:"Très bonne crème, je vois la différence sur mes taches en 3 semaines." },
];

// ─── CSS responsive ───────────────────────────────────────────────
const PAGE_CSS = `
  .pn-hero    { display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:start; }
  .pn-stats   { display:grid; grid-template-columns:repeat(4,1fr); }
  .pn-reviews { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
  .pn-comps   { display:grid; grid-template-columns:repeat(2,1fr); gap:20px; }
  .pn-ings    { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }
  .pn-tabs    { display:flex; overflow-x:auto; scrollbar-width:none; -ms-overflow-style:none; }
  .pn-tabs::-webkit-scrollbar { display:none; }

  @media(max-width:768px){
    .pn-hero    { grid-template-columns:1fr !important; gap:32px !important; }
    .pn-stats   { grid-template-columns:repeat(2,1fr) !important; }
    .pn-reviews { grid-template-columns:1fr !important; }
    .pn-comps   { grid-template-columns:1fr !important; }
    .pn-ings    { grid-template-columns:repeat(2,1fr) !important; }
  }

  @media(max-width:480px){
    .pn-stats { grid-template-columns:repeat(2,1fr) !important; }
    .pn-ings  { grid-template-columns:repeat(2,1fr) !important; }
  }
`;

// ─── Zellige SVG ─────────────────────────────────────────────────
function ZPN({ opacity = 0.05 }) {
  return (
    <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="zpnila" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <g fill="none" stroke={NILA} strokeWidth="0.8" opacity={opacity}>
            <polygon points="30,2 58,15 58,45 30,58 2,45 2,15"/>
            <polygon points="30,12 48,20 48,40 30,48 12,40 12,20"/>
            <line x1="30" y1="2"  x2="30" y2="12"/><line x1="58" y1="15" x2="48" y2="20"/>
            <line x1="58" y1="45" x2="48" y2="40"/><line x1="30" y1="58" x2="30" y2="48"/>
            <line x1="2"  y1="45" x2="12" y2="40"/><line x1="2"  y1="15" x2="12" y2="20"/>
            <circle cx="30" cy="30" r="4"/>
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#zpnila)"/>
    </svg>
  );
}

// ─── Étoiles ─────────────────────────────────────────────────────
function Stars({ count, total = 5 }) {
  return (
    <div style={{ display:"flex", gap:3 }}>
      {Array.from({ length: total }).map((_, i) => (
        <span key={i} style={{ color: i < count ? C.gold : C.sand, fontSize:14 }}>★</span>
      ))}
    </div>
  );
}

// ─── Composant principal ──────────────────────────────────────────
export default function ProductNila({ onClose }) {
  const [activeImg, setActiveImg] = useState(IMG_NILA);
  const [qty, setQty]             = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    `Bonjour, je souhaite commander le Soin Hydratant Unifiant au Nila Care Yelli (210 MAD) — quantité : ${qty}`
  )}`;

  const complementary = PRODUCTS.filter(p => p.id !== "nila");

  return (
    <div style={{ position:"fixed", inset:0, zIndex:200, overflowY:"auto", background:C.ivory }}>
      <style>{PAGE_CSS}</style>

      {/* ── Barre retour sticky ───────────────────────────────── */}
      <div style={{
        position:"sticky", top:0, zIndex:50,
        background:"rgba(247,243,238,0.97)", backdropFilter:"blur(14px)",
        borderBottom:`1px solid ${C.sand}`,
      }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 6%", display:"flex", alignItems:"center", justifyContent:"space-between", height:60 }}>
          <button onClick={onClose} style={{
            display:"flex", alignItems:"center", gap:8,
            background:"none", border:"none", cursor:"pointer",
            fontFamily:"'Jost',sans-serif", fontSize:10, letterSpacing:"0.18em", color:C.darkMid,
          }}>← RETOUR</button>
          <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:16, color:C.dark }}>Soin Hydratant Unifiant au Nila</span>
          <div style={{ width:80 }}/>
        </div>
      </div>

      {/* ── Section 1 : Galerie + Infos ──────────────────────── */}
      <section style={{ padding:"56px 6% 80px", background:C.ivory }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div className="pn-hero">

            {/* Colonne gauche — galerie */}
            <div>
              <div style={{
                borderRadius:4, overflow:"hidden", background:C.cream,
                display:"flex", alignItems:"center", justifyContent:"center",
                height:460, position:"relative",
              }}>
                <ZPN opacity={0.06}/>
                <img
                  src={activeImg}
                  alt="Soin Hydratant Unifiant au Nila"
                  style={{ width:"100%", height:"100%", objectFit:"contain", padding:48, position:"relative", zIndex:1 }}
                />
              </div>
              <div style={{ display:"flex", gap:12, marginTop:14 }}>
                {THUMBS.map((src, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveImg(src)}
                    style={{
                      flex:1, height:88, borderRadius:3, overflow:"hidden",
                      background:C.cream, cursor:"pointer",
                      border:`2px solid ${activeImg === src ? NILA : "transparent"}`,
                      transition:"border-color 0.2s ease",
                    }}
                  >
                    <img src={src} alt="" style={{ width:"100%", height:"100%", objectFit:"contain", padding:10 }}/>
                  </div>
                ))}
              </div>
            </div>

            {/* Colonne droite — informations */}
            <div style={{ paddingTop:4 }}>
              {/* Breadcrumb */}
              <div style={{ fontFamily:"'Jost',sans-serif", fontSize:10, letterSpacing:"0.2em", color:NILA, marginBottom:18 }}>
                ACCUEIL &rsaquo; SOINS &rsaquo; SOIN HYDRATANT
              </div>
              {/* Badge */}
              <span style={{
                display:"inline-block", background:NILA, color:C.ivory,
                borderRadius:40, padding:"4px 16px",
                fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:"0.22em", marginBottom:20,
              }}>NOUVEAUTÉ</span>
              {/* Titre */}
              <h1 style={{
                fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(28px,3.5vw,40px)",
                color:C.dark, fontWeight:400, lineHeight:1.15, margin:"0 0 8px",
              }}>Soin Hydratant Unifiant</h1>
              {/* Sous-titre */}
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:18, fontStyle:"italic", color:C.gold, margin:"0 0 18px" }}>
                Huile d'argan bio et Nila pur
              </p>
              {/* Étoiles */}
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:22 }}>
                <Stars count={5}/>
                <span style={{ fontFamily:"'Jost',sans-serif", fontSize:12, color:C.darkMid, fontWeight:300 }}>(18 avis)</span>
              </div>
              {/* Prix */}
              <div style={{ display:"flex", alignItems:"baseline", gap:14, marginBottom:20 }}>
                <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:32, color:C.dark, fontWeight:400 }}>210 MAD</span>
                <span style={{ fontFamily:"'Jost',sans-serif", fontSize:10, color:C.gold, letterSpacing:"0.15em" }}>50ml</span>
              </div>
              <div style={{ height:1, background:C.sand, marginBottom:22 }}/>
              {/* Promesse */}
              <p style={{ fontFamily:"'Jost',sans-serif", fontSize:14, fontWeight:300, color:C.darkMid, fontStyle:"italic", lineHeight:1.85, marginBottom:28 }}>
                "Le secret des artisanes du Maghreb. Le Nila pur, indigo naturel transmis de génération en génération, pour un teint unifié et lumineux."
              </p>
              {/* Quantité */}
              <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:22 }}>
                <span style={{ fontFamily:"'Jost',sans-serif", fontSize:10, letterSpacing:"0.2em", color:C.darkMid }}>QUANTITÉ</span>
                <div style={{ display:"flex", alignItems:"center", border:`1px solid ${C.sand}`, borderRadius:2, overflow:"hidden" }}>
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    style={{ width:38, height:38, background:"none", border:"none", cursor:"pointer", fontFamily:"'Jost',sans-serif", fontSize:18, color:C.dark, lineHeight:1 }}
                  >−</button>
                  <span style={{
                    width:44, textAlign:"center", fontFamily:"'Jost',sans-serif", fontSize:13, color:C.dark,
                    borderLeft:`1px solid ${C.sand}`, borderRight:`1px solid ${C.sand}`, lineHeight:"38px",
                  }}>{qty}</span>
                  <button
                    onClick={() => setQty(q => Math.min(5, q + 1))}
                    style={{ width:38, height:38, background:"none", border:"none", cursor:"pointer", fontFamily:"'Jost',sans-serif", fontSize:18, color:C.dark, lineHeight:1 }}
                  >+</button>
                </div>
              </div>
              {/* CTAs */}
              <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:28 }}>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display:"block", textAlign:"center",
                    background:NILA, color:C.ivory, borderRadius:2,
                    padding:"15px 24px", fontFamily:"'Jost',sans-serif",
                    fontSize:11, letterSpacing:"0.22em", textDecoration:"none",
                  }}
                >📱 COMMANDER VIA WHATSAPP</a>
                <button style={{
                  width:"100%", background:"transparent", color:C.dark,
                  border:`1px solid ${C.dark}`, borderRadius:2,
                  padding:"15px 24px", fontFamily:"'Jost',sans-serif",
                  fontSize:11, letterSpacing:"0.22em", cursor:"pointer",
                }}>AJOUTER AU PANIER</button>
              </div>
              {/* Rassurance */}
              <div style={{ display:"flex", gap:20, flexWrap:"wrap" }}>
                {["🌿 100% Naturel", "🚚 Livraison Agadir"].map(item => (
                  <span key={item} style={{ fontFamily:"'Jost',sans-serif", fontSize:10, color:C.darkMid, letterSpacing:"0.1em" }}>{item}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2 : Onglets ───────────────────────────────── */}
      <section style={{ background:C.white, borderTop:`1px solid ${C.sand}`, borderBottom:`1px solid ${C.sand}` }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 6%" }}>
          {/* Nav onglets */}
          <div className="pn-tabs" style={{ borderBottom:`1px solid ${C.sand}` }}>
            {[["description","DESCRIPTION"],["ingredients","INGRÉDIENTS"],["utilisation","UTILISATION"]].map(([id, label]) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                style={{
                  background:"none", border:"none", cursor:"pointer",
                  padding:"20px 32px", fontFamily:"'Jost',sans-serif",
                  fontSize:10, letterSpacing:"0.22em", whiteSpace:"nowrap",
                  color: activeTab === id ? NILA : C.darkMid,
                  borderBottom: activeTab === id ? `2px solid ${NILA}` : "2px solid transparent",
                  transition:"all 0.2s ease",
                }}
              >{label}</button>
            ))}
          </div>

          {/* Contenu onglet */}
          <div style={{ padding:"48px 0 64px" }}>

            {/* ── Description ── */}
            {activeTab === "description" && (
              <p style={{ maxWidth:720, fontFamily:"'Jost',sans-serif", fontSize:15, fontWeight:300, color:C.darkMid, lineHeight:1.9, margin:0 }}>
                Le Nila — indigo naturel du Maghreb — est le secret de beauté des femmes berbères depuis des siècles. Utilisé dans les rituels du hammam pour unifier et illuminer le teint, il trouve ici sa forme la plus aboutie : une crème hydratante légère enrichie d'huile d'argan bio du Souss-Massa, pressée à froid par des coopératives de femmes. Texture soyeuse, absorption immédiate. Résultat : un teint unifié, lumineux, perfecteur. Convient aux peaux ternes et irrégulières.
              </p>
            )}

            {/* ── Ingrédients ── */}
            {activeTab === "ingredients" && (
              <div>
                <div className="pn-ings" style={{ marginBottom:36 }}>
                  {KEY_INGREDIENTS.map(ing => (
                    <div key={ing.name} style={{ background:C.cream, borderRadius:4, padding:"28px 20px", textAlign:"center" }}>
                      <div style={{ fontSize:28, marginBottom:12 }}>{ing.icon}</div>
                      <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:17, color:C.dark, fontWeight:400, marginBottom:4 }}>{ing.name}</div>
                      <div style={{ fontFamily:"'Jost',sans-serif", fontSize:9, color:C.gold, letterSpacing:"0.15em", marginBottom:10 }}>{ing.origin.toUpperCase()}</div>
                      <div style={{ fontFamily:"'Jost',sans-serif", fontSize:11, color:NILA, fontWeight:300 }}>{ing.benefit}</div>
                    </div>
                  ))}
                </div>
                <div style={{ padding:"20px 24px", background:C.cream, borderRadius:4 }}>
                  <div style={{ fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:"0.3em", color:C.gold, marginBottom:10 }}>LISTE INCI COMPLÈTE</div>
                  <p style={{ fontFamily:"'Jost',sans-serif", fontSize:11, fontWeight:300, color:C.darkMid, lineHeight:1.85, margin:0 }}>{INCI}</p>
                </div>
              </div>
            )}

            {/* ── Utilisation ── */}
            {activeTab === "utilisation" && (
              <div style={{ maxWidth:600 }}>
                {STEPS.map(([num, title, detail]) => (
                  <div key={num} style={{ display:"flex", gap:28, marginBottom:40 }}>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:40, color:C.sand, fontWeight:300, lineHeight:1, flexShrink:0, minWidth:52 }}>{num}</div>
                    <div style={{ borderTop:`1px solid ${C.sand}`, paddingTop:12, flex:1 }}>
                      <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, color:C.dark, fontWeight:400, marginBottom:6 }}>{title}</div>
                      <div style={{ fontFamily:"'Jost',sans-serif", fontSize:13, fontWeight:300, color:C.darkMid, lineHeight:1.7 }}>{detail}</div>
                    </div>
                  </div>
                ))}
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:16, fontStyle:"italic", color:C.gold, margin:"8px 0 0" }}>
                  Matin et soir. Effet perfecteur visible dès 2 semaines. Peaux ternes, tous types de peau.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Section 3 : Pourquoi le Nila ? ───────────────────── */}
      <section style={{ background:C.cream, padding:"80px 6%", position:"relative", overflow:"hidden" }}>
        <ZPN opacity={0.06}/>
        <div style={{ maxWidth:1200, margin:"0 auto", position:"relative", zIndex:1 }}>
          <div style={{ textAlign:"center", marginBottom:52 }}>
            <div style={{ fontFamily:"'Jost',sans-serif", fontSize:10, letterSpacing:"0.5em", color:NILA, marginBottom:16 }}>◦ L'INGRÉDIENT STAR ◦</div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(24px,4vw,44px)", color:C.dark, fontWeight:400, margin:0 }}>
              Pourquoi le <em>Nila</em> ?
            </h2>
          </div>
          <div className="pn-stats" style={{ background:NILA, borderRadius:4, overflow:"hidden" }}>
            {STATS.map((s, i) => (
              <div
                key={s.n}
                style={{
                  padding:"48px 28px", textAlign:"center",
                  borderRight: i < STATS.length - 1 ? "1px solid rgba(253,250,246,0.15)" : "none",
                }}
              >
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(32px,5vw,52px)", color:C.ivory, fontWeight:300, marginBottom:10 }}>{s.n}</div>
                <div style={{ fontFamily:"'Jost',sans-serif", fontSize:9, color:"rgba(253,250,246,0.72)", letterSpacing:"0.15em", lineHeight:1.6 }}>
                  {s.label.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4 : Avis clients ──────────────────────────── */}
      <section style={{ background:C.ivory, padding:"80px 6%" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(24px,3.5vw,40px)", color:C.dark, fontWeight:400, margin:0 }}>
              Elles l'ont essayé. <em>Elles témoignent.</em>
            </h2>
          </div>
          <div className="pn-reviews">
            {PRODUCT_REVIEWS.map((r, i) => (
              <div key={i} style={{ background:C.cream, borderRadius:4, padding:"32px 28px", position:"relative" }}>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:52, color:C.sand, lineHeight:1, position:"absolute", top:12, left:24, opacity:0.5 }}>"</div>
                <Stars count={r.stars}/>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:17, fontStyle:"italic", color:C.dark, lineHeight:1.75, margin:"16px 0 24px", position:"relative", zIndex:1 }}>
                  « {r.text} »
                </p>
                <div style={{ display:"flex", alignItems:"center", gap:12, borderTop:`1px solid ${C.sand}`, paddingTop:18 }}>
                  <div style={{
                    width:34, height:34, borderRadius:"50%", background:NILA, flexShrink:0,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontFamily:"'Cormorant Garamond',serif", fontSize:15, color:C.ivory,
                  }}>{r.name[0]}</div>
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

      {/* ── Section 5 : Produits complémentaires ─────────────── */}
      <section style={{ background:C.cream, padding:"80px 6%", position:"relative", overflow:"hidden" }}>
        <ZPN opacity={0.04}/>
        <div style={{ maxWidth:1200, margin:"0 auto", position:"relative", zIndex:1 }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <div style={{ fontFamily:"'Jost',sans-serif", fontSize:10, letterSpacing:"0.5em", color:NILA, marginBottom:16 }}>◦ COMPLÉTEZ VOTRE RITUEL ◦</div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(24px,3.5vw,38px)", color:C.dark, fontWeight:400, margin:0 }}>
              Les autres soins <em>Yelli</em>
            </h2>
          </div>
          <div className="pn-comps">
            {complementary.map(p => (
              <div key={p.id} style={{ background:C.ivory, borderRadius:4, overflow:"hidden", display:"flex" }}>
                <div style={{ width:136, flexShrink:0, background:C.cream, display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
                  <img src={p.image} alt={p.name} style={{ width:"100%", height:120, objectFit:"contain" }}/>
                </div>
                <div style={{ padding:"24px 20px", flex:1, display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
                  <div>
                    <div style={{ fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:"0.3em", color:p.color, marginBottom:6 }}>{p.label.toUpperCase()}</div>
                    <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:18, color:C.dark, fontWeight:400, margin:"0 0 4px" }}>{p.name}</h3>
                    <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:13, fontStyle:"italic", color:C.gold, margin:"0 0 14px" }}>{p.subtitle}</p>
                  </div>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, color:C.dark, fontWeight:400 }}>{p.price}</span>
                    <a
                      href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Bonjour, je souhaite commander le soin ${p.name} - Care Yelli`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background:p.color, color:C.ivory, borderRadius:2,
                        padding:"8px 16px", fontFamily:"'Jost',sans-serif",
                        fontSize:9, letterSpacing:"0.2em", textDecoration:"none",
                      }}
                    >COMMANDER</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA sticky bas de page ────────────────────────────── */}
      <div style={{
        position:"sticky", bottom:0, zIndex:40,
        background:"rgba(247,243,238,0.97)", backdropFilter:"blur(12px)",
        borderTop:`1px solid ${C.sand}`, padding:"14px 6%",
        display:"flex", gap:12, alignItems:"center",
      }}>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flex:1, textAlign:"center", background:NILA, color:C.ivory,
            borderRadius:2, padding:"13px 24px", fontFamily:"'Jost',sans-serif",
            fontSize:10, letterSpacing:"0.2em", textDecoration:"none",
          }}
        >COMMANDER — 210 MAD</a>
        <button
          onClick={onClose}
          style={{
            background:"none", border:`1px solid ${C.sand}`, borderRadius:2,
            padding:"13px 20px", fontFamily:"'Jost',sans-serif",
            fontSize:10, letterSpacing:"0.15em", cursor:"pointer", color:C.darkMid, whiteSpace:"nowrap",
          }}
        >← RETOUR</button>
      </div>
    </div>
  );
}
