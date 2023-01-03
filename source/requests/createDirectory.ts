import { HotPatcher } from "hot-patcher";
import _Layerr from "layerr";
import { handleBadResponse, RequestConfig } from "../request.js";
import { MIME_FOLDER, URL_CREATE_DIRECTORY } from "../symbols.js";

const { Layerr } = _Layerr;

export interface InternalCreateDirectoryOptions {
    name: string;
    parentID?: string;
    patcher: HotPatcher;
    token: string;
}

export async function createDirectory(options: InternalCreateDirectoryOptions): Promise<string> {
    const {
        parentID,
        patcher,
        name,
        token
    } = options;
    const parents = parentID ? [parentID] : [];
    const config: RequestConfig = {
        url: URL_CREATE_DIRECTORY,
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mimeType: MIME_FOLDER,
            name,
            parents
        })
    };
    const response = await patcher.execute<Promise<Response>>("request", config);
    handleBadResponse(response);
    const { id } = await response.json();
    if (!id) {
        throw new Layerr({
            info: {
                name,
                parents,
                url: URL_CREATE_DIRECTORY
            }
        }, "Failed creating directory: No new directory ID returned");
    }
    return id;
}
