export async function authUser(endpoint,data) {
    return fetch(`https://localhost:3000/api/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
    });
}
