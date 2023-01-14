const{AuthorizationCode, ResourceOwnerPassword, ClientCredentials} = require('simple-oauth2');

let OAuth2SettingsInstance;

class OAuth2Settings{
    constructor() {
        this.GitClientID = 'c5f4aada78ce451a320f';
        this.GitClientSecret = '76d599e66a923f55e2c86cf73024729f108f2e9e';
        this.GitTokenHost = 'https://github.com';
        this.GitTokenPath = '/login/oauth/access_token';
        this.GitAuthPath = '/login/oauth/authorize';
        this.GitAuthorizationMethod = 'header';
        this.GitAuthRedirectUri='http://localhost:3000/oauth2_GitHub_callback'
        this.GitAuthScope = ["read:user", "user:email"];
        this.GitAuthState = '3(#0/!~'
        //====================================================
        this.NCUClientID = '20230106132019h44Z7t6TjeZP';
        this.NCUClientSecret = 'y2dWpou8inaHvmgViuMDSMOPy04Ypucjd746tDIeG7kESr5Xv';
        this.NCUTokenHost = 'https://portal.ncu.edu.tw';
        this.NCUTokenPath = '/oauth2/token';
        this.NCUAuthPath = '/oauth2/authorization';
        this.NCUAuthorizationMethod = 'header';
        this.NCUAuthRedirectUri='http://localhost:3000/oauth2_NCU_callback'
        this.NCUAuthScope = ["chinese-name","student-id", "email","faculty-records","academy-records"];
        this.NCUAuthState = '3(#0/!~NCU'
        //====================================================
        this.GoogleClientID = '942877166823-n8q7egvsr0qroj5v5vtdhbb9a7c0k8ne.apps.googleusercontent.com';
        this.GoogleClientSecret = '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';
        this.GoogleTokenHost = 'https://portal.ncu.edu.tw';
        this.GoogleTokenPath = '/oauth2/token';
        this.GoogleAuthPath = '/oauth2/authorization';
        this.GoogleAuthorizationMethod = 'header';
        this.GoogleAuthRedirectUri='http://localhost:3000/oauth2_Google_callback'
        this.GoogleAuthScope = ["student-id", "email"];
        this.GoogleAuthState = '3(#0/!~Google'
        //====================================================
        this.LineClientID = '1657782160';
        this.LineClientSecret = '77f9f3a1dd47886f68382cfe5e47dc5d';
        this.LineTokenHost = 'https://access.line.me/oauth2/v2.1/authorize';
        this.LineTokenPath = 'https://api.line.me/oauth2/v2.1/token';
        this.LineAuthPath = '/oauth2/v2.1/authorize';
        this.LineAuthorizationMethod = 'header';
        this.LineAuthRedirectUri='http://localhost:3000/oauth2_Line_callback'
        this.LineAuthScope = ["profile","openid", "email"];
        this.LineAuthState = '1234567890'
    }
}

module.exports = (() => {
    if (OAuth2SettingsInstance) {
        return OAuth2SettingsInstance;
    }
    OAuth2SettingsInstance = new OAuth2Settings();
    return OAuth2SettingsInstance;
})();