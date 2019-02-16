import { Readable, Transform, Writable } from 'stream';
export type Callback = (error: Error | null | undefined) => void;
export type TCallback = (error?: Error | undefined ) => void;

export class GReadable<T1> extends Readable {
  constructor(props: any = {}) {
    super({ ...props, objectMode: true });
  }

  _read(): void {}

  pipe(stream: any): any {
    return super.pipe(stream);
  }

  pipeT<T2>(stream: GTransform<T1, T2>): GTransform<T1, T2> {
    return super.pipe(stream);
  }

  pipeW(stream: GWritable<T1>): GWritable<T1> {
    return super.pipe(stream);
  }

  push(t: T1, encoding?: string): boolean {
    return super.push(t);
  }

  protected finalize(encoding?: string | TCallback, callback?: TCallback): void {
    if (encoding instanceof Function) {
      encoding();
    } else if (callback instanceof Function) {
      callback();
    }
  }

}

export abstract class GTransform<T1, T2> extends Transform {

  constructor(props: any = {}) {
    super({ ...props, objectMode: true });
  }
  abstract _transform(e: T1, encoding?: string | TCallback, callback?: TCallback): void;
  pipe(stream: any): any {
    return super.pipe(stream);
  }
  pipeT<T3>(stream: GTransform<T2, T3>): GTransform<T2, T3> {
    return super.pipe(stream);
  }
  pipeW(stream: GWritable<T2>): GWritable<T2> {
    return super.pipe(stream);
  }

  push(t: T2): boolean {
    return super.push(t);
  }
  protected finalize(encoding?: string | TCallback, callback?: TCallback): void {
    if (encoding instanceof Function) { encoding(); } else if (callback instanceof Function) { callback(); }
  }

}

export abstract class GWritable<T1> extends Writable {
  abstract _write(chunk: T1, encoding?: string | Callback, callback?: Callback): void;
}
