import axios from 'axios';

export const getToken = async (sessionId: string) => {
    const session = await createSession(sessionId);
    return await createToken(session);
};

const createSession = async (sessionId: string) => {
    const response = await axios.post("https://i9a305.p.ssafy.io" + '/api/sessions', { customSessionId: sessionId }, {
        headers: { 'Content-Type': 'application/json', },
    });
    return response.data; // The sessionId
}

const createToken = async (sessionId: string) => {
    const response = await axios.post("https://i9a305.p.ssafy.io" + '/api/sessions/' + sessionId + '/connections', {}, {
         headers: { 'Content-Type': 'application/json', },
    });
    return response.data; // The token
}