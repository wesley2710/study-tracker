const StudyApi = (() => {
  const configuredUrl = () => String(window.APP_CONFIG?.API_URL || "").trim();
  const isConfigured = () => /^https:\/\/script\.google\.com\/macros\/s\/.+\/exec/.test(configuredUrl());

  async function request(action, data = {}) {
    if (!isConfigured()) throw new Error("API_NOT_CONFIGURED");
    const response = await fetch(configuredUrl(), {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ action, ...data }),
      redirect: "follow"
    });
    if (!response.ok) throw new Error(`HTTP_${response.status}`);
    const result = await response.json();
    if (!result.ok) throw new Error(result.error || "API_ERROR");
    return result.data;
  }

  return { isConfigured, getAll: () => request("getAll"), sync: (payload) => request("sync", payload) };
})();
