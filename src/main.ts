import { path } from 'ramda'
interface UnwrapFns<Payload> {
  Some: (payload: Payload) => void
  None: (message?: string) => void
}

type UnwrapFn<Payload> = (unwrapFns: UnwrapFns<Payload>) => Promise<void>

function unwrap<Payload>(asyncFn: () => Promise<Payload>) {
  return async ({ Some, None }: UnwrapFns<Payload>) => {
    try {
      const result = await asyncFn()

      Some(result)
    } catch (err: unknown) {
      None(path(['message'], err))
    }
  }
}
function performAsync<Payload>(asyncFn: () => Promise<Payload>): UnwrapFn<Payload>

function performAsync<Payload>(asyncFn: () => Promise<Payload>, unwrapFns: UnwrapFns<Payload>): void

/**
 * Perform asynchronous function and provide a safe wrapped result processing (similar to other languages).
 * Provides protection from untyped, "undefined" or "null" values entering the application.
 *
 * @param {Function} asyncFn asynchronous function to run
 * @param {Object} unwrapFns
 * @param {Function} Some callback function for positive (right) result.
 * @param {Function} None callback function for error (left) result; payload is optional
 * @example
 * ```typescript
 * const asyncFn = () => axios.get('http://www.google.com')
 *
 * performAsync<AxiosResponse<string>>(asyncFn, {
 *   Some: (payload) => console.log(payload.data),
 *   None: (_) => console.log('Some error happened: ', _),
 * })
 *
 * const a = performAsync<AxiosResponse<string>>(asyncFn)
 *
 * a({
 *   Some: (payload) => console.log(payload.data),,
 *   None: () => console.log('Some error happened: ',,
 * })
 *

 */
function performAsync<Payload>(
  asyncFn: () => Promise<Payload>,
  unwrapFns?: UnwrapFns<Payload>,
): void | UnwrapFn<Payload> {
  if (!unwrapFns) return unwrap<Payload>(asyncFn)

  unwrap<Payload>(asyncFn)(unwrapFns)
}