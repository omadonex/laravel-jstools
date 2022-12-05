export default function JST_AbstractNotBindToConcreteException(message: string = ''): Error {
  return new Error(message);
}
