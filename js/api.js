const StudyApi = (() => {
  const configuredUrl = () => String(window.APP_CONFIG?.API_URL || "").trim();
  const isConfigured = () => /^https:\/\/script\.google\.com\/macros\/s\/.+\/exec/.test(configuredUrl());

  async function request(action, data = {}, options = {}) {
    if (!isConfigured()) throw new Error("API_NOT_CONFIGURED");
    const token = AuthStorage.load();
    if (!token) throw new Error("API_TOKEN_REQUIRED");
    const timeoutMs = Math.max(1000, Number(options.timeoutMs) || 30000);
    const controller = new AbortController();
    let timedOut = false;
    const abortFromCaller = () => controller.abort();
    if (options.signal?.aborted) controller.abort();
    else options.signal?.addEventListener("abort", abortFromCaller, { once:true });
    const timeoutId = window.setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, timeoutMs);

    try {
      const response = await fetch(configuredUrl(), {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ action, token, ...data, ownerId: ProfileStorage.getActiveId() }),
        redirect: "follow",
        signal: controller.signal
      });
      if (!response.ok) throw new Error(`HTTP_${response.status}`);
      const result = await response.json();
      if (!result.ok) throw new Error(result.error || "API_ERROR");
      return result.data;
    } catch (error) {
      if (controller.signal.aborted) throw new Error(timedOut ? "REQUEST_TIMEOUT" : "REQUEST_CANCELLED");
      throw error;
    } finally {
      window.clearTimeout(timeoutId);
      options.signal?.removeEventListener?.("abort", abortFromCaller);
    }
  }

  return {
    isConfigured,
    hasToken: () => Boolean(AuthStorage.load()),
    setToken: (token) => AuthStorage.save(token),
    clearToken: () => AuthStorage.clear(),
    getAll: () => request("getAll"),
    sync: (payload, options = {}) => request("sync", payload, options)
  };
})();
