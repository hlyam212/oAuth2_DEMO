var express = require('express');
var router = express.Router();
var oauth2Utils = require('../oauth2/OAuth2Utils')
var oauth2Settings = require('../oauth2/Settings')
var axios = require('axios')
var { OAuth2Client, auth } = require('google-auth-library');

/* LINE .... */
router.get('/oauth2_Line', function (req, res, next) {
    let authorizationUri = oauth2Utils.Line.GetAuthUri();
    res.redirect(authorizationUri);
});

router.get('/oauth2_Line_callback', async function (req, res, next) {
    const { code } = req.query;
    try {
        const accessToken = await oauth2Utils.Line.GetAuthToken(code);
        console.log('The resulting token: ', accessToken.access_token);
        console.log('The Token type is: ', accessToken.token_type)
        oauth2Utils.Line.SetAccessToken(accessToken.access_token);
        oauth2Utils.Line.SetJWTToken(accessToken.id_token);
    } catch (error) {
        console.error('Access Token Error', error.message);
        return res.status(500).json('Authentication failed');
    }
    res.redirect('/Line_get_user_info');
});

router.get('/Line_get_user_info', async function (req, res, next) {
    try {
        var ca = oauth2Utils.Line.GetJWTToken();
        var base64Url = ca.split('.')[1];
        var decodedValue = JSON.parse(Buffer.from(base64Url, 'base64').toString('ascii'));

        const accessToken = oauth2Utils.Line.GetAccessToken();
        // Call the user info API using the fetch user profile
        let user = await axios.get(' https://api.line.me/oauth2/v2.1/userinfo', {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        });
        res.render('oauthResult', {
            MSG: oauth2Utils.Line.GetResult(user.data.name),
            imgSRC: decodedValue.picture
        });
    } catch (error) {
        console.error('Line_get_user_info Error', error.message);
        if (oauth2Settings.AuthDebugHtml) {
            res.render('oauth2_error', { Message: error.message });
        }
        return res.status(500).json('Get line user infor error !! ' + error.message);
    }
});

/* Google .... */
router.get('/oauth2_Google', function (req, res, next) {
    let authorizationUri = oauth2Utils.Google.GetAuthUri();
    res.redirect(authorizationUri);
});

router.get('/oauth2_Google_callback', async function (req, res, next) {
    try {
        var code = req.query;
        const oAuth2Client = new OAuth2Client(oauth2Utils.Google.googlProp);
        const accessToken = await oAuth2Client.getToken(code);
        console.log('The resulting token: ', accessToken.tokens.access_token);
        console.log('The Token type is: ', accessToken.tokens.token_type)
        oAuth2Client.setCredentials(accessToken);
        oauth2Utils.Google.SetAccessToken(accessToken.tokens.access_token);
        oauth2Utils.Google.SetJWTToken(accessToken.tokens.id_token);
        //return res.status(200).json(accessToken.token);
    } catch (error) {
        console.error('Access Token Error', error.message);
        return res.status(500).json('Authentication failed');
    }
    res.redirect('/Google_get_user_info');
});

router.get('/Google_get_user_info', async function (req, res, next) {
    try {
        var ca = oauth2Utils.Google.GetJWTToken();
        var base64Url = ca.split('.')[1];
        var decodedValue = JSON.parse(Buffer.from(base64Url, 'base64').toString('ascii'));

        res.render('oauthResult', {
            MSG: oauth2Utils.Google.GetResult(decodedValue.name),
            imgSRC: decodedValue.picture
        });
    } catch (error) {
        console.error('Google_get_user_info Error', error.message);
        if (oauth2Settings.AuthDebugHtml) {
            res.render('oauth2_error', { Message: error.message });
        }
        return res.status(500).json('Get google user infor error !! ' + error.message);
    }
});

/* Github .... */
router.get('/oauth2_Git', function (req, res, next) {
    let authorizationUri = oauth2Utils.GitHub.GetAuthUri();
    res.redirect(authorizationUri);
});

router.get('/oauth2_GitHub_callback', async function (req, res, next) {
    const { code } = req.query;
    try {
        const accessToken = await oauth2Utils.GitHub.GetAuthToken(code);
        console.log('The resulting token: ', accessToken.access_token);
        console.log('The Token type is: ', accessToken.token_type)
        oauth2Utils.GitHub.SetAccessToken(accessToken.access_token);
        //return res.status(200).json(accessToken.token);
    } catch (error) {
        console.error('Access Token Error', error.message);
        return res.status(500).json('Authentication failed');
    }
    res.redirect('/Git_get_user_info');
});

router.get('/Git_get_user_info', async function (req, res, next) {
    try {
        const accessToken = oauth2Utils.GitHub.GetAccessToken();
        // Call the user info API using the fetch user profile
        let user = await axios.get('https://api.github.com/user', {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        });
        let emails = await axios.get('https://api.github.com/user/emails', {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        });

        // get primary email
        let primaryEmail;
        for (let i = 0; i < emails.data.length; i++) {
            if (emails.data[i].primary) {
                console.log(emails.data[i].primary);
                primaryEmail = emails.data[i].email;
                break;
            }
        }

        const data = {
            provider: "github",
            name: user.data.login,
            email: primaryEmail,
            picture: user.data.avatar_url,
            github_url: user.data.html_url
        };

        res.render('oauthResult', {
            MSG: oauth2Utils.GitHub.GetResult(data.name),
            imgSRC: data.picture
        });
    } catch (error) {
        console.error('Git_get_user_info Error', error.message);
        if (oauth2Settings.AuthDebugHtml) {
            res.render('oauth2_error', { Message: error.message });
        }
        return res.status(500).json('Get git user infor error !! ' + error.message);
    }
});

router.get('/oauth2_NCU', function (req, res, next) {
    let authorizationUri = oauth2Utils.NCU.GetAuthUri();
    res.redirect(authorizationUri);
});

router.get('/oauth2_NCU_callback', async function (req, res, next) {
    const { code } = req.query;
    try {
        const accessToken = await oauth2Utils.NCU.GetAuthToken(code);
        console.log('The resulting token: ', accessToken.access_token);
        console.log('The Token type is: ', accessToken.token_type)
        oauth2Utils.NCU.SetAccessToken(accessToken.access_token);
        // res.render('oauth2_get_token', { Token: accessToken.access_token });
        //return res.status(200).json(accessToken.access_token);
    } catch (error) {
        console.error('Access Token Error', error.message);
        // res.render('oauth2_error', { Message: error.message });
        return res.status(500).json('Authentication failed');
    }
    res.redirect('/NCU_get_user_info');
});

router.get('/NCU_get_user_info', async function (req, res, next) {
    try {
        const accessToken = oauth2Utils.NCU.GetAccessToken();
        // Call the user info API using the fetch user profile
        let user = await axios.get(' https://portal.ncu.edu.tw/apis/oauth/v1/info', {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        });

        const data = {
            provider: "NCU",
            student_id: user.data.studentId,
            email: user.data.email,
            chineseName:user.data.chineseName,
            academy:user.data.academyRecords,
            Faculty:user.data.FacultyRecords 
        };

        res.render('oauthResult', { MSG: oauth2Utils.NCU.GetResult(data.chineseName,data.academy,data.Faculty) });
    } catch (error) {
        console.error('Git_get_user_info Error', error.message);
        return res.status(500).json('Get NCU user infor error !! ' + error.message);
    }
});

module.exports = router;

