const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
const urlApi = `https://www.omdbapi.com/?apikey=${API_KEY}`;

/**
 * Fetches information about a specific tv show
 *
 * @param title
 * @returns {Promise<any | void>}
 */
export function fetchSeriesInfo(title) {
  return (
    fetch(`${urlApi}&t=${title}`)
      .then(response => {
        if (!response.ok) throw new Error('Server response was not OK');
        return response.json();
      })
      .then(data => {
        if (!data) throw new Error('Empty response');
        return data;
      })
      // eslint-disable-next-line no-console
      .catch(error => console.log(error))
  );
}

/**
 * Fetches information about a specific tv show season
 *
 * @param title
 * @param seasonNumber
 * @returns {Promise<any | void>}
 */
function fetchSeasonInfo(title, seasonNumber) {
  return (
    fetch(`${urlApi}&t=${title}&season=${seasonNumber}`)
      .then(response => {
        if (!response.ok) throw new Error('Server response was not OK');
        return response.json();
      })
      .then(data => {
        if (!data) throw new Error('Empty response');
        return data;
      })
      // eslint-disable-next-line no-console
      .catch(error => console.log(error))
  );
}

/**
 * Fetches information about all episodes of a certain tv show season
 *
 * @param title
 * @param seasonNr
 * @returns {Promise<unknown>}
 */
export function fetchAllEpisodesCool(title, seasonNr) {
  return (
    fetchSeasonInfo(title, seasonNr)
      .then(seasonData => {
        const nrEpisodes = seasonData.Episodes.length;
        if (nrEpisodes === 0) throw new Error('Empty episodes');

        const urls = [];
        for (let i = 1; i <= nrEpisodes; i += 1) {
          urls.push(`${urlApi}&t=${title}&season=${seasonNr}&episode=${i}`);
        }

        return (
          Promise.all(
            urls.map(url =>
              fetch(url).then(response => {
                if (!response.ok) throw new Error('Server response was not OK');
                return response.json();
              }),
            ),
          )
            .then(data => {
              if (!data) throw new Error('Empty response');
              return data;
            })
            // eslint-disable-next-line no-console
            .catch(error => console.log(error))
        );
      })
      // eslint-disable-next-line no-console
      .catch(error => console.log(error))
  );
}
