/// import * as Autodesk from "@types/forge-viewer";

import './extensions/LoggerExtension.js';
import './extensions/DataGridExtension.js';
import './extensions/HistogramExtension.js';

async function getAccessToken(callback) {
    try {
        const resp = await fetch('/api/auth/token');
        if (!resp.ok)
            throw new Error(await resp.text());
        const { access_token, expires_in } = await resp.json();
        callback(access_token, expires_in);
    } catch (err) {
        alert('Could not obtain access token. See the console for more details.');
        console.error(err);        
    }
}

export function initViewer(container) {
    return new Promise(function (resolve, reject) {
        Autodesk.Viewing.Initializer({ getAccessToken }, async function () {
			const extensions = { extensions: [
                    'Autodesk.Vault.Markups',
                    'Autodesk.VisualClusters',
                    'LoggerExtension',
                    'DataGridExtension',
                    'HistogramExtension'
                ]};
            const viewer = new Autodesk.Viewing.GuiViewer3D(container, extensions);
            viewer.start();
            viewer.setTheme('light-theme');
            resolve(viewer);
        });
    });
}

export function loadModel(viewer, urn) {
	console.table({"URN":urn, "decodedURN": atob(urn)});
    function onDocumentLoadSuccess(doc) {
        viewer.loadDocumentNode(doc, doc.getRoot().getDefaultGeometry());
    }
    function onDocumentLoadFailure(code, message) {
        alert('Could not load model. See console for more details.');
        console.error(message);
    }
    Autodesk.Viewing.Document.load('urn:' + urn, onDocumentLoadSuccess, onDocumentLoadFailure);
}


setTimeout( () =>{
	loadModel (NOP_VIEWER, "dXJuOmFkc2sud2lwZW1lYTpmcy5maWxlOnZmLm04SmdKVWFjUWhHRlJsYTNoWmRUTGc/dmVyc2lvbj0x");
},4000)
