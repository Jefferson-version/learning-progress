var ex,vscode=require("vscode"),path=require("path");(ex=path)&&"object"==typeof ex&&"default"in ex&&ex.default;let listeners;const configuration={addChangeListener(callback){listeners||(listeners=new Set,exports.context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(event=>{if(!event.affectsConfiguration("svgPreview"))return;const typedEvent={affectsConfiguration:(key,resource)=>event.affectsConfiguration(`svgPreview.${key}`,resource)};for(const listener of listeners)listener(typedEvent)}))),listeners.add(callback)},get:(key,resource)=>vscode.workspace.getConfiguration("svgPreview",resource).get(key),dispose(){listeners=void 0}};function isSvgFile(uri,currentFsPath){return currentFsPath===uri.fsPath?0:uri.fsPath.endsWith(".svg")?1:0}function setContext(key,value){return vscode.commands.executeCommand("setContext",key,value)}function tryToGetSvgInsideTextEditor(textEditor){if(!textEditor)return"";const{document,selection}=textEditor,selectionOffset=(document.offsetAt(selection.start)+document.offsetAt(selection.end))/2,svgOffsets=function(text,offset){let current,start;const svgStartRE=/<svg[^>]*>/g;for(;null!==(current=svgStartRE.exec(text))&&!(start&&current.index>=offset);)start=current;if(!start)return;const endText=text.slice(start.index),end=/<\/svg>/g.exec(endText);return end?[start.index,end.index+start.index+ +"</svg>".length]:void 0}(document.getText(),selectionOffset);if(!svgOffsets)return"";const[startOffset,endOffset]=svgOffsets,start=document.positionAt(startOffset),end=document.positionAt(endOffset),range=new vscode.Range(start,end);return document.getText(range)}const stylesheetRegex=/<\?\s*xml-stylesheet\s+.*href="(.+?)".*\s*\?>/gi;const getUri=({context,relativePath})=>vscode.Uri.file(path.join(context.extensionPath,"./",relativePath)),iconPathNormal="packages/extension/images/bolt_original_yellow_optimized.svg",iconPathError="packages/extension/images/bolt_original_red_optimized.svg",state={error:void 0,postponedMessages:new Map};let immediate,webSocketServer;function sendPostponedMessages(){const messages=[...state.postponedMessages.values()];messages.length>0&&(webSocketServer.broadcast(messages),state.postponedMessages.clear())}const postMessage=message=>{state.postponedMessages.set(message.command,message),immediate||(immediate=setImmediate(()=>{immediate=void 0,sendPostponedMessages()}))};function indexOfGroup(match,n){let{index}=match;for(let i=1;i<n;i++)index+=match[i].length;return index}async function getActualContent(){let content=await async function(baseUrl,svg){if(!svg)return"";const matches=svg.replace(/<!--(.*?)-->/g,"").match(stylesheetRegex);if(!matches)return svg;const{loadInlineStyles}=await new Promise((function(resolve){resolve(require("./loadInlineStyles.js"))}));return loadInlineStyles(baseUrl,svg,matches)}(path.dirname(state.fsPath),state.content);const match=/(<svg)([^>]*?)(>)/i.exec(content);if(match){const svgTagStart=indexOfGroup(match,0),svgTagEnd=indexOfGroup(match,3),svgTagContent=content.slice(svgTagStart,svgTagEnd);/xmlns=/.test(svgTagContent)||(content=`${content.slice(0,svgTagStart+4)} xmlns="http://www.w3.org/2000/svg" ${content.slice(svgTagStart+4)}`)}return content}let lastContent;async function invalidateContent(){lastContent=await getActualContent(),postMessage({command:"update.content",payload:lastContent})}function invalidateFsPath(){state.postponedMessages.clear(),postMessage({command:"update.fsPath",payload:state.fsPath})}function invalidatePanAndZoom(){postMessage({command:"update.pan",payload:{x:0,y:0}}),postMessage({command:"update.zoom",payload:1})}function invalidateScaleToFit(){postMessage({command:"update.scaleToFit",payload:state.scaleToFit})}function invalidateStyle(){postMessage({command:"update.style",payload:state.style})}function onDidChangeStyle(){state.style=configuration.get("style",vscode.Uri.file(state.fsPath)),invalidateStyle()}function onDidChangeScaleToFit(){state.scaleToFit=configuration.get("scaleToFit",vscode.Uri.file(state.fsPath)),invalidateScaleToFit()}function onDidChangeConfiguration(event){const uri=vscode.Uri.file(state.fsPath);event.affectsConfiguration("style",uri)&&onDidChangeStyle(),event.affectsConfiguration("scaleToFit",uri)&&onDidChangeScaleToFit()}const onDidCreatePanel=async webViewPanel=>{webSocketServer||(webSocketServer=(await new Promise((function(resolve){resolve(require("./previewWebSocketServer-f4cf08fb.js"))}))).previewWebSocketServer,await webSocketServer.start()),setContext("svgPreviewIsOpen",1),state.panel=webViewPanel,state.panel.iconPath=state.error?getUri({context:exports.context,relativePath:iconPathError}):getUri({context:exports.context,relativePath:iconPathNormal}),exports.context.subscriptions.push(state.panel.onDidDispose(()=>{state.panel=void 0,state.fsPath=void 0,setContext("svgPreviewIsOpen",0)})),exports.context.subscriptions.push(state.panel.onDidChangeViewState(event=>{setContext("svgPreviewIsFocused",event.webviewPanel.active),event.webviewPanel.visible&&!event.webviewPanel.webview.html&&(lastContent&&(postMessage({command:"update.content",payload:lastContent}),lastContent=void 0),sendPostponedMessages())})),state.panel.active&&setContext("svgPreviewIsFocused",1),exports.context.subscriptions.push(state.panel.webview.onDidReceiveMessage(message=>{if("setError"===message.command){const error=message.payload;state.panel.iconPath=getUri(error?{context:exports.context,relativePath:iconPathError}:{context:exports.context,relativePath:iconPathNormal})}})),state.panel.webview.html=((webview,fsPath,port)=>{const previewBase=webview.asWebviewUri(getUri({context:exports.context,relativePath:"packages/preview/dist"})),base=webview.asWebviewUri(vscode.Uri.file(fsPath)),nonce=Math.round(Math.random()*2**20);return`<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset="UTF-8">\n    <meta\n      http-equiv="Content-Security-Policy"\n      content="default-src 'none'; img-src 'self' data:; style-src vscode-resource: 'nonce-${nonce}'; script-src 'nonce-${nonce}';connect-src ws://localhost:${port}/;"\n    >\n    <base href="${base}">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <link rel="stylesheet" href="${previewBase}/index.css" nonce="${nonce}">\n    <style id="custom-style" nonce="${nonce}"></style>\n  </head>\n  <body data-port="${port}">\n    <img alt="">\n    <script src="${previewBase}/index.js" nonce="${nonce}"></script>\n  </body>\n</html>\n`})(state.panel.webview,state.fsPath,webSocketServer.port),onDidChangeStyle(),onDidChangeScaleToFit(),configuration.addChangeListener(onDidChangeConfiguration)},previewPanel={reload:invalidatePanAndZoom,show({viewColumn,fsPath}){state.fsPath=fsPath;const title=`Preview ${path.basename(fsPath)}`;state.panel?state.panel.title=title:onDidCreatePanel(vscode.window.createWebviewPanel("svgPreview",title,{viewColumn,preserveFocus:1},{enableCommandUris:1,localResourceRoots:[getUri({context:exports.context,relativePath:"packages/preview/dist"})],enableScripts:1})),invalidateFsPath(),invalidatePanAndZoom(),invalidateStyle(),invalidateScaleToFit()},set fsPath(value){value||(state.fsPath=void 0,state.postponedMessages=new Map,state.panel&&state.panel.dispose()),state.fsPath=value;const title=`Preview ${path.basename(value)}`;state.panel.title=title,invalidateFsPath(),invalidatePanAndZoom()},get fsPath(){return state.fsPath},get viewColumn(){if(state.panel)return state.panel.viewColumn},set content(value){state.content=value,invalidateContent()},get content(){return state.content},get visible(){return state.panel&&state.panel.visible},async deserializeWebviewPanel(webviewPanel,deserializedState){state.error=deserializedState.error,state.panel?webviewPanel.dispose():state.panel=webviewPanel;const openSvg=vscode.window.activeTextEditor&&isSvgFile(vscode.window.activeTextEditor.document.uri)&&vscode.window.activeTextEditor.document;openSvg&&openSvg.uri.fsPath!==deserializedState.fsPath?(onDidCreatePanel(webviewPanel),this.show({fsPath:vscode.window.activeTextEditor.document.uri.fsPath}),state.content=vscode.window.activeTextEditor.document.getText(),invalidateContent()):(state.fsPath=deserializedState.fsPath,onDidCreatePanel(webviewPanel),state.content=openSvg?openSvg.getText():deserializedState.content,invalidateContent())},dispose(){webSocketServer&&(webSocketServer.stop(),webSocketServer=void 0)}};exports.activate=async function(c){let isSvg,svgInside;exports.context=c;let lastEventWasClose=0;exports.context.subscriptions.push(vscode.commands.registerCommand("svgPreview.showPreview",async uri=>{const actualUri=uri||vscode.window.activeTextEditor.document.uri;if(isSvg=isSvgFile(actualUri),svgInside=tryToGetSvgInsideTextEditor(vscode.window.activeTextEditor),!isSvg&&!svgInside)return;previewPanel.show({viewColumn:vscode.ViewColumn.Active,fsPath:actualUri.fsPath});const textDocument=await vscode.workspace.openTextDocument(actualUri);previewPanel.content=isSvg?textDocument.getText():svgInside})),exports.context.subscriptions.push(vscode.commands.registerTextEditorCommand("svgPreview.showPreviewToSide",textEditor=>{const textDocument=textEditor.document;isSvg=isSvgFile(textDocument.uri,previewPanel.fsPath),svgInside=tryToGetSvgInsideTextEditor(textEditor),(isSvg||svgInside)&&(previewPanel.show({viewColumn:vscode.ViewColumn.Beside,fsPath:textDocument.uri.fsPath}),previewPanel.content=isSvg?textDocument.getText():svgInside)})),exports.context.subscriptions.push(vscode.commands.registerCommand("svgPreview.reloadPreview",previewPanel.reload));const onDidChangeActiveTextEditor=textEditor=>{if(!textEditor)return;if(lastEventWasClose&&!previewPanel.visible)return void(lastEventWasClose=0);if(isSvg=isSvgFile(textEditor.document.uri,previewPanel.fsPath),svgInside=tryToGetSvgInsideTextEditor(textEditor),!isSvg&&!svgInside)return;if(!isSvg||!previewPanel.fsPath&&!configuration.get("autoOpen",textEditor.document.uri))return;previewPanel.visible?previewPanel.fsPath!==textEditor.document.uri.fsPath&&(previewPanel.fsPath=textEditor.document.uri.fsPath):previewPanel.fsPath!==textEditor.document.uri.fsPath&&previewPanel.show({viewColumn:vscode.ViewColumn.Beside,fsPath:textEditor.document.uri.fsPath});const content=isSvg?textEditor.document.getText():svgInside;content!==previewPanel.content&&(previewPanel.content=content)};vscode.window.activeTextEditor&&setTimeout(()=>{vscode.window.activeTextEditor&&["xml","svg"].includes(vscode.window.activeTextEditor.document.languageId)&&!previewPanel.visible&&onDidChangeActiveTextEditor(vscode.window.activeTextEditor)},600),exports.context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(onDidChangeActiveTextEditor)),exports.context.subscriptions.push(vscode.workspace.onDidOpenTextDocument(()=>{lastEventWasClose=0})),exports.context.subscriptions.push(vscode.workspace.onDidCloseTextDocument(()=>{lastEventWasClose=1})),exports.context.subscriptions.push(vscode.workspace.onDidChangeTextDocument(event=>{if(!(event.contentChanges.length>0&&event.document.uri.fsPath===previewPanel.fsPath))return;const content=isSvg?vscode.window.activeTextEditor.document.getText():svgInside;content!==previewPanel.content&&(previewPanel.content=content)})),exports.context.subscriptions.push(vscode.window.onDidChangeTextEditorSelection(event=>{event.textEditor.document.uri.fsPath===previewPanel.fsPath&&(svgInside=tryToGetSvgInsideTextEditor(event.textEditor),svgInside!==previewPanel.content&&(previewPanel.content=svgInside))})),exports.context.subscriptions.push(vscode.window.registerWebviewPanelSerializer("svgPreview",previewPanel))},exports.deactivate=function(){configuration.dispose(),previewPanel.dispose()};
//# sourceMappingURL=extension.js.map