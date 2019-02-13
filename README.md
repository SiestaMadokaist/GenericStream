# GStream

Type-safe version of node-stream.
e.g:

## `GReadable<T1>`
  Readable stream of T1

  Ensure the pushed element is of type T1
  Ensure the piped stream is either a Transfrom Stream that accept T1 and transform it into T2
  or a Write Stream that accept T1.

  - `.push(t: T1, ...)`

  - `.pipeW(writeStream: GWritable<T1>): GWritable<T1>`

  - `.pipeT(transformStream: GTransform<T1, T2>): GTransform<T1, T2>`

## `GTransform<T1, T2>`
  Transform stream of T1 into T2

  Ensure the element to transform is of type T1, and is transformed into T2.

  Ensure the piped stream is either a Transfrom Stream that accept T1 and transform it into T2
  or a Write Stream that accept T1.

  - `.push(t: T2, ...)`

  - `.pipeW(writeStream: GWritable<T1>): GWritable<T1>`

  - `.pipeT<T3>(transformStream: GTransform<T2, T3>): GTransform<T2, T3>`

## `GWritable<T1>`
  Write Stream of T1
  ensure the element to be written is of type T1.

  - `.write(t: T1, ...)`
