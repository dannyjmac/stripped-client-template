import { supabase } from "../config/SupabaseInit";
import { definitions } from "../types/supabase";

export default class SupabaseAuth {
  signUp = async (email: string, username: string, password: string) => {
    try {
      const { user, session, error } = await supabase.auth.signIn({});
      return { user, session, error };
    } catch (error) {
      console.log({ error });
    }
  };

  login = async (email: string, password: string) => {
    console.log("got here", email, password);
    // try {
    //   const { user, session, error } = await supabase.auth.signIn({});
    //   return { user, session, error };
    // } catch (error) {
    //   console.log({ error });
    // }
  };

  signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      return error;
    } catch (error) {
      console.log({ error });
    }
  };

  updateCurrentUser = async (name: string | null = null) => {
    const user = supabase.auth.user();
    const { id } = user ?? {};

    if (!name) return;

    try {
      const { data, error } = await supabase
        .from("users")
        .update({ name })
        .eq("id", id);

      return { data, error };
    } catch (error) {
      console.log({ error });
    }
  };

  fetchCurrentUser = async () => {
    const currentUser = supabase.auth.user();
    const { id } = currentUser ?? {};

    try {
      const { data: user, error } = await supabase
        .from<definitions["users"]>("users")
        .select(
          `organizations (
        name
        ), belongs_to_organization, id, email, name`
        )
        .eq("id", id);

      if (error) return null;
      return user?.[0];
    } catch (error) {
      console.log({ error });
    }
  };

  //   signUp = async (email: string, username: string, password: string) => {
  //     try {
  //       const data = await this.api.post("/signUp", {
  //         email,
  //         username,
  //         password,
  //       });

  //       return data;
  //     } catch (err) {
  //       console.log({ err });
  //     }
  //   };

  //   login = async (email: string, password: string) => {
  //     try {
  //       const data = await this.api.post("/login", {
  //         email,
  //         password,
  //       });

  //       return data;
  //     } catch (err) {
  //       console.log({ err });
  //     }
  //   };
}
