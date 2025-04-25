const auth0Domain = "dev-3d1m7ntqe7vo2bbs.us.auth0.com";
const auth0ClientId = "78P7iiI4lMCxaW66qMLixKOt84ZgFP9f";

let auth0Client;

async function configureClient() {
  auth0Client = await createAuth0Client({
    domain: auth0Domain,
    client_id: auth0ClientId,
    redirect_uri: window.location.origin,
  });
}

async function loginIfNeeded() {
  const isAuthenticated = await auth0Client.isAuthenticated();

  if (!isAuthenticated) {
    const query = window.location.search;
    if (query.includes("code=") && query.includes("state=")) {
      await auth0Client.handleRedirectCallback();
      window.history.replaceState({}, document.title, "/");
    } else {
      document.body.innerHTML = "<p style='font-size: 18px;'>⌛ Redirigiendo al login...</p>";
      await auth0Client.loginWithRedirect();
      return;
    }
  }

  // Mostrar contenido si está autenticado
  document.getElementById("app").style.display = "block";
}

async function logout() {
  auth0Client.logout({
    returnTo: window.location.origin,
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  await configureClient();
  await loginIfNeeded();
  const user = await auth0Client.getUser();
console.log("Usuario logueado:", user);

// Lista blanca de emails permitidos
const emailsAutorizados = [
  "vgamoparejo@gmail.com",
];

// Verifica si el usuario está autorizado
if (!emailsAutorizados.includes(user.email)) {
  document.body.innerHTML = "<h2>🚫 Acceso no autorizado</h2><p>Este correo no está autorizado para ver el dashboard.</p>";
  return;
}


  const logoutBtn = document.getElementById("logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
  }
});
