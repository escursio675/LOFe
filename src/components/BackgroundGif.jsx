export default function BackgroundGif({ visible }) {
  return (
    <img
      src="/tenor3.gif" alt="background-gif"
      className={`fixed inset-0 h-screen w-screen ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
