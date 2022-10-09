import Layout from "components/Layout";
import Image from "next/image";
import Carousel from "@components/Carousel";
import StreamCard from "@components/StreamCard";

export default function Home() {
  const images = [
    {
      id: 0,
      url: "/images/jumanji-image.jpeg",
      name: "fortnite",
    },
    {
      id: 1,
      url: "/images/jumanji-image.jpeg",
      name: "jumanji",
    },
    {
      id: 2,
      url: "/images/jumanji-image.jpeg",
      name: "jumanji",
    },
  ];

  const allStreams = images.map((slide, idx) => {
    const streamId = idx + 1;
    return (
      <div key={idx}>
        <StreamCard streamId={streamId} />
      </div>
    );
  });

  return (
    <Layout title="Dwitch">
      <h2 className="pt-16 pl-24 text-lg font-bold text-white">
        Featured Streams
      </h2>
      <div className="flex justify-center pt-24 pb-6">
        <Carousel slides={images} />
      </div>

      <h2 className="pt-16 pl-24 text-lg font-bold text-white">All Streams</h2>
      <div className="flex justify-around pt-6 pb-32">{allStreams}</div>
    </Layout>
  );
}
