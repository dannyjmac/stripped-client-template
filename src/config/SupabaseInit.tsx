import { createClient, SupabaseClient } from "@supabase/supabase-js";
import React, { FC } from "react";
import { SupabaseContextProvider } from "use-supabase";

export const supabase: SupabaseClient = createClient(
  process.env.REACT_APP_SUPABASE_URL ?? "",
  process.env.REACT_APP_SUPABASE_KEY ?? "",
  {
    autoRefreshToken: true,
    persistSession: true,
  }
);

export const SupabaseWrapper: FC = ({ children }) => (
  <SupabaseContextProvider client={supabase}>
    {children}
  </SupabaseContextProvider>
);
