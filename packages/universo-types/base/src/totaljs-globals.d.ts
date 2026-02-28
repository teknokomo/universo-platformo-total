// Type definitions for Total.js v5 global APIs
declare global {
  function ROUTE(path: string, fn: Function, ...args: unknown[]): void;
  function NEWACTION(name: string, config: TotaljsActionConfig): void;
  function DBMS(): TotaljsDBMS;
  function NEWSCHEMA(name: string): TotaljsSchema;
  function AUTH(fn: Function): void;
  function CONF(key: string, value?: unknown): unknown;
  function EMIT(event: string, ...args: unknown[]): void;
  function ON(event: string, fn: Function): void;
  function SUCCESS(value?: unknown): TotaljsSuccess;
  function INVALID(error: string): TotaljsError;
  function RESTBuilder(url: string): TotaljsRESTBuilder;

  const F: TotaljsFramework;
  const FUNC: Record<string, Function>;
  const REPO: Record<string, unknown>;
  const DATA: TotaljsDBMS;
  const NOW: Date;

  interface TotaljsActionConfig {
    name?: string;
    input?: string;
    output?: string;
    action?: (this: TotaljsController, $: TotaljsAction, model: unknown) => void;
    permissions?: string[];
  }

  interface TotaljsDBMS {
    find(table: string): TotaljsQueryBuilder;
    read(table: string): TotaljsQueryBuilder;
    insert(table: string, data?: unknown): TotaljsQueryBuilder;
    update(table: string, data?: unknown): TotaljsQueryBuilder;
    remove(table: string): TotaljsQueryBuilder;
    query(sql: string, params?: unknown[]): TotaljsQueryBuilder;
  }

  interface TotaljsQueryBuilder {
    where(field: string, value: unknown): this;
    where(field: string, operator: string, value: unknown): this;
    id(id: string): this;
    userid(id: string): this;
    search(field: string, value: string, type?: string): this;
    limit(n: number): this;
    skip(n: number): this;
    sort(field: string, desc?: boolean): this;
    error(code: number | string): this;
    fields(...fields: string[]): this;
    callback(fn: (err: Error | null, response: unknown) => void): void;
    promise($?: unknown): Promise<unknown>;
  }

  interface TotaljsController {
    user: unknown;
    session: unknown;
    body: unknown;
    query: Record<string, string>;
    params: Record<string, string>;
    headers: Record<string, string>;
    ip: string;
    url: string;
    method: string;
    json(data: unknown): void;
    status(code: number): this;
    invalid(error: string): void;
    success(value?: unknown): void;
    redirect(url: string, permanent?: boolean): void;
  }

  interface TotaljsAction {
    value: unknown;
    user: unknown;
    error: (error: string) => void;
    success: (value?: unknown) => void;
    invalid: (error: string) => void;
    callback: (err?: Error | null, value?: unknown) => void;
    middleware: (...names: string[]) => this;
    controller: TotaljsController;
  }

  interface TotaljsSchema {
    define(name: string, type: string, required?: boolean): this;
    required(field: string): this;
    make(data?: unknown): unknown;
    clean(data: unknown): unknown;
  }

  interface TotaljsFramework {
    port: number;
    config: Record<string, unknown>;
    routes: unknown[];
    load(dir?: string): void;
    http(type: string, options?: unknown): void;
    start(callback?: Function): void;
  }

  interface TotaljsRESTBuilder {
    get(url?: string): this;
    post(data?: unknown): this;
    put(data?: unknown): this;
    delete(): this;
    header(name: string, value: string): this;
    json(): Promise<unknown>;
    callback(fn: (err: Error | null, response: unknown) => void): void;
  }

  interface TotaljsSuccess {
    success: boolean;
    value?: unknown;
  }

  interface TotaljsError {
    error: string;
  }
}

export {};
