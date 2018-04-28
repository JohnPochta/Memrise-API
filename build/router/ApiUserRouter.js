"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ApiUser_1 = require("../models/ApiUser");
var jwt = require("jsonwebtoken");
var ApiUserRouter = /** @class */ (function () {
    function ApiUserRouter() {
        this.router = express_1.Router();
        this.routes();
    }
    ApiUserRouter.prototype.apiUserCreate = function (req, res) {
        var signUpDate = new Date();
        var email = req.body.email;
        var project = req.body.project;
        if (!email || !project) {
            res.status(422).json({ message: 'Give for us email and project' });
        }
        ;
        var apiUser = new ApiUser_1.default({
            signUpDate: signUpDate,
            email: email,
            project: project,
        });
        var api_key = jwt.sign({ email: email }, process.env.jwt_api_key_hash);
        apiUser.save()
            .then(function (data) {
            //data['token'] = api_key;
            res.status(201).json({ email: data.email, api_key: api_key });
        })
            .catch(function (error) {
            res.status(500).json({ error: error });
        });
    };
    ApiUserRouter.prototype.apiUserGetAll = function (req, res) {
        ApiUser_1.default.find({}, function (err, users) {
            if (err) {
                res.send('There no users =(');
            }
            res.send(users);
        });
    };
    ApiUserRouter.prototype.apiUsersDelete = function (req, res) {
        req.body.list.forEach(function (elem) {
            ApiUser_1.default.deleteOne({ email: elem }, function (err) { });
        });
        res.send('okay=)');
    };
    ApiUserRouter.prototype.routes = function () {
        this.router.post('/create', this.apiUserCreate);
        this.router.get('/get_all', this.apiUserGetAll);
        this.router.post('/delete_users', this.apiUsersDelete);
    };
    return ApiUserRouter;
}());
//export
var apiUserRoutes = new ApiUserRouter();
apiUserRoutes.routes();
var apiUserRoutesexp = apiUserRoutes.router;
exports.default = apiUserRoutesexp;
//# sourceMappingURL=ApiUserRouter.js.map