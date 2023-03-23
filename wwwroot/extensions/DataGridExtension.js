/// import * as Autodesk from "@types/forge-viewer";

import { BaseExtension } from './BaseExtension.js';
import { DataGridPanel } from './DataGridPanel.js';

class DataGridExtension extends BaseExtension {
    constructor(viewer, options) {
        super(viewer, options);
        this._button = null;
        this._panel = null;
    }

    async load() {
        super.load();
        await Promise.all([
            this.loadScript('https://unpkg.com/tabulator-tables@4.9.3/dist/js/tabulator.min.js', 'Tabulator'),
            this.loadStylesheet('https://unpkg.com/tabulator-tables@4.9.3/dist/css/tabulator.min.css')
        ]);
        console.log('DataGridExtension loaded.');
        return true;
    }

    unload() {
        super.unload();
        if (this._button) {
            this.removeToolbarButton(this._button);
            this._button = null;
        }
        if (this._panel) {
            this._panel.setVisible(false);
            this._panel.uninitialize();
            this._panel = null;
        }
        console.log('DataGridExtension unloaded.');
        return true;
    }

    onToolbarCreated() {
        this._panel = new DataGridPanel(this, 'dashboard-datagrid-panel', 'Data Grid', { x: 10, y: 10 });
        this._button = this.createToolbarButton('dashboard-datagrid-button', 'https://img.icons8.com/small/32/activity-grid.png', 'Show Data Grid');
        this._button.onClick = () => {
            this._panel.setVisible(!this._panel.isVisible());
            this._button.setState(this._panel.isVisible() ? Autodesk.Viewing.UI.Button.State.ACTIVE : Autodesk.Viewing.UI.Button.State.INACTIVE);
            if (this._panel.isVisible() && this.viewer.model) {
                this.update();
            }
        };
    }

    onModelLoaded(model) {
        super.onModelLoaded(model);
        if (this._panel && this._panel.isVisible()) {
            this.update();
        }
    }

    async findPropertyValueQuantities(model, typeName) {
        const dbids = await this.findLeafNodes(model);
        return new Promise(function (resolve, reject) {
            model.getBulkProperties(dbids, { categoryFilter: [typeName] }, function (results) {
                let map = new Map();
                for (const result of results) {
					const key = result.properties[1].displayValue; // Group by Category
					const value = result.properties.find( i => i.displayName === "Area" ); // search for area value
					if (value)
						map.set(key, (map.get(key) || 0) + value.displayValue);
                }
                resolve(map);
            }, reject);
        });
    }

    async update() {
        const resultsMap = await this.findPropertyValueQuantities(this.viewer.model, "Structural Material");
		const results = Array.from(resultsMap).map(([name, value]) => ({name, value}))

		console.log(results);
        this._panel.update(this.viewer.model, results);
    }
}

Autodesk.Viewing.theExtensionManager.registerExtension('DataGridExtension', DataGridExtension);
