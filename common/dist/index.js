"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginInput = exports.signupInput = void 0;
const zod_1 = require("zod");
exports.signupInput = zod_1.z.object({
    username: zod_1.z.string().min(20).max(30),
    password: zod_1.z.string().min(6).max(10),
});
exports.loginInput = zod_1.z.object({
    username: zod_1.z.string().min(20).max(30),
    password: zod_1.z.string().min(6).max(10),
});
