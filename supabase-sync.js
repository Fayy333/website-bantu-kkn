// Cloud sync adapter for the existing localStorage-based app.
(function () {
  const tableByStorageKey = {
    kkn_settings: "kkn_settings",
    kkn_links: "kkn_links",
    kkn_schedules: "kkn_schedules",
    kkn_letters: "kkn_letters",
    kkn_email_logs: "kkn_email_logs"
  };

  async function getSession() {
    if (!window.kknSupabase) return null;
    const { data } = await window.kknSupabase.auth.getSession();
    return data?.session || null;
  }

  function localChangedAt(storageKey) {
    return Number(localStorage.getItem(`kkn_local_changed_${storageKey}`)) || 0;
  }

  function setLocalChangedAt(storageKey, timestamp) {
    localStorage.setItem(`kkn_local_changed_${storageKey}`, String(timestamp));
  }

  async function push(storageKey, value, changedAt = Date.now()) {
    const table = tableByStorageKey[storageKey];
    if (!table || !(await getSession())) return;

    const { error } = await window.kknSupabase
      .from(table)
      .upsert({
        id: "state",
        data: value,
        updated_at: new Date(changedAt).toISOString()
      });

    if (error) console.error(`Supabase sync failed for ${table}:`, error);
    else setLocalChangedAt(storageKey, changedAt);
  }

  async function pull() {
    if (!(await getSession())) return false;

    for (const [storageKey, table] of Object.entries(tableByStorageKey)) {
      const { data, error } = await window.kknSupabase
        .from(table)
        .select("data, updated_at")
        .eq("id", "state")
        .maybeSingle();

      if (error) {
        console.error(`Supabase load failed for ${table}:`, error);
        continue;
      }

      if (data?.data === undefined) continue;

      const cloudChangedAt = Date.parse(data.updated_at) || 0;
      const localUpdatedAt = localChangedAt(storageKey);
      if (localUpdatedAt > cloudChangedAt) {
        const localData = localStorage.getItem(storageKey);
        if (localData) await push(storageKey, JSON.parse(localData), localUpdatedAt);
      } else {
        localStorage.setItem(storageKey, JSON.stringify(data.data));
        setLocalChangedAt(storageKey, cloudChangedAt);
      }
    }

    return true;
  }

  async function seedOrPull() {
    if (!(await getSession())) return false;

    for (const [storageKey, table] of Object.entries(tableByStorageKey)) {
      const { data, error } = await window.kknSupabase
        .from(table)
        .select("data, updated_at")
        .eq("id", "state")
        .maybeSingle();

      if (error) continue;
      if (data?.data !== undefined) {
        const cloudChangedAt = Date.parse(data.updated_at) || 0;
        const localUpdatedAt = localChangedAt(storageKey);
        if (localUpdatedAt > cloudChangedAt) {
          const localData = localStorage.getItem(storageKey);
          if (localData) await push(storageKey, JSON.parse(localData), localUpdatedAt);
        } else {
          localStorage.setItem(storageKey, JSON.stringify(data.data));
          setLocalChangedAt(storageKey, cloudChangedAt);
        }
      } else {
        const localData = localStorage.getItem(storageKey);
        if (localData) await push(storageKey, JSON.parse(localData));
      }
    }

    return true;
  }

  function subscribe() {
    if (!window.kknSupabase) return;

    Object.values(tableByStorageKey).forEach((table) => {
      window.kknSupabase
        .channel(`kkn-${table}`)
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table },
          async () => {
            await pull();
            window.location.reload();
          }
        )
        .subscribe();
    });
  }

  window.KKN_CLOUD = { getSession, pull, push, seedOrPull, subscribe };
})();
