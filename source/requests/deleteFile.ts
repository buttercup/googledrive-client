import { HotPatcher } from "hot-patcher";
import { Response } from "@buttercup/fetch";
import { handleBadResponse, RequestConfig } from "../request.js";

export interface InternalDeleteFileOptions {
    id: string;
    patcher: HotPatcher;
    token: string;
}

export async function deleteFile(options: InternalDeleteFileOptions): Promise<void> {
    const { patcher } = options;
    const config: RequestConfig = {
        url: `https://www.googleapis.com/drive/v3/files/${options.id}`,
        method: "DELETE",
        query: {
            supportsAllDrives: "true"
        },
        headers: {
            Authorization: `Bearer ${options.token}`
        }
    };
    const response = await patcher.execute<Promise<Response>>("request", config);
    handleBadResponse(response);
}
