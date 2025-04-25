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

  if (isAuthenticated) {
    return;
  }

  const query = window.location.search;
  if (query.includes("code=") && query.includes("state=")) {
    await auth0Client.handleRedirectCallback();
    window.history.replaceState({}, document.title, "/");
  } else {
    await auth0Client.loginWithRedirect();
  }
}

async function logout() {
  auth0Client.logout({
    returnTo: window.location.origin,
  });
}

document.getElementById("logout").addEventListener("click", logout);

window.onload = async () => {
  await configureClient();
  await loginIfNeeded();
};