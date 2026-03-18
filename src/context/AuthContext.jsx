import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true); // ⭐ Add this
  const [user, setUser] = useState(null);
  const [userExists, setUserExists] = useState(false);
  const [recordsList, setRecordsList] = useState([]);
  const [last5RecordsPlayed, setLast5RecordsPlayed] = useState([]);
  const [completeListeningHistory, setCompleteListeningHistory] = useState([]);
  
  const urlInUse = import.meta.env.VITE_BACKEND_URL;

  // 1. Listen for auth state changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. Fetch user data when session changes
  useEffect(() => {
    if (loading) return;
    
    if (!session?.access_token) {
      setUser(null);
      setUserExists(false);
      setRecordsList([]);
      setLast5RecordsPlayed([]);
      setCompleteListeningHistory([]);
      setUserLoading(false); // ⭐ Done loading if no session
      return;
    }

    let cancelled = false;

    const loadUser = async () => {
      setUserLoading(true); // ⭐ Start loading
      try {
        const res = await fetch(`${urlInUse}/api/user/me`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
          credentials: "include",
        });

        if (res.status === 401) {
          await supabase.auth.signOut();
          return;
        }

        const data = await res.json();

        if (cancelled) return;

        if (data.exists === false) {
          setUserExists(false);
          setUser(null);
          setRecordsList([]);
          setLast5RecordsPlayed([]);
          setCompleteListeningHistory([]);
        } else {
          setUserExists(true);
          setUser(data.user);
          setRecordsList(data.user.albumCollection || []);
          setLast5RecordsPlayed(data.user.last5AlbumsPlayed || []);
          setCompleteListeningHistory(data.user.completeListeningHistory || []);
        }
      } catch (err) {
        console.error("loadUser error:", err);
        if (err.message?.includes("Auth session missing")) {
          await supabase.auth.signOut();
        }
      } finally {
        if (!cancelled) setUserLoading(false); // ⭐ Done loading
      }
    };

    loadUser();

    return () => {
      cancelled = true;
    };
  }, [session, loading, urlInUse]);

  // 3. Helper functions
  const signOut = async () => {
    await supabase.auth.signOut();
    localStorage.clear();
    window.location.reload();
  };

  const connectDiscogs = async () => {
    try {
      const res = await fetch(`${urlInUse}/api/discogs/connect`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
        credentials: "include",
      });

      const data = await res.json();
      window.location.href = data.authorizeUrl;
    } catch (err) {
      console.error(err);
    }
  };

  const value = {
    session,
    accessToken: session?.access_token ?? null,
    loading,
    userLoading, // ⭐ Export this
    user,
    userExists,
    recordsList,
    setRecordsList,
    last5RecordsPlayed,
    setLast5RecordsPlayed,
    completeListeningHistory,
    setCompleteListeningHistory,
    signOut,
    connectDiscogs,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}