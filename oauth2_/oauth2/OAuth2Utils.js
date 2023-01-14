const { AuthorizationCode, ResourceOwnerPassword, ClientCredentials } = require('simple-oauth2');
const { OAuth2Client } = require('google-auth-library');
let OAuth2Settings = require('./Settings')

let instance;

class OAuthFactory {
    constructor() {
        this.GitHub = new GithubUtil();
        this.NCU = new NCUUtil();
        this.Google = new GoogleUtil();
        this.Line = new LineUtil();
    }
}

class Exten{
    GetDateStr() {
        let year=new Date().getFullYear()
        let month=new Date().getMonth()+1
        let date=new Date().getDate()
        let hours=new Date().getHours()
        let min=new Date().getMinutes()
        let second=new Date().getSeconds()
    
        return `${year}/${month}/${date} ${hours}:${min}:${second}`
    }
}

class LineUtil {
    constructor() {
        this.mClient = null;
        this.mAccessToken = ''
        this.mJWTToken = ''
        this.Result=''
    }

    GetResult(name){
        this.Result=`歡迎來自 LINE 的 ${name} 參觀資管系，現在時間是${new Exten().GetDateStr()}`;
        return this.Result
    }

    InitOAuth2Service() {
        if (this.mClient == null) {
            this.mClient = new AuthorizationCode({
                client: {
                    id: OAuth2Settings.LineClientID,
                    secret: OAuth2Settings.LineClientSecret,
                },
                auth: {
                    tokenHost: OAuth2Settings.LineTokenHost,
                    tokenPath: OAuth2Settings.LineTokenPath,
                    authorizePath: OAuth2Settings.LineAuthPath,
                },
                options: {
                    authorizationMethod: OAuth2Settings.LineAuthorizationMethod,
                },
            });

            this.mAuthorizationUri = this.mClient.authorizeURL({
                response_type: "code",
                client_id: OAuth2Settings.LineClientID,
                redirect_uri: OAuth2Settings.LineAuthRedirectUri,
                scope: OAuth2Settings.LineAuthScope,
                state: OAuth2Settings.LineAuthState,
            });
        }
    }

    GetAuthUri() {
        this.InitOAuth2Service();
        return this.mAuthorizationUri;
    }

    GetAccessToken() {
        return this.mAccessToken
    }

    SetAccessToken(accessToken) {
        this.mAccessToken = accessToken
    }

    async GetAuthToken(code) {
        this.InitOAuth2Service()
        const options = {
            grant_type: 'authorization_code',
            code,
            redirect_uri: OAuth2Settings.LineAuthRedirectUri,
            client_id: OAuth2Settings.LineClientID,
            client_secret: OAuth2Settings.LineClientSecret
          };
        try {
            const accessToken = await this.mClient.getToken(options);
            console.log('The resulting token: ', accessToken.token);
            return accessToken.token;
        } catch (error) {
            console.error('Access Token Error', error.message);
            throw TypeError("Access Token Error : " + error.message);
        }
    }

    GetAcademicsUnits(){
        var thisClient=new AuthorizationCode({
            client: {
                id: OAuth2Settings.LineClientID,
                secret: OAuth2Settings.LineClientSecret,
            }
        })
        thisClient
    }

    SetJWTToken(JWTToken) {
        this.mJWTToken = JWTToken
    }
    GetJWTToken() {
        return this.mJWTToken
    }
}

class GoogleUtil {
    constructor() {
        this.mClient = null;
        this.mAccessToken = ''
        this.googlProp = {
            clientId: OAuth2Settings.GoogleClientID,
            clientSecret: OAuth2Settings.GoogleClientSecret,
            redirectUri: OAuth2Settings.GoogleAuthRedirectUri,
        },
        this.mJWTToken=''
        this.Result=''
    }

    GetResult(name){
        this.Result=`歡迎來自 Google 的 ${name} 參觀資管系，現在時間是${new Exten().GetDateStr()}`;
        return this.Result
    }

    InitOAuth2Service() {
        if (this.mClient == null) {
            this.mClient = new AuthorizationCode({
                client: {
                    id: OAuth2Settings.GoogleClientID,
                    secret: OAuth2Settings.GoogleClientSecret,
                },
                auth: {
                    tokenHost: OAuth2Settings.GoogleTokenHost,
                    tokenPath: OAuth2Settings.GoogleTokenPath,
                    authorizePath: OAuth2Settings.GoogleAuthPath,
                },
                options: {
                    authorizationMethod: OAuth2Settings.GoogleAuthorizationMethod,
                },
            });

            this.mAuthorizationUri = this.mClient.authorizeURL({
                redirect_uri: OAuth2Settings.GoogleAuthRedirectUri,
                scope: OAuth2Settings.GoogleAuthScope,
                state: OAuth2Settings.GoogleAuthState,
            });
        }
    }

    GetAuthUri() {
        const oAuth2Client = new OAuth2Client(this.googlProp);
        const authorizeUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: 'https://www.googleapis.com/auth/userinfo.profile',
          });
        return authorizeUrl
    }

    GetAccessToken() {
        return this.mAccessToken
    }

    SetAccessToken(accessToken) {
        this.mAccessToken = accessToken
    }

    async GetAuthToken(code) {
        this.InitOAuth2Service()
        const options = {
            code,
        };
        try {
            const accessToken = await this.mClient.getToken(options);
            console.log('The resulting token: ', accessToken.token);
            return accessToken.token;
        } catch (error) {
            console.error('Access Token Error', error.message);
            throw TypeError("Access Token Error : " + error.message);
        }
    }

    SetJWTToken(JWTToken) {
        this.mJWTToken = JWTToken
    }
    GetJWTToken() {
        return this.mJWTToken
    }
}

class GithubUtil {
    constructor() {
        this.mClient = null;
        this.mAccessToken = ''
        this.mTokenType = '',
        this.Result=''
    }

    GetResult(name){
        this.Result=`歡迎來自 GitHub 的 ${name} 參觀資管系，現在時間是${new Exten().GetDateStr()}`;
        return this.Result
    }

    InitOAuth2Service() {
        if (this.mClient == null) {
            this.mClient = new AuthorizationCode({
                client: {
                    id: OAuth2Settings.GitClientID,
                    secret: OAuth2Settings.GitClientSecret,
                },
                auth: {
                    tokenHost: OAuth2Settings.GitTokenHost,
                    tokenPath: OAuth2Settings.GitTokenPath,
                    authorizePath: OAuth2Settings.GitAuthPath,
                },
                options: {
                    authorizationMethod: OAuth2Settings.GitAuthorizationMethod,
                },
            });

            this.mAuthorizationUri = this.mClient.authorizeURL({
                redirect_uri: OAuth2Settings.GitAuthRedirectUri,
                scope: OAuth2Settings.GitAuthScope,
                state: OAuth2Settings.GitAuthState,
            });
        }
    }

    GetAuthUri() {
        this.InitOAuth2Service();
        return this.mAuthorizationUri;
    }

    GetAccessToken() {
        return this.mAccessToken
    }

    SetAccessToken(accessToken) {
        this.mAccessToken = accessToken
    }

    GetTokenType() {
        return this.mTokenType
    }

    SetTokenType(tokenType) {
        this.mTokenType = tokenType
    }

    async GetAuthToken(code) {
        this.InitOAuth2Service()
        const options = {
            code,
        };
        try {
            const accessToken = await this.mClient.getToken(options);
            console.log('The resulting token: ', accessToken.token);
            return accessToken.token;
        } catch (error) {
            console.error('Access Token Error', error.message);
            throw TypeError("Access Token Error : " + error.message);
        }
    }
}

class NCUUtil {
    constructor() {
        this.mClient = null;
        this.mAccessToken = ''
        this.Result=''
    }

    GetBasicAuth(){
        var basicAuth = 'Basic ' + Buffer.from(`${OAuth2Settings.NCUClientID}:${OAuth2Settings.NCUClientSecret}`).toString('base64');
        return basicAuth;
    }

    GetResult(name,academy,Faculty){
        if(Faculty!=undefined){
            this.Result=`歡迎 ${name} ${Faculty.occupation} 蒞臨資管系，現在時間是${new Exten().GetDateStr()}`;
        }
        if(academy.name.includes("資訊管理")){
            this.Result=`歡迎 ${name} 蒞臨資管系，現在時間是${new Exten().GetDateStr()}`;
        }
        else{
            this.Result=`歡迎 ${academy.name}/${name} 參觀資管系，現在時間是${new Exten().GetDateStr()}`;
        }
        
        return this.Result
    }

    InitOAuth2Service() {
        if (this.mClient == null) {
            this.mClient = new AuthorizationCode({
                client: {
                    id: OAuth2Settings.NCUClientID,
                    secret: OAuth2Settings.NCUClientSecret,
                },
                auth: {
                    tokenHost: OAuth2Settings.NCUTokenHost,
                    tokenPath: OAuth2Settings.NCUTokenPath,
                    authorizePath: OAuth2Settings.NCUAuthPath,
                },
                options: {
                    authorizationMethod: OAuth2Settings.NCUAuthorizationMethod,
                },
            });

            this.mAuthorizationUri = this.mClient.authorizeURL({
                redirect_uri: OAuth2Settings.NCUAuthRedirectUri,
                scope: OAuth2Settings.NCUAuthScope,
                state: OAuth2Settings.NCUAuthState,
            });
        }
    }

    GetAuthUri() {
        this.InitOAuth2Service();
        return this.mAuthorizationUri;
    }

    GetAccessToken() {
        return this.mAccessToken
    }

    SetAccessToken(accessToken) {
        this.mAccessToken = accessToken
    }

    async GetAuthToken(code) {
        this.InitOAuth2Service()
        const options = {
            code,
        };
        try {
            const accessToken = await this.mClient.getToken(options);
            console.log('The resulting token: ', accessToken.token);
            return accessToken.token;
        } catch (error) {
            console.error('Access Token Error', error.message);
            throw TypeError("Access Token Error : " + error.message);
        }
    }
}

module.exports = (() => {
    if (instance) {
        return instance;
    }
    instance = new OAuthFactory();
    return instance;
})();