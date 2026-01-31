export const userSessionServices = {
  mySession: async function () {
    try {
      const res = await fetch("/api/session", {
        cache: "no-store",
      });

      const data = await res.json();

      if (!data?.session) {
        return { data: null, error: "No session" };
      }

      return { data: data.session, error: null };
    } catch (err) {
      console.error(err);
      return { data: null, error: "Something went wrong" };
    }
  },
};
