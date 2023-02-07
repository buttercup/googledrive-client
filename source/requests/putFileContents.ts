import { HotPatcher } from "hot-patcher";
import { Response } from "@buttercup/fetch";
import { handleBadResponse, RequestConfig } from "../request.js";
import { encodeBase64 } from "../util/encoding.js";

export interface InternalPutFileContentsOptions {
    contents: string;
    id: string;
    name: string;
    parentID: string;
    patcher: HotPatcher;
    token: string;
}

const BOUNDARY_MARK = "--";
const CONTENT_ENCODING = "Content-Transfer-Encoding: base64";
const CONTENT_TYPE_JSON = "Content-Type: application/json; charset=UTF-8";
const CONTENT_TYPE_TEXT = "Content-Type: text/plain; charset=UTF-8";
const NEW_LINE = "\r\n";

export async function putFileContents(options: InternalPutFileContentsOptions): Promise<string> {
    const { contents, id, name, parentID, patcher, token } = options;
    const boundary = `BCUP_DRV_UPL_${Math.floor(Math.random() * 1000000)}`;
    const url = id
        ? `https://www.googleapis.com/upload/drive/v3/files/${id}`
        : "https://www.googleapis.com/upload/drive/v3/files";
    const method = id ? "PATCH" : "POST";
    const rawMetadata: Record<string, string | Array<string>> = {};
    if (parentID) {
        rawMetadata.parents = [parentID];
    }
    if (name) {
        rawMetadata.name = name;
    }
    const metadata = JSON.stringify(rawMetadata);
    const postDataMeta = [
        NEW_LINE,
        BOUNDARY_MARK,
        boundary,
        NEW_LINE,
        CONTENT_TYPE_JSON,
        NEW_LINE,
        NEW_LINE
    ].join("");
    const postDataFile = [
        NEW_LINE,
        BOUNDARY_MARK,
        boundary,
        NEW_LINE,
        CONTENT_TYPE_TEXT,
        NEW_LINE,
        CONTENT_ENCODING,
        NEW_LINE,
        NEW_LINE
    ].join("");
    const postDataEnd = [NEW_LINE, BOUNDARY_MARK, boundary, BOUNDARY_MARK, NEW_LINE].join("");
    const size =
        postDataMeta.length +
        metadata.length +
        postDataFile.length +
        contents.length +
        postDataEnd.length;
    const data = [];
    [postDataMeta, metadata, postDataFile, encodeBase64(contents), postDataEnd].forEach(item => {
        for (let i = 0; i < item.length; i += 1) {
            data.push(item.charCodeAt(i) & 0xff);
        }
    });
    const payload = new Uint8Array(data).buffer;
    const config: RequestConfig = {
        url,
        method,
        query: {
            uploadType: "multipart"
        },
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": `multipart/related; boundary=${boundary}`,
            "Content-Length": size.toString()
        },
        body: payload
    };
    const response = await patcher.execute<Promise<Response>>("request", config);
    handleBadResponse(response);
    const { id: newID } = (await response.json()) as {
        id: string;
    };
    return newID;
}
