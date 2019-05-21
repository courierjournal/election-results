const bootstrap = require("./config.json");

//Set env vars to populate tags in the <head>
process.env.VUE_APP_TITLE = bootstrap.title;
process.env.VUE_APP_DESCRIPTION = bootstrap.description;
process.env.VUE_APP_SOCIAL_CARD = bootstrap.socialCard;
process.env.VUE_APP_TITLE = bootstrap.title;
process.env.VUE_APP_URL = bootstrap.url;
process.env.VUE_APP_PROPERTY_NAME = bootstrap.propertyName;
process.env.VUE_APP_TWITTER_HANDLE = bootstrap.twitterHandle;



module.exports={
    publicPath: "",
    productionSourceMap: false
}