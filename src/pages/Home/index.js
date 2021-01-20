import React from 'react';
import 'styled-components/macro';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';

import { fetchSeriesInfo, fetchAllEpisodesCool } from '../../utils/index';
import EpisodeSidebar from '../../components/EpisodeSidebar';
import styles from './styles';

const Home = () => {
  const seriesTitle = 'mr+robot';
  const seasonNumber = 4;

  const isMediumScreen = global.window.matchMedia('(min-width: 768px)').matches;
  const isLargeScreen = global.window.matchMedia('(min-width: 1024px)').matches;
  let nrSlidesPerPage;

  /** TODO implement solution to update nr of slides when the users resizes window */
  if (isLargeScreen) {
    nrSlidesPerPage = 4;
  } else if (isMediumScreen) {
    nrSlidesPerPage = 3;
  } else {
    nrSlidesPerPage = 2;
  }

  const [seriesInfo, setSeriesInfo] = React.useState(null);
  const [episodesInfo, setEpisodesInfo] = React.useState(null);
  const [currentEpisodeNumber, setCurrentEpisodeNumber] = React.useState(1);
  const [episodesNumber, setEpisodesNumber] = React.useState(0);

  /**
   * Updates the seriesInfo state
   *
   * @param title - title of the series
   * @returns {Promise<void>}
   */
  async function getSeriesInfo(title) {
    const seriesData = await fetchSeriesInfo(title);
    if (seriesData) setSeriesInfo(seriesData);
  }

  /**
   * Updates the episodesInfo and episodesNumber state
   *
   * @param title - title of the series
   * @param seasonNr - the nr of the series season
   * @returns {Promise<void>}
   */
  async function getEpisodesInfo(title, seasonNr) {
    const episodesData = await fetchAllEpisodesCool(title, seasonNr);
    if (episodesData) {
      setEpisodesInfo(episodesData);
      setEpisodesNumber(episodesData.length);
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
          <h1>{seriesInfo && seriesInfo.Title}</h1>
          <h2>{seriesInfo && seriesInfo.Plot}</h2>
        </div>
        <div className="carousel-wrapper">
          {/** TODO abstract Slide content in a separate component  */}
          {episodesInfo && (
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
          )}
        </div>
      </div>
      {episodesInfo && <EpisodeSidebar info={episodesInfo[currentEpisodeNumber - 1]} />}
    </div>
  );
};

export default Home;
