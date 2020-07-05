import 'reflect-metadata';
export * from 'typeorm';
export * from './entity/User';
export declare function superConnection(): Promise<import("typeorm").Connection>;
