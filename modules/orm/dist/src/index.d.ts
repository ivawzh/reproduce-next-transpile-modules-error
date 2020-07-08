import 'reflect-metadata';
import { Connection, ConnectionOptions } from 'typeorm';
import * as ormConfig from '../ormconfig';
declare type ormConfig = ConnectionOptions;
export { ormConfig };
export * from 'typeorm';
export * from './entity/User';
export declare const a = 3;
export declare function superCreateConnection(): Promise<Connection>;
