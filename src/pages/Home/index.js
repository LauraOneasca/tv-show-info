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

  const [seriesInfo, setSeriesInfo] = React.useState({});
  const [episodesInfo, setEpisodesInfo] = React.useState(null);
  const [currentEpisodeNumber, setcurrentEpisodeNumber] = React.useState(1);
  const [episodesNumber, setEpisodesNumber] = React.useState(0);

  let seriesData;
  let episodesData;

  async function getSeriesInfo(title) {
    seriesData = await fetchSeriesInfo(title);
    setSeriesInfo(seriesData);
  }

  async function getEpisodesInfo(title, seasonNr) {
    episodesData = await fetchAllEpisodesCool(title, seasonNr);
    setEpisodesInfo(episodesData);
    setEpisodesNumber(episodesData.length);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(
    () => {
      getSeriesInfo(seriesTitle);
      getEpisodesInfo(seriesTitle, seasonNumber);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  function selectEpisodeHandler(nr) {
    setcurrentEpisodeNumber(nr + 1);
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

Home.propTypes = {};

export default Home;
