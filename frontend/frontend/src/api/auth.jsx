import Cookies from 'js-cookie';

const API_BASE_URL = 'http://localhost:8080/api';

const getNewAccessToken = async () => {
    try {
        const refreshToken = Cookies.get('refreshToken');
        const response = await fetch(`${API_BASE_URL}/auth/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({refreshToken: refreshToken }),
        });

        if (!response.ok) {
            throw new Error('Token refresh failed');
        }

        const data = await response.json();
        const accessToken = data.accessToken;

        const accessTokenData = JSON.parse(atob(accessToken.split('.')[1]));

        Cookies.set('accessToken', accessToken, {expires: new Date(accessTokenData.exp * 1000)});

    } catch (error) {
        console.error('Error refreshing token:', error);
        throw error;
    }
};

const fetchWithAuth = async (url, options = {}) => {
    try {
        const accessToken = Cookies.get('accessToken');
        const response = await fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (response.status === 403) {
            await getNewAccessToken();
            const newAccessToken = Cookies.get('accessToken');
            return fetch(url, {
                ...options,
                headers: {
                    ...options.headers,
                    'Authorization': `Bearer ${newAccessToken}`,
                },
            });
        }

        return response;
    } catch (error) {
        console.error('Error during fetch with auth:', error);
        throw error;
    }
};

const logout = () => {
    Cookies.remove('accessToken', { path: '/' });
    Cookies.remove('refreshToken', { path: '/' });
    Cookies.remove('user', { path: '/' });

    console.log('User logged out successfully');
};

export { fetchWithAuth, getNewAccessToken, logout };