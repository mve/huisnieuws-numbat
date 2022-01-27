import { Popup } from 'react-map-gl';
import Link from 'next/link';
import React from 'react';
import { getDetailPage } from '../../support/utils';

type Props = {
  showPopup: boolean,
  viewport: any,
  setShowPopup: Function,
};

const ArticlePopup: React.FC<Props> = ({ showPopup, viewport, setShowPopup }) => (
  showPopup && (
    <Popup
      {...viewport}
      closeButton
      onClose={() => setShowPopup(false)}
      anchor="bottom"
      offsetTop={-25}
    >
      <Link href={getDetailPage(viewport.article)} passHref>
        <a className="underline text-xs">
          {`${viewport.article.title.slice(0, 50)}`}
          {viewport.article.title.length >= 50 && '...'}
        </a>
      </Link>
    </Popup>
  )
);

export default ArticlePopup;
