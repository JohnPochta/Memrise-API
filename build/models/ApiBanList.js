"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var ApiBanListSchema = new mongoose_1.Schema({
    BanDate: Date,
    email_fk: String,
    banReason: String,
    unbanReason: String,
    admin: String,
    active: Boolean,
    unbanDate: Date
});
exports.default = mongoose_1.model('ApiBanList', ApiBanListSchema);
//# sourceMappingURL=ApiBanList.js.map