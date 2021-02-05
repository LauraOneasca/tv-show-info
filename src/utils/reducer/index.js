/**
 * @param state
 * @param action
 * @returns {(*&{episodesNumber, loading: boolean, episodes})|(*&{loading: boolean, error})}
 */
const getEpisodesReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'GET_EPISODES_SUCCESS':
      return {
        ...state,
        loading: false,
        episodes: payload,
        episodesNumber: payload.length,
      };
    case 'GET_EPISODES_ERROR':
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default: {
      throw new Error(`Unsupported action type: ${type}`);
    }
  }
};

/**
 * @param state
 * @param action
 * @returns {(*&{loading: boolean, error})|(*&{seriesInfo, loading: boolean})}
 */
const getSeriesReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'GET_SERIES_SUCCESS':
      return {
        ...state,
        loading: false,
        seriesInfo: payload,
      };
    case 'GET_SERIES_ERROR':
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default: {
      throw new Error(`Unsupported action type: ${type}`);
    }
  }
};

export { getEpisodesReducer, getSeriesReducer };
