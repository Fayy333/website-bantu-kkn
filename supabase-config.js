// Supabase browser client configuration.
// Publishable keys are intended for frontend apps; never put a secret/service_role key here.
const KKN_SUPABASE_URL = "https://cwodvtvjjyitdfnwoivq.supabase.co";
const KKN_SUPABASE_PUBLISHABLE_KEY = "sb_publishable_4O7V06QKYa5y2hhgYshnTw_t-N9hHZF";

window.kknSupabase = window.supabase.createClient(
  KKN_SUPABASE_URL,
  KKN_SUPABASE_PUBLISHABLE_KEY
);

// Supabase email links need an HTTP(S) URL. A file:// page cannot be a redirect target.
window.KKN_AUTH_REDIRECT_URL = /^https?:$/.test(window.location.protocol)
  ? window.location.href
  : undefined;
