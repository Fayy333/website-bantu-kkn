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

  async function push(storageKey, value) {
    const table = tableByStorageKey[storageKey];
    if (!table || !(await getSession())) return;

    const { error } = await window.kknSupabase
      .from(table)
      .upsert({
        id: "state",
        data: value,
        updated_at: new Date().toISOString()
      });

    if (error) console.error(`Supabase sync failed for ${table}:`, error);
  }

  async function pull() {
    if (!(await getSession())) return false;

    for (const [storageKey, table] of Object.entries(tableByStorageKey)) {
      const { data, error } = await window.kknSupabase
        .from(table)
        .select("data")
        .eq("id", "state")
        .maybeSingle();

      if (error) {
        console.error(`Supabase load failed for ${table}:`, error);
        continue;
      }

      if (data?.data !== undefined) {
        localStorage.setItem(storageKey, JSON.stringify(data.data));
      }
    }

    return true;
  }

  async function seedOrPull() {
    if (!(await getSession())) return false;

    for (const [storageKey, table] of Object.entries(tableByStorageKey)) {
      const { data, error } = await window.kknSupabase
        .from(table)
        .select("data")
        .eq("id", "state")
        .maybeSingle();

      if (error) continue;
      if (data?.data !== undefined) {
        localStorage.setItem(storageKey, JSON.stringify(data.data));
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
