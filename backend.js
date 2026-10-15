// I premi stanno in un piccolo database (Supabase): Stella li cambia dalla pagina gestione.html.
// Se il database non risponde, l'app usa premi.json come scorta.
// I progressi di Luca restano sul suo telefono e ne parte una copia per Stella, che li vede in gestione.html.
window.PREMI_DB = {
  url: "https://wgtxmcmhjdamwublottu.supabase.co",
  key: "sb_publishable_EdDDuTWQsaCeA8bif_FJ9A_Y040lbT6"
};
(function () {
  const db = window.PREMI_DB;
  // Le prove di Stella (?prova) non toccano i progressi di Luca
  const prova = /[?&]prova\b/.test(location.search);
  function send(dati) {
    if (prova) return Promise.resolve();
    return fetch(db.url + "/rest/v1/rpc/salva_progressi", {
      method: "POST",
      headers: { apikey: db.key, "Content-Type": "application/json" },
      body: JSON.stringify({ dati }),
      keepalive: true
    });
  }
  window.BACKEND = {
    saveProgress: state => send(state || null),
    // All'apertura manda l'ultima copia, così anche i progressi già fatti arrivano a Stella
    boot: () => (typeof state !== "undefined" && state ? send(state) : Promise.resolve())
  };
})();
