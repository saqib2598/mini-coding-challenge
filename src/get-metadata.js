// Note: Please do not use JSDOM or any other external library/package (sorry)
/*
type Metadata = {
  url: string;
  siteName: string;
  title: string;
  description: string;
  keywords: string[];
  author: string;
};
*/

/**
 * Gets the URL, site name, title, description, keywords, and author info out of the <head> meta tags from a given html string.
 * 1. Get the URL from the <meta property="og:url"> tag.
 * 2. Get the site name from the <meta property="og:site_name"> tag.
 * 3. Get the title from the the <title> tag.
 * 4. Get the description from the <meta property="og:description"> tag or the <meta name="description"> tag.
 * 5. Get the keywords from the <meta name="keywords"> tag and split them into an array.
 * 6. Get the author from the <meta name="author"> tag.
 * If any of the above tags are missing or if the values are empty, then the corresponding value will be null.
 * @param html The complete HTML document text to parse
 * @returns A Metadata object with data from the HTML <head>
 */
 export default function getMetadata(html) {
  // TODO: delete and replace this with your code
  const lineBylineArray = html.split('\n');
  const metaTagArray = []
  lineBylineArray.map(line => {
    if (line.toLowerCase().trim().slice(0, 5) === '<meta') {
      const metaline = line.trim().slice(6, -1)
      const metaTags = metaline.split('=')
      metaTagArray.push(metaTags);
    }
  })

  let metaTagHash = {}
  const metaTagHashArray = []
  metaTagArray.map(tagline => {
    if (tagline[0].trim() === 'property' || tagline[0].trim() === 'name'){
      metaTagHash['property'] = tagline[1].replace(/[".,\/#!$%\^&\*;{}=\`~()]/g,"").replace('content', '').trim();
      metaTagHash['content'] = tagline[2].trim().replace(/[".,\/#!$%\^&\*;{}=\`~()]/g,"");
      metaTagHashArray.push(metaTagHash);
      metaTagHash = {}
    }
  })
  return {
    url: getDesiredValue(metaTagHashArray, 'og:url'),
    siteName: getDesiredValue(metaTagHashArray, 'og:site_name'),
    title: getDesiredValue(metaTagHashArray, 'og:title'),
    description: getDesiredValue(metaTagHashArray, 'og:description'),
    keywords: getDesiredValue(metaTagHashArray, 'keywords'),
    author: getDesiredValue(metaTagHashArray, 'author'),
  };
}

function getDesiredValue(hashedArray, key){
  let returnedValue = null;
  hashedArray.forEach(elem => {
    if (elem['property'] === key) {
      returnedValue = elem['content'];
    }
  })

  return returnedValue;
}
