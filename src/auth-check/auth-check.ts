export default async function AuthCheck(): Promise<boolean> {
  return new Promise((resolve) => {
    chrome.storage.local.get("token", (result) => {
      resolve(!!result.token);
    });
  });
}
