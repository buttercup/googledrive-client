import { fromByteArray } from "base64-js";

export function encodeBase64(text: string): string {
    const byteArray = new TextEncoder().encode(text);
    return fromByteArray(byteArray);
}
