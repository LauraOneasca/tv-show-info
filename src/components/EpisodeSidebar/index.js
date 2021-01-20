import React from 'react';
import PropTypes from 'prop-types';
import 'styled-components/macro';

import styles from './styles';

/** TODO add real images */
const EpisodeSidebar = ({ info }) => (
  <div css={styles} imageUrl={`https://picsum.photos/620/400?random=${parseInt(info.Episode, 10)}`}>
    <div className="sidebar__image" />
    <div className="sidebar__content">
      <div className="sidebar__meta">
        <div className="sidebar__info">{`Episode ${info.Episode} — ${info.Released}`}</div>
        <div className="sidebar__rating sidebar__info">
          <svg
            className="sidebar__rating__star"
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 0.692261L18.3237 9.45346L27.9924 10.8587L20.9962 17.678L22.6473 27.3077L14 22.7612L5.35276 27.3077L7.00386 17.678L0.00769043 10.8587L9.67639 9.45346L14 0.692261Z"
              fill="#EFD358"
            />
          </svg>
          {`${info.imdbRating}/10`}
        </div>
      </div>
      <div className="sidebar__main-info">
        <div className="sidebar__title">{info.Title}</div>
        <div className="sidebar__info">{info.Plot}</div>
      </div>
    </div>
  </div>
);

EpisodeSidebar.propTypes = {
  info: PropTypes.shape({
    Episode: PropTypes.string,
    Released: PropTypes.string,
    imdbRating: PropTypes.string,
    Title: PropTypes.string,
    Plot: PropTypes.string,
  }).isRequired,
};

export default EpisodeSidebar;
