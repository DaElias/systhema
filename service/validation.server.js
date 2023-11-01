import { EMAILREGEX, PHONEREGEX } from "@/util/const";

export function isValidDate(value) {
  return value && new Date(value).getTime() < new Date().getTime();
}

export function isValidEmail(email) {
  return EMAILREGEX.test(email)
}

export function isValidContac(phoneNumber) {
  return PHONEREGEX.test(phoneNumber)
}

export function isValidPassword(value, param = 6) {
  return value && value.trim().length >= param;
}

export function isEmpty(value) {
  return value.trim().length != 0;
}
