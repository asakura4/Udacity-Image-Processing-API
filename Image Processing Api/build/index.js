"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var resize_1 = __importDefault(require("./routes/resize"));
var app = express_1.default();
var port = 3000;
app.use(express_1.default.static(__dirname + '/../images/thumbnail'));
app.get('/api', function (req, res) {
    //   console.log(__dirname);
    //   console.log(__dirname + '/../images/thumbnail');
    res.send('Hello, world!');
});
// resize endpoint
app.use('/resize', resize_1.default);
app.listen(port, function () {
    console.log("server started at localhost:" + port);
});
exports.default = app;
