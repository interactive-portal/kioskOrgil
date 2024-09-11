export default function toBoolean(x) {
  try {
    return !!JSON.parse(`${x}`.toLowerCase());
  } catch (e) {
    return !!x;
  }
}
