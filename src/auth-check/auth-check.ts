export default async function AuthCheck(): Promise<boolean> {
    try {
        let token: string | null = null;

        if (typeof chrome !== "undefined" && chrome.storage?.local) {
            const result = await new Promise<{ token?: string }>((resolve) => {
                chrome.storage.local.get("token", (res) => resolve(res));
            });
            token = result.token || null;
        }

        if (!token) {
            token = localStorage.getItem("token");
        }

        if (!token) return false;

        const res = await fetch("http://localhost:3000/auth/validate", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            await removeToken();
            return false;
        }

        return true;
    } catch (err) {
        console.error("AuthCheck error:", err);
        await removeToken();
        return false;
    }
}

async function removeToken() {
    try {
        if (typeof chrome !== "undefined" && chrome.storage?.local) {
            await new Promise<void>((resolve) => {
                chrome.storage.local.remove("token", resolve);
            });
        }
        localStorage.removeItem("token");
    } catch (err) {
        console.error("Failed to remove token:", err);
    }
}
