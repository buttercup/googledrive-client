export interface FileItem {
    created: string;
    id: string;
    filename: string;
    modified: string;
    parents: Array<string>;
    mime: string;
    shared: boolean;
    size: number;
    type: "file" | "directory";
}

export interface FileTreeNode {
    id: string | null;
    filename: string | null;
    files: Array<FileItem>;
    children: Array<FileTreeNode>;
}

export function formulateTree(files: FileItem[]): FileTreeNode {
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
    const getLevel = (item?: FileItem): FileTreeNode => ({
        id: item ? item.id : null,
        filename: item ? item.filename : null,
        files: !item
            ? files.filter(
                  file =>
                      file.type === "file" &&
                      (file.parents.length === 0 ||
                          file.parents.some(parentID => rootIDs.indexOf(parentID) >= 0))
              )
            : files.filter(file => file.type === "file" && file.parents.indexOf(item.id) >= 0),
        children: (!item
            ? files.filter(
                  file =>
                      file.type === "directory" &&
                      (file.parents.length === 0 ||
                          file.parents.some(parentID => rootIDs.indexOf(parentID) >= 0))
              )
            : files.filter(file => file.type === "directory" && file.parents.indexOf(item.id) >= 0)
        ).map(child => getLevel(child))
    });
    return getLevel();
}
