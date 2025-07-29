"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUser = void 0;
const axios_1 = __importDefault(require("axios"));
function isCoordinates(coords) {
    return (typeof coords === "object" &&
        coords !== null &&
        typeof coords.lat === "number" &&
        typeof coords.lng === "number");
}
function isHair(hair) {
    return (typeof hair === "object" &&
        hair !== null &&
        typeof hair.color === "string" &&
        typeof hair.type === "string");
}
function isAddress(address) {
    return (typeof address === "object" &&
        address !== null &&
        typeof address.address === "string" &&
        typeof address.city === "string" &&
        typeof address.state === "string" &&
        typeof address.stateCode === "string" &&
        typeof address.postalCode === "string" &&
        isCoordinates(address.coordinates) &&
        typeof address.country === "string");
}
function isBank(bank) {
    return (typeof bank === "object" &&
        bank !== null &&
        typeof bank.cardExpire === "string" &&
        typeof bank.cardNumber === "string" &&
        typeof bank.cardType === "string" &&
        typeof bank.currency === "string" &&
        typeof bank.iban === "string");
}
function isCompanyAddress(addr) {
    return (typeof addr === "object" &&
        addr !== null &&
        typeof addr.address === "string" &&
        typeof addr.city === "string" &&
        typeof addr.state === "string" &&
        typeof addr.stateCode === "string" &&
        typeof addr.postalCode === "string" &&
        isCoordinates(addr.coordinates) &&
        typeof addr.country === "string");
}
function isCompany(company) {
    return (typeof company === "object" &&
        company !== null &&
        typeof company.department === "string" &&
        typeof company.name === "string" &&
        typeof company.title === "string" &&
        isCompanyAddress(company.address));
}
function isCrypto(crypto) {
    return (typeof crypto === "object" &&
        crypto !== null &&
        typeof crypto.coin === "string" &&
        typeof crypto.wallet === "string" &&
        typeof crypto.network === "string");
}
function isUser(user) {
    return (typeof user === "object" &&
        user !== null &&
        typeof user.id === "number" &&
        typeof user.firstName === "string" &&
        typeof user.lastName === "string" &&
        typeof user.maidenName === "string" &&
        typeof user.age === "number" &&
        typeof user.gender === "string" &&
        typeof user.email === "string" &&
        typeof user.phone === "string" &&
        typeof user.username === "string" &&
        typeof user.password === "string" &&
        typeof user.birthDate === "string" &&
        typeof user.image === "string" &&
        typeof user.bloodGroup === "string" &&
        typeof user.height === "number" &&
        typeof user.weight === "number" &&
        typeof user.eyeColor === "string" &&
        isHair(user.hair) &&
        typeof user.ip === "string" &&
        isAddress(user.address) &&
        typeof user.macAddress === "string" &&
        typeof user.university === "string" &&
        isBank(user.bank) &&
        isCompany(user.company) &&
        typeof user.ein === "string" &&
        typeof user.ssn === "string" &&
        typeof user.userAgent === "string" &&
        isCrypto(user.crypto) &&
        typeof user.role === "string");
}
exports.isUser = isUser;
function isUserArray(data) {
    return Array.isArray(data) && data.every(isUser);
}
function requestApi() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const req = yield axios_1.default.get("https://dummyjson.com/users");
            if (!isUserArray(req.data.users)) {
                console.error("Request Type Error");
            }
            return req.data.users;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    });
}
requestApi();
