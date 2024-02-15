export default interface BaseResponse<T> {
  content: T,
  empty: boolean,
}