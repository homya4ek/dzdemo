import axios, { isCancel, AxiosError } from "axios";

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: IGender;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: IHair;
  ip: string;
  address: IAddress;
  macAddress: string;
  university: string;
  bank: IBank;
  company: ICompany;
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: ICrypto;
  role: string;
}

enum IGender {
  "male" = "male",
  "famale" = "famale",
}

export interface IHair {
  color: string;
  type: string;
}

export interface IAddress {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: ICoordinates;
  country: string;
}

export interface ICoordinates {
  lat: number;
  lng: number;
}

export interface IBank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

export interface ICompany {
  department: string;
  name: string;
  title: string;
  address: ICompanyAddress;
}

export interface ICompanyAddress {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: ICoordinates;
  country: string;
}

export interface ICrypto {
  coin: string;
  wallet: string;
  network: string;
}

function isCoordinates(coords: any): coords is ICoordinates {
  return (
    typeof coords === "object" &&
    coords !== null &&
    typeof coords.lat === "number" &&
    typeof coords.lng === "number"
  );
}

function isHair(hair: any): hair is IHair {
  return (
    typeof hair === "object" &&
    hair !== null &&
    typeof hair.color === "string" &&
    typeof hair.type === "string"
  );
}

function isAddress(address: any): address is IAddress {
  return (
    typeof address === "object" &&
    address !== null &&
    typeof address.address === "string" &&
    typeof address.city === "string" &&
    typeof address.state === "string" &&
    typeof address.stateCode === "string" &&
    typeof address.postalCode === "string" &&
    isCoordinates(address.coordinates) &&
    typeof address.country === "string"
  );
}

function isBank(bank: any): bank is IBank {
  return (
    typeof bank === "object" &&
    bank !== null &&
    typeof bank.cardExpire === "string" &&
    typeof bank.cardNumber === "string" &&
    typeof bank.cardType === "string" &&
    typeof bank.currency === "string" &&
    typeof bank.iban === "string"
  );
}

function isCompanyAddress(addr: any): addr is ICompanyAddress {
  return (
    typeof addr === "object" &&
    addr !== null &&
    typeof addr.address === "string" &&
    typeof addr.city === "string" &&
    typeof addr.state === "string" &&
    typeof addr.stateCode === "string" &&
    typeof addr.postalCode === "string" &&
    isCoordinates(addr.coordinates) &&
    typeof addr.country === "string"
  );
}

function isCompany(company: any): company is ICompany {
  return (
    typeof company === "object" &&
    company !== null &&
    typeof company.department === "string" &&
    typeof company.name === "string" &&
    typeof company.title === "string" &&
    isCompanyAddress(company.address)
  );
}

function isCrypto(crypto: any): crypto is ICrypto {
  return (
    typeof crypto === "object" &&
    crypto !== null &&
    typeof crypto.coin === "string" &&
    typeof crypto.wallet === "string" &&
    typeof crypto.network === "string"
  );
}

export function isUser(user: any): user is IUser {
  return (
    typeof user === "object" &&
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
    typeof user.role === "string"
  );
}

function isUserArray(data: any): data is IUser[] {
  return Array.isArray(data) && data.every(isUser);
}

async function requestApi(): Promise<IUser[] | null> {
  try {
    const req = await axios.get("https://dummyjson.com/users");
    if (!isUserArray(req.data.users)) {
      console.error("Request Type Error");
    }
    console.log(req.data.users)
    return req.data.users;
  } catch (error) {
    console.log(error);
    return null;
  }
}
requestApi();
