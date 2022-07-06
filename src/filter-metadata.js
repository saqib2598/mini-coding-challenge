/*
type Metadata = {
  url: string | null;
  siteName: string | null;
  title: string | null;
  description: string | null;
  keywords: string[] | null;
  author: string | null;
};
*/

/**
 * Filters the given Metadata array to only include the objects that match the given search query.
 * If the search query has multiple words,
 * treat each word as a separate search term to filter by,
 * in addition to gathering results from the overall query.
 * If the search query has special characters,
 * run the query filter with the special characters removed.
 * Can return an empty array if no Metadata objects match the search query.
 * @param {Metadata[]} metadata - An array of Metadata objects
 * @param {string} query - The search query string
 * @returns {Metadata[]} - An array of Metadata objects that match the given search query
 */
function filterMetadata(metadata, query) {
  // TODO: delete and replace this with your code
  returnedHashedArray = [];
  const queryArray = query.split(',');
  queryArray.map(query => {
    query.split(' ').map(q => {
      metadata.map(data => {
        for (const key in data) {
          let val = data[key];
          if (val !== null && val !== '' && typeof(val) === 'object'){
            val.map(v => {
              if (v.toLowerCase().includes(q.toLowerCase())){
                returnedHashedArray.push(data)
              }
            })
          }
          else {
            if (val !== null && val !== '' && val.toLowerCase().includes(q.toLowerCase())){
              returnedHashedArray.push(data);
            }
          }
        }
      })
    })
  })
  const newArray = [...new Set(returnedHashedArray)]
  return newArray;
}
