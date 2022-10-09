import Layout from "components/Layout";
import Image from "next/image";
import Carousel from "@components/Carousel";
import StreamCard from "@components/StreamCard";
// import { useQuery } from "@apollo/react-hooks";
// import TEST_QUERY from '../graphql/test.query';
import { gql, useQuery } from "@apollo/client";
import idx from "idx";

const GET_STREAM_DATA = gql`
  query {
    streams(first: 100, where: { isActive: true }) {
      id
      isActive
      streamerAddress
      flowRateCost
    }
    streamers(first: 100) {
      streamerAddress
      socialTokenAddress
      streamerName
    }
  }
`;

export default function Home() {
  // TODO: create a query and update it here
  // Create a query hook
  // const { data, loading, error } = useQuery(TEST_QUERY);
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

  const {
    loading: isLoadingStreamData,
    // error: errorStreamData,
    data: streamData,
  } = useQuery(GET_STREAM_DATA);

  const streamersListing = idx(streamData, (_) => _.streamers) || [];
  const streamsListing = idx(streamData, (_) => _.streams) || [];

  const streamerAddressMapping: any = {};

  console.log("-=-=-=- isLoadingStreamData");
  console.log(isLoadingStreamData);
  console.log("-=-=-=- streamData");
  console.log(streamData);
  console.log("-=-=-=- streamerAddressMapping");
  console.log(streamerAddressMapping);

  streamersListing.forEach((currentStreamer: any) => {
    streamerAddressMapping[currentStreamer.streamerAddress] = currentStreamer;
  });

  const allStreams = streamsListing.map((currentStream: any, index: number) => {
    const streamId = index + 1;
    const currentStreamer =
      streamerAddressMapping[currentStream.streamerAddress];

    return (
      <div key={index}>
        <StreamCard
          streamId={streamId}
          streamerName={currentStreamer.streamerName}
          streamerAddress={currentStreamer.streamerAddress}
          streamPrice={currentStream.flowRateCost}
          socialTokenAddress={currentStreamer.socialTokenAddress}
        />
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
