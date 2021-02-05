const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
const urlApi = `https://www.omdbapi.com/?apikey=${API_KEY}`;

/**
 * Fetches information about a specific tv show
 *
 * @param {string} title
 * @returns {Promise<any | void>}
 */
export function fetchSeriesInfo(title) {
  if (!title || typeof title !== 'string') return;

  // eslint-disable-next-line consistent-return
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
      .catch(error => ({ error: error.message }))
  );
}

/**
 * Fetches information about a specific tv show season
 *
 * @param {string} title
 * @param {number} seasonNr
 * @returns {Promise<any | void>}
 */
function fetchSeasonInfo(title, seasonNr) {
  if (!title || typeof title !== 'string' || !seasonNr || typeof seasonNr !== 'number') return;

  // eslint-disable-next-line consistent-return
  return (
    fetch(`${urlApi}&t=${title}&season=${seasonNr}`)
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
 * @param {string} title
 * @param {number} seasonNr
 * @returns {Promise<unknown>}
 */
export function fetchAllEpisodes(title, seasonNr) {
  if (!title || typeof title !== 'string' || !seasonNr || typeof seasonNr !== 'number') return;

  // eslint-disable-next-line consistent-return
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
      .catch(error => ({ error: error.message }))
  );
}
