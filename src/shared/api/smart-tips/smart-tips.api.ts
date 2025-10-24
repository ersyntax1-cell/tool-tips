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

export async function getSmartTips(
    domain: string
) {
    try {
        const res = await api.get(`/tool-tip/all/${domain}`);
        return res.data;
    } catch (error: any) {
        const message = error?.response?.data?.message || error.message || 'Smart Tips get error.';
        throw new Error(message);
    }
}

export async function removeSmartTip (id: string) {
    try {
        const res = await api.delete(`/tool-tip/remove/${id}`);
        return res.data;
    } catch (error: any) {
        const message = error?.response?.data?.message || error.message || 'Smart Tips remove error.';
        throw new Error(message);
    }
}

export async function editSmartTip (
    id: string,
    data: any
) {
    try {
        const res = await apiForm.put(`/tool-tip/edit/${id}`, data);
        return res.data;
    } catch (error: any) {
        const message = error?.response?.data?.message || error.message || 'Smart Tips edit error.';
        throw new Error(message);
    }
}