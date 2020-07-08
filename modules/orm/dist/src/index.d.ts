import 'reflect-metadata';
import { Connection, ConnectionOptions } from 'typeorm';
import * as ormConfig from '../ormconfig';
declare type ormConfig = ConnectionOptions;
export { ormConfig };
export * from 'typeorm';
export * from './entity/User';
export declare const a = 2;
export declare function ensureConnection(name?: string): Promise<Connection>;
