import React from 'react';
import 'styled-components/macro';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';

import { fetchSeriesInfo, fetchAllEpisodes } from '../../utils/fetch';
import { getSeriesReducer, getEpisodesReducer } from '../../utils/reducer';
import { useWindowSize } from '../../utils/customHooks';
import EpisodeSidebar from '../../components/EpisodeSidebar';
import styles from './styles';

const initialValueEpisodes = {
  episodes: null,
  episodesNumber: 0,
  loading: true,
  error: null,
};

const initialValueSeries = {
  seriesInfo: null,
  loading: true,
  error: null,
};

const Home = () => {
  const seriesTitle = 'mr+robot';
  const seasonNumber = 4;
  const [windowWidth] = useWindowSize();

  const isMediumScreen = windowWidth > 768 && windowWidth < 1024;
  const isLargeScreen = windowWidth > 1024;
  let nrSlidesPerPage;

  if (isLargeScreen) {
    nrSlidesPerPage = 4;
  } else if (isMediumScreen) {
    nrSlidesPerPage = 3;
  } else {
    nrSlidesPerPage = 2;
  }

  const [currentEpisodeNumber, setCurrentEpisodeNumber] = React.useState(1);
  const [episodesState, dispatch] = React.useReducer(getEpisodesReducer, initialValueEpisodes);
  const [seriesState, dispatchSeries] = React.useReducer(getSeriesReducer, initialValueSeries);
  const { episodes: episodesInfo, episodesNumber, loading: loadingEpisodes, error: errorEpisodes } = episodesState;
  const { seriesInfo, loading: loadingSeries, error: errorSeries } = seriesState;

  /**
   * Updates the seriesInfo state
   *
   * @param title - title of the series
   * @returns {Promise<void>}
   */
  async function getSeriesInfo(title) {
    const seriesData = await fetchSeriesInfo(title);

    if (seriesData && seriesData.Response !== 'False') {
      dispatchSeries({ type: 'GET_SERIES_SUCCESS', payload: seriesData });
    } else {
      dispatchSeries({ type: 'GET_SERIES_ERROR', payload: seriesData.Error });
    }
  }

  /**
   * Updates the episodesInfo and episodesNumber state
   *
   * @param title - title of the series
   * @param seasonNr - the nr of the series season
   * @returns {Promise<void>}
   */
  async function getEpisodesInfo(title, seasonNr) {
    const episodesData = await fetchAllEpisodes(title, seasonNr);

    if (episodesData && episodesData.length) {
      dispatch({ type: 'GET_EPISODES_SUCCESS', payload: episodesData });
    } else {
      dispatch({ type: 'GET_EPISODES_ERROR', payload: episodesData.error });
    }
  }

  React.useEffect(
    () => {
      getSeriesInfo(seriesTitle);
      getEpisodesInfo(seriesTitle, seasonNumber);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  /**
   * On click handler
   * Updates the currentEpisodeNumber state
   *
   * @param {number} index - index of selected episode
   */
  function selectEpisodeHandler(index) {
    setCurrentEpisodeNumber(index + 1);
  }

  return (
    <div css={styles}>
      <div className="main-view">
        <div className="series-details">
          <h2>{`Season ${seasonNumber}`}</h2>
          {
            // eslint-disable-next-line no-nested-ternary
            !loadingSeries && !errorSeries
              ? seriesInfo && (
                  <>
                    <h1>{seriesInfo.Title}</h1>
                    <h2>{seriesInfo.Plot}</h2>
                  </>
                )
              : loadingSeries
              ? 'Loading...'
              : errorSeries
          }
        </div>
        <div className="carousel-wrapper">
          {/** TODO abstract Slide content in a separate component  */}
          {
            // eslint-disable-next-line no-nested-ternary
            !loadingEpisodes && !errorEpisodes
              ? episodesInfo && (
                  <CarouselProvider visibleSlides={nrSlidesPerPage} totalSlides={episodesNumber} step={1}>
                    <div className="carousel__container">
                      <Slider className="carousel__slider">
                        {episodesInfo.map((episode, index) => (
                          <Slide
                            index={index}
                            key={`slide-${index + 1}`}
                            onClick={() => selectEpisodeHandler(index)}
                            onKeyDown={() => selectEpisodeHandler(index)}
                          >
                            <img
                              className={`carousel__episode__image ${
                                index + 1 === currentEpisodeNumber ? 'carousel__episode__image--active' : ''
                              }`}
                              src={`https://picsum.photos/200/134?random=${index}`}
                              alt={episode.Title}
                            />
                            <span className="carousel__episode__number">{episode.Episode}</span>
                            <div className="carousel__episode__title">{episode.Title}</div>
                            <div className="carousel__episode__plot">{episode.Plot}</div>
                          </Slide>
                        ))}
                      </Slider>
                      <div className="carousel__buttons">
                        <ButtonBack className="carousel__button carousel__button--back" />
                        <ButtonNext className="carousel__button carousel__button--next" />
                      </div>
                    </div>
                  </CarouselProvider>
                )
              : loadingEpisodes
              ? 'Loading...'
              : errorEpisodes
          }
        </div>
      </div>
      {/** TODO add loading component */}
      {
        // eslint-disable-next-line no-nested-ternary
        !loadingEpisodes && !errorEpisodes
          ? episodesInfo && <EpisodeSidebar info={episodesInfo[currentEpisodeNumber - 1]} />
          : loadingEpisodes
          ? 'Loading...'
          : errorEpisodes
      }
    </div>
  );
};

export default Home;
