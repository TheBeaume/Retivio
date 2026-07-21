import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ayuoissdkkkvlsvtrgto.supabase.co";

const supabaseAnonKey =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5dW9pc3Nka2trdmxzdnRyZ3RvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzMjExMTUsImV4cCI6MjA5Nzg5NzExNX0.lEwwQ1yZulGuKKghZiI4DP4jTO21e6SNccp9X7El55o ";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);
