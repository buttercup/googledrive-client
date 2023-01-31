import fetch from "cross-fetch";
import URL from "url-parse";
import _Layerr from "layerr";
import { Headers } from "./types.js";

const { Layerr } = _Layerr;

export interface RequestConfig {
    body?: string | Buffer | ArrayBufferLike;
    headers?: Headers;
    method: "DELETE" | "GET" | "HEAD" | "PATCH" | "POST";
    query?: Record<string, string>;
    url: string;
}

export function handleBadResponse(response: Response): void {
    if (!response.ok) {
        const error = new Layerr(
            {
                info: {
                    status: response.status,
                    statusText: response.statusText,
                    url: response.url
                }
            },
            `Request failed: ${response.status} ${response.statusText}`
        );
        if (response.headers.get("www-authenticate")) {
            throw new Layerr(
                {
                    cause: error,
                    info: {
                        authFailure: /error=invalid_token/.test(
                            response.headers.get("www-authenticate")
                        )
                    }
                },
                "Bad authentication"
            );
        }
        throw error;
    }
}

export async function request(config: RequestConfig): Promise<Response> {
    const url = new URL(config.url);
    if (config.query) {
        const newQuery = Object.assign(url.query || {}, config.query);
        url.set("query", newQuery);
    }
    const response = await fetch(url.toString(), {
        method: config.method,
        headers: config.headers,
        body: config.body
    });
    return response;
}
