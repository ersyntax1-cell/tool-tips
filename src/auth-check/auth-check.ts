export default async function AuthCheck(): Promise<boolean> {
  try {
    const token = localStorage.getItem("token");
    if (!token) return false;

    return true;
  } catch (err) {
    console.error("AuthCheck error:", err);
    localStorage.removeItem("token");
    return false;
  }
}
