import { Readable, Transform, Writable } from 'stream';
export type Callback = (error: Error | null | undefined) => void;
export type TCallback = (error?: Error | undefined ) => void;

export abstract class GReadable<T1> extends Readable {
  constructor(props: any = {}){
    super({ ...props, objectMode: true });
  };

  _read(){}

  push(t: T1, encoding?: string){
    return super.push(t);
  };

  pipeT<T2>(stream: GTransform<T1, T2>): GTransform<T1, T2> {
    return super.pipe(stream);
  };

  pipeW(stream: GWritable<T1>): GWritable<T1> {
    return super.pipe(stream);
  };

  pipe(stream: any): any {
    console.warn(`${this.constructor.name}.stream is deprecated use either pipeT or pipeW`);
    return super.pipe(stream);
  };

};

export abstract class GTransform<T1, T2> extends Transform {
  constructor(props: any = {}){
    super({ ...props, objectMode: true });
  };

  abstract _transform(e: T1, encoding?: string | TCallback, callback?: TCallback): void

  push(t: T2){
    return super.push(t);
  };

  pipeT<T3>(stream: GTransform<T2, T3>): GTransform<T2, T3> {
    return super.pipe(stream);
  };

  pipeW(stream: GWritable<T2>): GWritable<T2> {
    return super.pipe(stream);
  };

  pipe(stream: any): any {
    console.warn(`${this.constructor.name}.stream is deprecated use either pipeT or pipeW`);
    return super.pipe(stream);
  };
};

export abstract class GWritable<T1> extends Writable {
  abstract _write(chunk: T1, encoding?: string | Callback, callback?: Callback): void;
};
