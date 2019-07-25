const HotPatcher = require("hot-patcher");
const { request } = require("cowl");
const { getDirectoryContents, mapDirectoryContents } = require("./directoryContents.js");
const { getFileContents, putFileContents } = require("./fileContents.js");

/**
 * @typedef {Object} GoogleDriveClientAdapter
 */

/**
 * @typedef {Object} GetDirectoryContentsOptions
 * @property {Boolean=} tree - Fetch results as a tree (default: true)
 */

/**
 * @typedef {Object} PutFileContentsOptions
 * @property {String} contents - The contents to write to the remote
 * @property {String=} id - The ID of the file if overwriting, or null/undefined if
 *  a new file
 * @property {String=} name - The filename - Should be set if creating a new file
 * @property {String=} parent - Parent ID of the folder it should reside in
 */

/**
 * Create a new Google Drive client adapter using a token
 * @param {String} token The dropbox token
 * @returns {GoogleDriveClientAdapter} A client adapter instance
 * @memberof module:GoogleDriveClient
 */
function createClient(token) {
    const patcher = new HotPatcher();
    patcher.patch("request", request);
    /**
     * @class GoogleDriveClientAdapter
     */
    const adapter = {
        /**
         * @type {Function}
         * @memberof GoogleDriveClientAdapter
         * @see https://github.com/perry-mitchell/cowl
         */
        request,
        /**
         * @type {HotPatcher}
         * @memberof GoogleDriveClientAdapter
         */
        patcher,
        /**
         * Get the remote contents
         * (Fetches all of the remote file tree)
         * @param {GetDirectoryContentsOptions=} options Options for the request
         * @memberof GoogleDriveClientAdapter
         * @returns {Promise.<FileItem[]|FileTreeNode>} An array of file items when tree=false, and a
         *  full file tree if tree=true
         */
        getDirectoryContents: ({ tree = true } = {}) => getDirectoryContents(token, patcher, { formTree: tree }),
        /**
         * Get the remote contents of a file
         * (currently only supports text files)
         * @param {String} id The file ID
         * @memberof GoogleDriveClientAdapter
         * @returns {Promise.<String>} A promise that resolves with the file contents
         */
        getFileContents: id => getFileContents(token, patcher, id),
        /**
         * Get directory contents using a non-standard path
         * (not guaranteed to work in all environments and ignores duplicate files or
         * directories with the same name)
         * @param {String} dirPath The directory to get the contents of
         * @returns {Promise.<FullPathFileItem[]>} An array of file items with full directory paths
         */
        mapDirectoryContents: dirPath => mapDirectoryContents(token, patcher, adapter, dirPath),
        /**
         * Write contents to a remote file
         * @param {PutFileContentsOptions} options Options for the request
         * @memberof GoogleDriveClientAdapter
         * @returns {Promise.<String>} A promise that resolves with the file's ID
         */
        putFileContents: ({ id, name, parent, contents } = {}) => putFileContents(token, patcher, { id, contents, name, parentID: parent })
    };
    return adapter;
}

/**
 * @module GoogleDriveClient
 */

module.exports = {
    createClient
};
