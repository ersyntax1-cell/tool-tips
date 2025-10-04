import { api, apiForm } from "../api";


export async function createSmartTips(
    data: any
) {
    try {
        const res = await apiForm.post('/tool-tip/create', data);
        return res.data;
    } catch (error: any) {
        const message = error?.response?.data?.message || error.message || 'Smart Tips add error.';
        throw new Error(message);
    }
}

export async function getSmartTips() {
    try {
        const res = await api.get('/tool-tip/all');
        return res.data;
    } catch (error: any) {
        const message = error?.response?.data?.message || error.message || 'Smart Tips get error.';
        throw new Error(message);
    }
}

export async function removeSmartTip (id: string) {
    try {
        const res = await api.post(`/tool-tip/remove/${id}`);
        return res.data;
    } catch (error: any) {
        const message = error?.response?.data?.message || error.message || 'Smart Tips remove error.';
        throw new Error(message);
    }
}