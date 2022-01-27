import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { getZipcodeData, getZipcodeDataForEachArticle } from '../../support/mapHelpers';
import { Reach } from '../../enums/reach';
import { Article } from '../../types/article';
import { zipcodeIsValid } from '../../support/zipcode';

const Map = dynamic(() => import('../Map/Map'));

type Props = {
  reach: Reach,
  zipcode: string,
  articles: Article[],
}

const getZoom = (level: string) => {
  let zoom: number;
  switch (level) {
    case Reach.CITY:
      zoom = 10;
      break;
    case Reach.NEIGHBOURHOOD:
      zoom = 13;
      break;
    case Reach.STREET:
      zoom = 16;
      break;
    default:
      zoom = 6;
  }
  return zoom;
};

const Sidebar: React.FC<Props> = ({ reach, zipcode, articles }) => {
  const [data, setData] = useState<any>({ lat: 52.100283, lon: 5.646353 });
  const [articleData, setArticleData] = useState<any[]>([]);
  const [cityInfo, setCityInfo] = useState<Array<string>>([]);
  const [error, setError] = useState<boolean>(false);

  const errorHandler = () => {
    setError(true);
  };

  useEffect(() => {
    setError(false);
    if (zipcodeIsValid(zipcode)) {
      getZipcodeData(zipcode)
        .then((res) => {
          setData(res.data);
          // eslint-disable-next-line no-unused-expressions
          data.display_name && setCityInfo(data.display_name.split(', '));
        })
        .catch(() => errorHandler());
    }
    if (articles.length !== 0) {
      getZipcodeDataForEachArticle(articles)
        .then((res) => {
          setArticleData(res?.map(((zipcodeData: any, article: any) => ({
            lat: zipcodeData.lat,
            lon: zipcodeData.lon,
            article: articles[article],
          }))));
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.display_name, zipcode, reach, articles]);

  if (cityInfo.length === 6) {
    cityInfo.splice(1, 1);
  }

  return (
    <aside className="lg:pl-5 w-full lg:w-1/3 mb-6 lg:mb-0">
      {error ? (
        <>
          <p className="sticky top-32 pb-2">De opgegeven postcode bestaat niet.</p>
          <Map
            reach={Reach.COUNTRY}
            zipcode=""
            city=""
            province=""
            zoom={getZoom('')}
            latitude={Number(data.lat)}
            longitude={Number(data.lon)}
            articleData={[]}
          />
        </>
      ) : (
        <Map
          reach={reach}
          zipcode={String(zipcode)}
          city={cityInfo[0]}
          province={cityInfo[1]}
          zoom={getZoom(reach)}
          latitude={Number(data.lat)}
          longitude={Number(data.lon)}
          articleData={articleData}
        />
      )}
    </aside>
  );
};

export default Sidebar;
