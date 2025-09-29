export async function handleRequest<T>(request: Promise<{ data: T }>): Promise<T> {
    try {
        const res = await request;
        return res.data;
    } catch (error: any) {
        const message = error?.response?.data?.message || error.message || 'Server Error.';
        throw new Error(message);
    }
}
