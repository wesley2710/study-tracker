const StudyApi = (() => {
  const configuredUrl = () => String(window.APP_CONFIG?.API_URL || "").trim();
  const isConfigured = () => /^https:\/\/script\.google\.com\/macros\/s\/.+\/exec/.test(configuredUrl());

  async function request(action, data = {}) {
    if (!isConfigured()) throw new Error("API_NOT_CONFIGURED");
    const token = AuthStorage.load();
    if (!token) throw new Error("API_TOKEN_REQUIRED");
    const response = await fetch(configuredUrl(), {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ action, token, ...data }),
      redirect: "follow"
    });
    if (!response.ok) throw new Error(`HTTP_${response.status}`);
    const result = await response.json();
    if (!result.ok) throw new Error(result.error || "API_ERROR");
    return result.data;
  }

  return {
    isConfigured,
    hasToken: () => Boolean(AuthStorage.load()),
    setToken: (token) => AuthStorage.save(token),
    clearToken: () => AuthStorage.clear(),
    getAll: () => request("getAll"),
    sync: (payload) => request("sync", payload)
  };
})();
