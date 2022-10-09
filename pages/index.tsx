import Layout from "components/Layout";
import Image from "next/image";
import Carousel from "@components/Carousel";
import StreamCard from "@components/StreamCard";

export default function Home() {
  let slideItems = [
    {
      url: "https://picsum.photos/800/300/?random",
      idx: 1,
    },
    {
      url: "https://picsum.photos/800/301/?random",
      idx: 2,
    },
    {
      url: "https://picsum.photos/800/302/?random",
      idx: 3,
    },
  ];

  const slides = slideItems.map((slide, idx) => {
    return (
      <Image
        src={slide.url}
        key={idx}
        width={120}
        height={120}
        alt="carousel image"
      />
    );
  });

  return (
    <Layout title="Dwitch">
      <h2 className="pt-16 pl-24 text-lg font-bold text-white">
        Featured Streams
      </h2>
      <div className="flex justify-center pt-24 pb-6">
        <Carousel />
      </div>

      <h2 className="pt-16 pl-24 text-lg font-bold text-white">All Streams</h2>
      <div className="flex justify-around pt-6 pb-32">
        <div>
          <StreamCard />
        </div>
        <div>
          <StreamCard />
        </div>
        <div>
          <StreamCard />
        </div>
      </div>

      {/* <div>More content</div>
      <div>More content</div>
      <div>More content</div>
      <div>More content</div>
      <div>More content</div>
      <div>More content</div>
      <div>More content</div>
      <div>More content</div>
      <div>More content</div>
      <div>More content</div>
      <div>More content</div>
      <div>More content</div> */}
    </Layout>
  );
}
