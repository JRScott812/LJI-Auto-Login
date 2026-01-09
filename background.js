// Persist and restore intended app URL when auth redirects to login

const LOGIN_HOST = 'login.searchlightdata.org';
const APP_HOST = 'searchlight.ljiapps.com';
const EXPIRY_MS = 5 * 60 * 1000; // 5 minutes

const pendingRedirect = new Set();

function storageArea() {
  // Use session storage if available to avoid persisting across browser restarts
  return chrome.storage?.session || chrome.storage.local;
}

function keyFor(tabId) {
  return `tab:${tabId}`;
}

async function saveIntended(tabId, url) {
  if (!Number.isInteger(tabId) || tabId < 0) return;
  try {
    const area = storageArea();
    const data = {};
    data[keyFor(tabId)] = { url, expiresAt: Date.now() + EXPIRY_MS };
    await area.set(data);
  } catch (e) {
    console.warn('Failed saving intended URL', e);
  }
}

async function getIntended(tabId) {
  const area = storageArea();
  const k = keyFor(tabId);
  const res = await area.get(k);
  const entry = res[k];
  if (!entry) return null;
  if (entry.expiresAt && entry.expiresAt < Date.now()) {
    await area.remove(k);
    return null;
  }
  return entry.url || null;
}

async function clearIntended(tabId) {
  try {
    await storageArea().remove(keyFor(tabId));
  } catch (e) {
    console.warn('Failed clearing intended URL', e);
  }
}

function sameOrigin(a, b) {
  try {
    const ua = new URL(a);
    const ub = new URL(b);
    return ua.origin === ub.origin;
  } catch { return false; }
}

function urlsEqualish(a, b) {
  try {
    const ua = new URL(a);
    const ub = new URL(b);
    const strip = (u) => `${u.origin}${u.pathname.replace(/\/$/, '')}${u.search}`;
    return strip(ua) === strip(ub);
  } catch { return false; }
}

// 1) Capture when the app redirects to the login domain; remember the original app URL per tab
chrome.webRequest.onBeforeRedirect.addListener(
  async (details) => {
    if (details.type !== 'main_frame') return;
    const fromUrl = details.url;
    const toUrl = details.redirectUrl || '';
    try {
      const toHost = new URL(toUrl).host;
      if (toHost === LOGIN_HOST) {
        await saveIntended(details.tabId, fromUrl);
      }
    } catch (_) {
      /* ignore URL parse errors */
    }
  },
  { urls: [
      `https://${APP_HOST}/*`
    ], types: ['main_frame'] }
);

// 2) After login finishes and we land back on the app, restore the intended URL
chrome.webNavigation.onCommitted.addListener(async (details) => {
  if (details.frameId !== 0) return; // main frame only
  const currentUrl = details.url;
  let host = '';
  try { host = new URL(currentUrl).host; } catch { return; }

  if (host !== APP_HOST) return;

  // Avoid loops during our own redirect
  if (pendingRedirect.has(details.tabId)) {
    pendingRedirect.delete(details.tabId);
    // On successful redirect arrival, clear any leftover state
    const intended = await getIntended(details.tabId);
    if (intended && urlsEqualish(intended, currentUrl)) {
      await clearIntended(details.tabId);
    }
    return;
  }

  const intended = await getIntended(details.tabId);
  if (!intended) return;

  // If we're already at the intended URL (or equivalent), clean up and stop
  if (urlsEqualish(intended, currentUrl)) {
    await clearIntended(details.tabId);
    return;
  }

  // Only redirect if it's the same origin and the intended points to our app host
  if (!sameOrigin(intended, `https://${APP_HOST}/`)) {
    await clearIntended(details.tabId);
    return;
  }

  try {
    pendingRedirect.add(details.tabId);
    await chrome.tabs.update(details.tabId, { url: intended });
    // We'll clear state on the next onCommitted when we arrive
  } catch (e) {
    pendingRedirect.delete(details.tabId);
    console.warn('Failed to update tab to intended URL', e);
  }
});
