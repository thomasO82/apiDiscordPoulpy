exports.getAccessToken = async (req) => {
    try {
        const code = req.query.code;
        const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
            method: 'POST',
            body: new URLSearchParams({
                client_id: process.env.DISCORD_ID,
                client_secret: process.env.DISCORD_SECRET,
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: "http://localhost:3005/callback",
                scope: 'identify',
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const tokenData = await tokenResponse.json();
        return tokenData.access_token;
    } catch (error) {
        throw error
    }
}

exports.getUserData = async (req) => {
    const accessToken = await this.getAccessToken(req);
    req.session.token_discord = accessToken;
    const response = await fetch('https://discord.com/api/users/@me', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return await response.json()
}