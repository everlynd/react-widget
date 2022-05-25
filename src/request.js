import axios from 'axios';
import {stringify} from 'qs';


const createRequestConfig = (url, method, params, data, blob, useBaseUrl) => {
    const config = {
        url,
        method,
        params,
        data,
        headers: {},
        paramsSerializer: params => stringify(params, {arrayFormat: 'repeat'}),
    };
    const token = localStorage.getItem('accessToken');
    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    if (blob) config.responseType = 'blob';
    if (baseUrl && useBaseUrl) config.baseURL = baseUrl;
    return config;
};

export const request = async (url, method = 'GET', params = {}, data = {}, blob = false, useBaseUrl = true) => {
    try {
        const config = createRequestConfig(url, method, params, data, blob, useBaseUrl);
        const response = await axios.request(config);
        return {success: true, payload: response.data, code: response.status};
    } catch (e) {
        if (!e.response) return {success: false, error: 'Что-то пошло не так', code: e.response?.status};

        return {success: false, error: translate(e?.response?.data?.message), code: e.response.status}
    }
}
