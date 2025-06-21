import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { apiKey } from "../../../Map.api";

const GoogleMap = () => {
  return (
    <>
      <h1 className="text-6xl text-lime-500 p-2  text-center mt-20">
        In out tech hub in the world bigest.
      </h1>
      <div className="w-full flex flex-col lg:flex-row gap-5 items-center my-20 p-2 md:p-3 lg:p-5 bg-gray-300 rounded-md">
        <div className="md:w-1/2 flex flex-col gap-5 md:gap-10 lg:gap-20">
          <h1 className="text-3xl font-bold">
            A modern, clear, and relevant heading for any tech blog, startup, or
            portfolio.
          </h1>
          <p className="text-lg font-normal text-gray-500">
            Explore our tech workspace on the map. Whether you're a
            collaborator, client, or curious visitor — we're just a few clicks
            away from connection.
          </p>
        </div>
        <div className="md:w-1/2">
          <APIProvider apiKey={apiKey}>
            <Map
             className="w-[75vw] h-[50vh] md:w-[70vw] md:h-[60vh] lg:w-[40vw] lg:h-[50vh]"
              defaultCenter={{ lat: 54.526, lng: 15.2551 }}
              defaultZoom={5}
              gestureHandling={"greedy"}
              disableDefaultUI={true}
            />
          </APIProvider>
        </div>
      </div>
    </>
  );
};

export default GoogleMap;
