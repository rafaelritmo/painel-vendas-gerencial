// Proteção por senha no servidor (Edge Function — funciona no plano gratuito)
export default async (request: Request, context: Context) => {
  const auth = request.headers.get("Authorization");
  const USER = "painel";
  const PASS = "__PANEL_PASS__";
  const expected = "Basic " + btoa(USER + ":" + PASS);
  if (auth !== expected) {
    return new Response("<html><body style='font-family:sans-serif;text-align:center;padding-top:60px'><h2>Painel Gerencial</h2><p>Acesso restrito.</p></body></html>", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Painel Gerencial", charset="UTF-8"',
        "Content-Type": "text/html; charset=utf-8",
      },
    });
  }
  return context.next();
};
