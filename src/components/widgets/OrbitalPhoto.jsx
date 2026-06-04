import React from 'react';

export const OrbitalPhoto = ({ ME }) => {
  const orbiters = [
    { anim:"orbit 6s linear infinite",  color:"#ff3cac", icon:"devicon-react-original colored",   sz:30 },
    { anim:"orbit2 9s linear infinite", color:"#2de2e6", icon:"devicon-python-plain colored",      sz:28 },
    { anim:"orbit3 7s linear infinite", color:"#f6f740", icon:"devicon-nodejs-plain colored",      sz:28 },
  ];

  return (
    <div className="hero-orbital-container">
      {/* Anillos de rotación */}
      <div style={{ position:"absolute", width:"88%", height:"88%", borderRadius:"50%", border:"1px solid rgba(255,60,172,.2)", animation:"ringRotate 12s linear infinite", transformStyle:"preserve-3d" }} />
      <div style={{ position:"absolute", width:"100%", height:"100%", borderRadius:"50%", border:"1px solid rgba(45,226,230,.15)", animation:"ringRotate2 18s linear infinite", transformStyle:"preserve-3d" }} />
      
      {/* Iconos en órbita */}
      {orbiters.map((o,i) => (
        <div key={i} style={{ position:"absolute", width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ animation:o.anim, width:o.sz+12, height:o.sz+12, borderRadius:"50%", background:o.color+"22", border:`1px solid ${o.color}66`, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <i className={o.icon} style={{ fontSize:o.sz*.7 }} />
          </div>
        </div>
      ))}
      
      {/* Efecto de luz */}
      <div style={{ position:"absolute", width:"70%", height:"70%", background:"radial-gradient(circle,rgba(255,60,172,.15),transparent 70%)", filter:"blur(20px)" }} />
      
      {/* Foto de perfil */}
      <div className="hero-profile-circle">
        <div style={{ position:"absolute", inset:0, zIndex:3, pointerEvents:"none", background:"repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,.07) 3px,rgba(0,0,0,.07) 4px)" }} />
        <div style={{ position:"absolute", left:0, right:0, height:2, background:"rgba(255,60,172,.3)", zIndex:4, animation:"scanH 3s linear infinite" }} />
        <img src={ME.photo} alt={ME.name} style={{ width:"100%", height:"100%", objectFit:"cover", filter:"contrast(1.05) saturate(.9)" }} />
      </div>
      
      {/* Esquinas estéticas */}
      {[[-10,-10,"top","left"],[-10,null,"top","right"],[null,-10,"bottom","left"],[null,null,"bottom","right"]].map(([t,l,vt,hl],i) => (
        <div key={i} className="aesthetic-corner" style={{ position:"absolute", top:t!==null?t:undefined, left:l!==null?l:undefined, bottom:t===null?-10:undefined, right:l===null?-10:undefined, width:18, height:18, borderTop:vt==="top"?"2px solid #2de2e6":"none", borderBottom:vt==="bottom"?"2px solid #2de2e6":"none", borderLeft:hl==="left"?"2px solid #2de2e6":"none", borderRight:hl==="right"?"2px solid #2de2e6":"none", zIndex:5 }} />
      ))}
    </div>
  );
};