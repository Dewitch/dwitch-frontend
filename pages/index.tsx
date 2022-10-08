import Layout from "components/Layout";
import Image from "next/image";
import Carousel from "@components/Carousel";

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
    <Layout title="Home | NowFT">
      <div>
        <h2>Hello!</h2>
      </div>
      <Carousel />
    </Layout>
  );
}
