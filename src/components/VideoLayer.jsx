export default function VideoLayer({ containerRef }) {
  return (
      <div
        ref={containerRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    lg:h-screen lg:w-screen"
      />
  );
}
