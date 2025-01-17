import { PropertyAPI, PropertyManagerAPI } from '../../components/properties/BaseDefinitions';
import { IFCWorkerHandler } from '../IFCWorkerHandler';
import { WorkerActions, WorkerAPIs } from '../BaseDefinitions';
import { BufferGeometry } from 'three';
import { IdAttrName } from '../../BaseDefinitions';

export class PropertyHandler implements PropertyManagerAPI {

    API = WorkerAPIs.properties;

    constructor(private handler: IFCWorkerHandler) {
    }

    async getExpressId(geometry: BufferGeometry, faceIndex: number) {
        if (!geometry.index) throw new Error('Geometry does not have index information.');
        const geoIndex = geometry.index.array;
        return geometry.attributes[IdAttrName].getX(geoIndex[3 * faceIndex]);
    }

    getAllItemsOfType(modelID: number, type: number, verbose: boolean): Promise<any[]> {
        return this.handler.request(this.API, WorkerActions.getAllItemsOfType, { modelID, type, verbose });
    }

    getItemProperties(modelID: number, elementID: number, recursive: boolean): Promise<any> {
        return this.handler.request(this.API, WorkerActions.getItemProperties, { modelID, elementID, recursive });
    }

    getMaterialsProperties(modelID: number, elementID: number, recursive: boolean): Promise<any[]> {
        return this.handler.request(this.API, WorkerActions.getMaterialsProperties, { modelID, elementID, recursive });
    }

    getPropertySets(modelID: number, elementID: number, recursive: boolean): Promise<any[]> {
        return this.handler.request(this.API, WorkerActions.getPropertySets, { modelID, elementID, recursive });
    }

    getTypeProperties(modelID: number, elementID: number, recursive: boolean): Promise<any[]> {
        return this.handler.request(this.API, WorkerActions.getTypeProperties, { modelID, elementID, recursive });
    }

    getSpatialStructure(modelID: number, includeProperties?: boolean): Promise<any> {
        return this.handler.request(this.API, WorkerActions.getSpatialStructure, { modelID, includeProperties });
    }
}