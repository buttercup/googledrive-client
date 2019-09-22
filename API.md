## Modules

<dl>
<dt><a href="#module_GoogleDriveClient">GoogleDriveClient</a></dt>
<dd></dd>
</dl>

## Classes

<dl>
<dt><a href="#GoogleDriveClientAdapter">GoogleDriveClientAdapter</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#getDirectoryContents">getDirectoryContents(token, patcher, [options])</a> ⇒ <code>Promise.&lt;(Array.&lt;FileItem&gt;|FileTreeNode)&gt;</code></dt>
<dd><p>Get directory contents</p>
</dd>
<dt><a href="#mapDirectoryContents">mapDirectoryContents(token, patcher, context, path)</a> ⇒ <code>Promise.&lt;Array.&lt;PosixPathFileItem&gt;&gt;</code></dt>
<dd><p>Get directory contents for a non-standard directory path</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#IntGetDirectoryContentsOptions">IntGetDirectoryContentsOptions</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#FileItem">FileItem</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#PosixPathFileItem">PosixPathFileItem</a> : <code><a href="#FileItem">FileItem</a></code></dt>
<dd></dd>
<dt><a href="#FileTreeNode">FileTreeNode</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#GoogleDriveClientAdapter">GoogleDriveClientAdapter</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#GetDirectoryContentsOptions">GetDirectoryContentsOptions</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#PutFileContentsOptions">PutFileContentsOptions</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="module_GoogleDriveClient"></a>

## GoogleDriveClient
<a name="module_GoogleDriveClient.createClient"></a>

### GoogleDriveClient.createClient(token) ⇒ [<code>GoogleDriveClientAdapter</code>](#GoogleDriveClientAdapter)
Create a new Google Drive client adapter using a token

**Kind**: static method of [<code>GoogleDriveClient</code>](#module_GoogleDriveClient)  
**Returns**: [<code>GoogleDriveClientAdapter</code>](#GoogleDriveClientAdapter) - A client adapter instance  

| Param | Type | Description |
| --- | --- | --- |
| token | <code>String</code> | The dropbox token |

<a name="GoogleDriveClientAdapter"></a>

## GoogleDriveClientAdapter
**Kind**: global class  

* [GoogleDriveClientAdapter](#GoogleDriveClientAdapter)
    * [.request](#GoogleDriveClientAdapter.request) : <code>function</code>
    * [.patcher](#GoogleDriveClientAdapter.patcher) : <code>HotPatcher</code>
    * [.deleteFile(id)](#GoogleDriveClientAdapter.deleteFile) ⇒ <code>Promise</code>
    * [.getDirectoryContents([options])](#GoogleDriveClientAdapter.getDirectoryContents) ⇒ <code>Promise.&lt;(Array.&lt;FileItem&gt;\|FileTreeNode)&gt;</code>
    * [.getFileContents(id)](#GoogleDriveClientAdapter.getFileContents) ⇒ <code>Promise.&lt;String&gt;</code>
    * [.mapDirectoryContents(dirPath)](#GoogleDriveClientAdapter.mapDirectoryContents) ⇒ <code>Promise.&lt;Array.&lt;FullPathFileItem&gt;&gt;</code>
    * [.putFileContents(options)](#GoogleDriveClientAdapter.putFileContents) ⇒ <code>Promise.&lt;String&gt;</code>

<a name="GoogleDriveClientAdapter.request"></a>

### GoogleDriveClientAdapter.request : <code>function</code>
**Kind**: static property of [<code>GoogleDriveClientAdapter</code>](#GoogleDriveClientAdapter)  
**See**: https://github.com/perry-mitchell/cowl  
<a name="GoogleDriveClientAdapter.patcher"></a>

### GoogleDriveClientAdapter.patcher : <code>HotPatcher</code>
**Kind**: static property of [<code>GoogleDriveClientAdapter</code>](#GoogleDriveClientAdapter)  
<a name="GoogleDriveClientAdapter.deleteFile"></a>

### GoogleDriveClientAdapter.deleteFile(id) ⇒ <code>Promise</code>
Delete a remote file

**Kind**: static method of [<code>GoogleDriveClientAdapter</code>](#GoogleDriveClientAdapter)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The file ID |

<a name="GoogleDriveClientAdapter.getDirectoryContents"></a>

### GoogleDriveClientAdapter.getDirectoryContents([options]) ⇒ <code>Promise.&lt;(Array.&lt;FileItem&gt;\|FileTreeNode)&gt;</code>
Get the remote contents
(Fetches all of the remote file tree)

**Kind**: static method of [<code>GoogleDriveClientAdapter</code>](#GoogleDriveClientAdapter)  
**Returns**: <code>Promise.&lt;(Array.&lt;FileItem&gt;\|FileTreeNode)&gt;</code> - An array of file items when tree=false, and a
 full file tree if tree=true  

| Param | Type | Description |
| --- | --- | --- |
| [options] | [<code>GetDirectoryContentsOptions</code>](#GetDirectoryContentsOptions) | Options for the request |

<a name="GoogleDriveClientAdapter.getFileContents"></a>

### GoogleDriveClientAdapter.getFileContents(id) ⇒ <code>Promise.&lt;String&gt;</code>
Get the remote contents of a file
(currently only supports text files)

**Kind**: static method of [<code>GoogleDriveClientAdapter</code>](#GoogleDriveClientAdapter)  
**Returns**: <code>Promise.&lt;String&gt;</code> - A promise that resolves with the file contents  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The file ID |

<a name="GoogleDriveClientAdapter.mapDirectoryContents"></a>

### GoogleDriveClientAdapter.mapDirectoryContents(dirPath) ⇒ <code>Promise.&lt;Array.&lt;FullPathFileItem&gt;&gt;</code>
Get directory contents using a non-standard path
(not guaranteed to work in all environments and ignores duplicate files or
directories with the same name)

**Kind**: static method of [<code>GoogleDriveClientAdapter</code>](#GoogleDriveClientAdapter)  
**Returns**: <code>Promise.&lt;Array.&lt;FullPathFileItem&gt;&gt;</code> - An array of file items with full directory paths  

| Param | Type | Description |
| --- | --- | --- |
| dirPath | <code>String</code> | The directory to get the contents of |

<a name="GoogleDriveClientAdapter.putFileContents"></a>

### GoogleDriveClientAdapter.putFileContents(options) ⇒ <code>Promise.&lt;String&gt;</code>
Write contents to a remote file

**Kind**: static method of [<code>GoogleDriveClientAdapter</code>](#GoogleDriveClientAdapter)  
**Returns**: <code>Promise.&lt;String&gt;</code> - A promise that resolves with the file's ID  

| Param | Type | Description |
| --- | --- | --- |
| options | [<code>PutFileContentsOptions</code>](#PutFileContentsOptions) | Options for the request |

<a name="getDirectoryContents"></a>

## getDirectoryContents(token, patcher, [options]) ⇒ <code>Promise.&lt;(Array.&lt;FileItem&gt;\|FileTreeNode)&gt;</code>
Get directory contents

**Kind**: global function  
**Returns**: <code>Promise.&lt;(Array.&lt;FileItem&gt;\|FileTreeNode)&gt;</code> - A promise that resolves with an array of file items
 (formTree=false) or a file tree node (formTree=true)  

| Param | Type | Description |
| --- | --- | --- |
| token | <code>String</code> | The OAuth token |
| patcher | <code>HotPatcher</code> | The patcher instance |
| [options] | [<code>IntGetDirectoryContentsOptions</code>](#IntGetDirectoryContentsOptions) | Directory contents request options |

<a name="mapDirectoryContents"></a>

## mapDirectoryContents(token, patcher, context, path) ⇒ <code>Promise.&lt;Array.&lt;PosixPathFileItem&gt;&gt;</code>
Get directory contents for a non-standard directory path

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| token | <code>String</code> | The OAuth token |
| patcher | <code>HotPatcher</code> | The patcher instance |
| context | <code>Object</code> | The context for memoizing the directory contents results |
| path | <code>String</code> | The path to map for (eg "/images") |

<a name="IntGetDirectoryContentsOptions"></a>

## IntGetDirectoryContentsOptions : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [currentFiles] | <code>Array.&lt;Object&gt;</code> | Previously fetched files to add to future results (pages) |
| [nextPageToken] | <code>String</code> | Token to use for fetching the contents of the next page |

<a name="FileItem"></a>

## FileItem : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The ID of the item |
| filename | <code>String</code> | The name of the file |
| parents | <code>Array.&lt;String&gt;</code> | An array of parent IDs |
| mime | <code>String</code> | The MIME type |
| type | <code>String</code> | Either "file" or "directory" |

<a name="PosixPathFileItem"></a>

## PosixPathFileItem : [<code>FileItem</code>](#FileItem)
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| dirPath | <code>String</code> | The directory path containing this file |

<a name="FileTreeNode"></a>

## FileTreeNode : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>String</code> \| <code>null</code> | The ID of the item (null for root) |
| filename | <code>String</code> \| <code>null</code> | The name of the item (null for root) |
| files | [<code>Array.&lt;FileItem&gt;</code>](#FileItem) | Files under this parent |
| children | [<code>Array.&lt;FileTreeNode&gt;</code>](#FileTreeNode) | Child nodes (directories) |

<a name="GoogleDriveClientAdapter"></a>

## GoogleDriveClientAdapter : <code>Object</code>
**Kind**: global typedef  

* [GoogleDriveClientAdapter](#GoogleDriveClientAdapter) : <code>Object</code>
    * [.request](#GoogleDriveClientAdapter.request) : <code>function</code>
    * [.patcher](#GoogleDriveClientAdapter.patcher) : <code>HotPatcher</code>
    * [.deleteFile(id)](#GoogleDriveClientAdapter.deleteFile) ⇒ <code>Promise</code>
    * [.getDirectoryContents([options])](#GoogleDriveClientAdapter.getDirectoryContents) ⇒ <code>Promise.&lt;(Array.&lt;FileItem&gt;\|FileTreeNode)&gt;</code>
    * [.getFileContents(id)](#GoogleDriveClientAdapter.getFileContents) ⇒ <code>Promise.&lt;String&gt;</code>
    * [.mapDirectoryContents(dirPath)](#GoogleDriveClientAdapter.mapDirectoryContents) ⇒ <code>Promise.&lt;Array.&lt;FullPathFileItem&gt;&gt;</code>
    * [.putFileContents(options)](#GoogleDriveClientAdapter.putFileContents) ⇒ <code>Promise.&lt;String&gt;</code>

<a name="GoogleDriveClientAdapter.request"></a>

### GoogleDriveClientAdapter.request : <code>function</code>
**Kind**: static property of [<code>GoogleDriveClientAdapter</code>](#GoogleDriveClientAdapter)  
**See**: https://github.com/perry-mitchell/cowl  
<a name="GoogleDriveClientAdapter.patcher"></a>

### GoogleDriveClientAdapter.patcher : <code>HotPatcher</code>
**Kind**: static property of [<code>GoogleDriveClientAdapter</code>](#GoogleDriveClientAdapter)  
<a name="GoogleDriveClientAdapter.deleteFile"></a>

### GoogleDriveClientAdapter.deleteFile(id) ⇒ <code>Promise</code>
Delete a remote file

**Kind**: static method of [<code>GoogleDriveClientAdapter</code>](#GoogleDriveClientAdapter)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The file ID |

<a name="GoogleDriveClientAdapter.getDirectoryContents"></a>

### GoogleDriveClientAdapter.getDirectoryContents([options]) ⇒ <code>Promise.&lt;(Array.&lt;FileItem&gt;\|FileTreeNode)&gt;</code>
Get the remote contents
(Fetches all of the remote file tree)

**Kind**: static method of [<code>GoogleDriveClientAdapter</code>](#GoogleDriveClientAdapter)  
**Returns**: <code>Promise.&lt;(Array.&lt;FileItem&gt;\|FileTreeNode)&gt;</code> - An array of file items when tree=false, and a
 full file tree if tree=true  

| Param | Type | Description |
| --- | --- | --- |
| [options] | [<code>GetDirectoryContentsOptions</code>](#GetDirectoryContentsOptions) | Options for the request |

<a name="GoogleDriveClientAdapter.getFileContents"></a>

### GoogleDriveClientAdapter.getFileContents(id) ⇒ <code>Promise.&lt;String&gt;</code>
Get the remote contents of a file
(currently only supports text files)

**Kind**: static method of [<code>GoogleDriveClientAdapter</code>](#GoogleDriveClientAdapter)  
**Returns**: <code>Promise.&lt;String&gt;</code> - A promise that resolves with the file contents  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The file ID |

<a name="GoogleDriveClientAdapter.mapDirectoryContents"></a>

### GoogleDriveClientAdapter.mapDirectoryContents(dirPath) ⇒ <code>Promise.&lt;Array.&lt;FullPathFileItem&gt;&gt;</code>
Get directory contents using a non-standard path
(not guaranteed to work in all environments and ignores duplicate files or
directories with the same name)

**Kind**: static method of [<code>GoogleDriveClientAdapter</code>](#GoogleDriveClientAdapter)  
**Returns**: <code>Promise.&lt;Array.&lt;FullPathFileItem&gt;&gt;</code> - An array of file items with full directory paths  

| Param | Type | Description |
| --- | --- | --- |
| dirPath | <code>String</code> | The directory to get the contents of |

<a name="GoogleDriveClientAdapter.putFileContents"></a>

### GoogleDriveClientAdapter.putFileContents(options) ⇒ <code>Promise.&lt;String&gt;</code>
Write contents to a remote file

**Kind**: static method of [<code>GoogleDriveClientAdapter</code>](#GoogleDriveClientAdapter)  
**Returns**: <code>Promise.&lt;String&gt;</code> - A promise that resolves with the file's ID  

| Param | Type | Description |
| --- | --- | --- |
| options | [<code>PutFileContentsOptions</code>](#PutFileContentsOptions) | Options for the request |

<a name="GetDirectoryContentsOptions"></a>

## GetDirectoryContentsOptions : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [tree] | <code>Boolean</code> | Fetch results as a tree (default: true) |

<a name="PutFileContentsOptions"></a>

## PutFileContentsOptions : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| contents | <code>String</code> | The contents to write to the remote |
| [id] | <code>String</code> | The ID of the file if overwriting, or null/undefined if  a new file |
| [name] | <code>String</code> | The filename - Should be set if creating a new file |
| [parent] | <code>String</code> | Parent ID of the folder it should reside in |

