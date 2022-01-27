import React, { useEffect, useState } from 'react';
import ReactMapGL, {
  FlyToInterpolator, Layer, LayerProps, Marker, Source,
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Image from 'next/image';
import axios from 'axios';
import { Reach } from '../../enums/reach';
import ArticlePopup from './ArticlePopup';

type Props = {
  reach: string,
  zipcode: string,
  city: string,
  province: string,
  zoom: number,
  latitude: number,
  longitude: number,
  articleData: any
};

const Map: React.FC<Props> = ({
  reach, zipcode, city, province, zoom, latitude, longitude, articleData,
}) => {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '50vh',
    latitude,
    longitude,
    zoom,
  });
  const [cityData, setCityData] = useState<any>();
  const [neighborhoodData, setNeighborhoodData] = useState<any>();
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [popupViewport, setPopupViewport] = useState<any>();

  useEffect(() => {
    const updateMap = () => {
      setViewport({
        width: '100%',
        height: '50vh',
        latitude,
        longitude,
        zoom,
      });
    };

    updateMap();
  }, [latitude, longitude, zoom]);

  useEffect(() => {
    const fetchCityData = async () => {
      const { data } = await axios.get('/api/city', { params: { province, city } });
      setCityData(data);
    };

    const fetchNeighborhoodData = async () => {
      const { data } = await axios.get('/api/neighborhood', { params: { zipcode } });
      setNeighborhoodData(data);
      if (data.features.length !== 0) {
        setViewport({
          ...viewport,
          width: '100%',
          height: '50vh',
          latitude: data.features[0].properties.lat,
          longitude: data.features[0].properties.lng,
          zoom,
        });
      }
    };

    if (city && province && reach === Reach.CITY) fetchCityData();
    if (zipcode && reach === Reach.NEIGHBOURHOOD) fetchNeighborhoodData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city, province, reach, zipcode]);

  const showModal = (lat: number, lon: number, article: any) => {
    setPopupViewport(
      {
        latitude: lat,
        longitude: lon,
        article,
      },
    );
    setShowPopup(true);
  };

  const getArticleMarkers = () => {
    const pinSize = reach === Reach.CITY ? 20 : 30;
    return (
      articleData.map((article) => (
        <Marker
          key={article.article._id}
          latitude={Number(article.lat)}
          longitude={Number(article.lon)}
          onClick={() => showModal(Number(article.lat), Number(article.lon), article.article)}
        >
          <div
            style={{ transform: `translate(${-pinSize / 2}px,${-pinSize}px)` }}
          >
            <Image
              alt="marker"
              src="/icons/article-marker.svg"
              width={pinSize}
              height={pinSize}
            />
          </div>
        </Marker>
      ))
    );
  };

  const getPin = () => {
    const pinSize = 70;
    return (
      <Marker
        latitude={latitude}
        longitude={longitude}
      >
        <div
          style={{ transform: `translate(${-pinSize / 2}px,${-pinSize}px)` }}
        >
          <Image
            alt="marker"
            src="/icons/location-marker.svg"
            width={pinSize}
            height={pinSize}
          />
        </div>
      </Marker>
    );
  };

  const getMarker = () => {
    const layerStyle: LayerProps = {
      id: 'polygon',
      type: 'fill',
      paint: {
        'fill-color': '#228b22',
        'fill-opacity': 0.4,
        'fill-outline-color': '#008A63',
      },
    };

    switch (reach) {
      case Reach.CITY:
        return (
          <>
            <Source id="polygon" type="geojson" data={cityData}>
              <Layer {...layerStyle} />
            </Source>
            {getArticleMarkers()}
          </>
        );
      case Reach.NEIGHBOURHOOD:
        return (
          <>
            <Source id="polygon" type="geojson" data={neighborhoodData}>
              <Layer {...layerStyle} />
            </Source>
            {getArticleMarkers()}
          </>
        );
      case Reach.STREET:
        return (
          <>
            {getArticleMarkers()}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="sticky top-40 rounded-md overflow-hidden">
      <ReactMapGL
        {...viewport}
        transitionDuration={1000}
        transitionInterpolator={new FlyToInterpolator()}
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_ACCESS_TOKEN}
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
      >
        {getMarker()}
        {getPin()}
        <ArticlePopup
          showPopup={showPopup}
          viewport={popupViewport}
          setShowPopup={setShowPopup}
        />
      </ReactMapGL>
    </div>
  );
};

export default Map;
