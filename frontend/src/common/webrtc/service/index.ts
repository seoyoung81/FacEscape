import axios from 'axios';

export const getToken = async (sessionId: string, memberId: number) => {
    const session = await createSession(sessionId, memberId);
    return await createToken(session);
};

const createSession = async (sessionId: string, memberId: number) => {
    const response = await axios.post("http://localhost:3050/" + '/api/sessions', 
    { 
        customSessionId: sessionId,
        memberId: memberId
    }, 
    {
        headers: { 'Content-Type': 'application/json', },
    });
    return response.data; // The sessionId
}

const createToken = async (sessionId: string) => {
    const response = await axios.post("http://localhost:3050/" + '/api/sessions/' + sessionId + '/connections', {}, {
         headers: { 'Content-Type': 'application/json', },
    });
    return response.data; // The token
}