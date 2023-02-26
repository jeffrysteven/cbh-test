import { createHash } from "crypto";
import { HASH_ALGORITHM } from "./constants";

export function createHashFromString(data: string) {
  return createHash(HASH_ALGORITHM).update(data).digest("hex");
}
