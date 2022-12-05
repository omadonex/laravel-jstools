export default function JST_NotImplementedException(message: string = ''): Error {
  return new Error(message);
}
