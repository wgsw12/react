let webpack=  require("webpack")
let Hwp = require("html-webpack-plugin")
let Ext = require("extract-text-webpack-plugin")

module.exports = {
    entry : __dirname + "/src/main.js",
    output : {
        path : __dirname + "/dist/",
        filename : "app.js",
        publicPath : "/"
    },
    devtool : "source-map",
    devServer : {
        contentBase : __dirname + "/dist/",
        port : 3000,
        inline : true,
        publicPath : "/",
        historyApiFallback : true,
        disableHostCheck : true,
        proxy : {
            "/citylist" : {
                target : "http://api.yytianqi.com"
            }
        }
       
    },
    module : {
        rules : [
            {test : /\.js$/ , exclude : /node_modules/ ,loader : "babel-loader"},
            {test : /\.less$/,loader :Ext.extract("css-loader!less-loader")},
            {test : /\.css$/,loader :Ext.extract("css-loader")},
            {
                test:/\.(png|gif|svg|jpg|woff|woff2|eot|ttf)\??.*$/,
                use:["url-loader?limit=8192&name=img/[hash:8].[name].[ext]"]
            }, 
        ]
    },
    plugins : [
        new webpack.ProvidePlugin({
            React : "react"
        }),
        new Hwp({
            template : "index.html",
            filename : "index.html",
            inject : true
        }),
        new Ext("app.css")
    ]
}