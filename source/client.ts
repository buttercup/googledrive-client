import { HotPatcher } from "hot-patcher";
import { request } from "./request.js";
import { createDirectory } from "./requests/createDirectory.js";
import { deleteFile } from "./requests/deleteFile.js";
import { getDirectoryContents, mapDirectoryContents, PosixPathFileItem } from "./requests/getDirectoryContents.js";
import { getFileContents } from "./requests/getFileContents.js";
import { putFileContents } from "./requests/putFileContents.js";
import { FileItem, FileTreeNode } from "./util/directoryContents.js";

export class GoogleDriveClient {
    public patcher: HotPatcher;
    private __cache: Record<string, any>;
    private __token: string;

    constructor(token: string) {
        this.__cache = {};
        this.__token = token;
        this.patcher = new HotPatcher();
        this.patcher.patch("request", request);
    }

    async createDirectory(name: string, parentID?: string): Promise<string> {
        return createDirectory({
            name,
            parentID,
            patcher: this.patcher,
            token: this.__token
        });
    }

    async deleteFile(id: string): Promise<void> {
        await deleteFile({
            id,
            patcher: this.patcher,
            token: this.__token
        });
    }

    async getDirectoryContents(tree: false): Promise<Array<FileItem>>;
    async getDirectoryContents(tree: true): Promise<FileTreeNode>;
    async getDirectoryContents(tree: boolean = true): Promise<Array<FileItem> | FileTreeNode> {
        return getDirectoryContents({
            formTree: tree,
            patcher: this.patcher,
            token: this.__token
        });
    }

    async getFileContents(id: string): Promise<string> {
        return getFileContents({
            id,
            patcher: this.patcher,
            token: this.__token
        });
    }

    async mapDirectoryContents(path: string): Promise<Array<PosixPathFileItem>> {
        return mapDirectoryContents(this.__token, this.patcher, this.__cache, path);
    }

    async putFileContents(contents: string, id: null, name: string, parentID?: string): Promise<string>; // new file
    async putFileContents(contents: string, id: string): Promise<string>; // update
    async putFileContents(contents: string, id: string | null, name?: string, parentID?: string): Promise<string> {
        return putFileContents({
            contents,
            id: id ? id : undefined,
            name,
            parentID,
            patcher: this.patcher,
            token: this.__token
        });
    }
}
