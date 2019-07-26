const { handleError, handleResponse } = require("./helpers.js");

const CACHED_DIR_RESULTS_KEY = "@@dirresults";
const CACHED_DIR_RESULTS_MAX_AGE = 10000;
const MIME_FOLDER = "application/vnd.google-apps.folder";

function formulateTree(files) {
    // 1st pass: Collect all IDs
    const ids = files.map(file => file.id);
    // 2nd pass: Collect root IDs
    const rootIDs = [];
    files.forEach(file => {
        file.parents.forEach(parentID => {
            if (ids.indexOf(parentID) === -1 && rootIDs.indexOf(parentID) === -1) {
                // ID is not available in the results, so assume it's root
                rootIDs.push(parentID);
            }
        });
    });
    // Level creation
    const getLevel = item => ({
        id: item ? item.id : null,
        filename: item ? item.filename : null,
        files: !item
            ? files.filter(file => file.type === "file" && (file.parents.length === 0 || file.parents.some(parentID => rootIDs.indexOf(parentID) >= 0)))
            : files.filter(file => file.type === "file" && file.parents.indexOf(item.id) >= 0),
        children: (
            !item
                ? files.filter(file => file.type === "directory" && (file.parents.length === 0 || file.parents.some(parentID => rootIDs.indexOf(parentID) >= 0)))
                : files.filter(file => file.type === "directory" && file.parents.indexOf(item.id) >= 0)
        ).map(child => getLevel(child, item ? item.id : null))
    });
    return getLevel();
}

/**
 * @typedef {Object} IntGetDirectoryContentsOptions
 * @property {Array.<Object>=} currentFiles - Previously fetched files to add to future results (pages)
 * @property {String=} nextPageToken - Token to use for fetching the contents of the next page
 */

/**
 * @typedef {Object} FileItem
 * @property {String} id - The ID of the item
 * @property {String} filename - The name of the file
 * @property {Array.<String>} parents - An array of parent IDs
 * @property {String} mime - The MIME type
 * @property {String} type - Either "file" or "directory"
 */

/**
 * @typedef {FileItem} PosixPathFileItem
 * @property {String} dirPath - The directory path containing this file
 */

/**
 * @typedef {Object} FileTreeNode
 * @property {String|null} id - The ID of the item (null for root)
 * @property {String|null} filename - The name of the item (null for root)
 * @property {Array.<FileItem>} files - Files under this parent
 * @property {Array.<FileTreeNode>} children - Child nodes (directories)
 */

/**
 * Get directory contents
 * @param {String} token The OAuth token
 * @param {HotPatcher} patcher The patcher instance
 * @param {IntGetDirectoryContentsOptions=} options Directory contents request options
 * @returns {Promise.<FileItem[]|FileTreeNode>} A promise that resolves with an array of file items
 *  (formTree=false) or a file tree node (formTree=true)
 */
function getDirectoryContents(token, patcher, { currentFiles = [], nextPageToken, formTree = false } = {}) {
    const options = {
        url: "https://www.googleapis.com/drive/v3/files",
        method: "GET",
        query: {
            corpora: "user",
            pageSize: 1000,
            spaces: "drive",
            fields: "files(id,name,mimeType,createdTime,modifiedTime,shared,size,parents,trashed),nextPageToken"
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    if (nextPageToken) {
        options.query.pageToken = nextPageToken;
    }
    return patcher.execute("request", options)
        .then(response => {
            const result = response.data;
            const files = [
                ...currentFiles,
                ...result.files
                    .filter(file => !file.trashed)
                    .map(googleFile => ({
                        id: googleFile.id,
                        filename: googleFile.name,
                        parents: [...(googleFile.parents || [])],
                        mime: googleFile.mimeType,
                        type: googleFile.mimeType === MIME_FOLDER ? "directory" : "file",
                        created: googleFile.createdTime,
                        modified: googleFile.modifiedTime,
                        shared: googleFile.shared,
                        size: parseInt(googleFile.size, 10)
                    }))
            ];
            if (result.nextPageToken) {
                return getDirectoryContents(token, patcher, {
                    currentFiles: files,
                    nextPageToken: result.nextPageToken,
                    formTree
                });
            }
            return formTree ? formulateTree(files) : files;
        })
        .catch(handleError);
}

/**
 * Get directory contents for a non-standard directory path
 * @param {String} token The OAuth token
 * @param {HotPatcher} patcher The patcher instance
 * @param {Object} context The context for memoizing the directory contents results
 * @param {String} path The path to map for (eg "/images")
 * @returns {Promise.<PosixPathFileItem[]>}
 */
function mapDirectoryContents(token, patcher, context, path) {
    let work;
    if (!context[CACHED_DIR_RESULTS_KEY] || (Date.now() - context[CACHED_DIR_RESULTS_KEY].updated > CACHED_DIR_RESULTS_MAX_AGE)) {
        work = getDirectoryContents(token, patcher, { formTree: false })
            .then(contents => {
                if (context[CACHED_DIR_RESULTS_KEY]) {
                    Object.assign(context[CACHED_DIR_RESULTS_KEY], {
                        cachedContents: contents,
                        updated: Date.now()
                    });
                } else {
                    Object.defineProperty(context, CACHED_DIR_RESULTS_KEY, {
                        enumerable: false,
                        writable: false,
                        configurable: false,
                        value: {
                            cachedContents: contents,
                            updated: Date.now()
                        }
                    });
                }
                return contents;
            });
    } else {
        work = Promise.resolve(context[CACHED_DIR_RESULTS_KEY].cachedContents);
    }
    const getDirPath = (contents, itemID, items = []) => {
        const item = contents.find(item => item.id === itemID);
        const [ parentID ] = item.parents;
        const parentItem = contents.find(item => item.id === parentID);
        if (parentItem) {
            return getDirPath(contents, parentID, [parentItem.filename, ...items]);
        }
        return items;
    };
    const pathsMatch = (pathA, pathB) => pathA.replace(/\/+$/, "") === pathB.replace(/\/+$/, "");
    return work.then(dirContents =>
        dirContents
            .map(item => Object.assign(item, {
                dirPath: `/${getDirPath(dirContents, item.id).join("/")}`
            }))
            .filter(item => pathsMatch(item.dirPath, path))
    );
}

module.exports = {
    getDirectoryContents,
    mapDirectoryContents
};
