/* global instantsearch algoliasearch */

const search = instantsearch({
  indexName: 'demo',
  searchClient: algoliasearch('XR4KUGIQHQ', '74f3a4b1c35909e84e9c2764487123bb')
  
});


//const records = fetchDataFromDatabase();
const client = algoliasearch('XR4KUGIQHQ', '74f3a4b1c35909e84e9c2764487123bb');
const index = client.initIndex('demo');
index.setSettings({
  hitsPerPage: 2,
  searchableAttributes: [
    'name'
 ],
 
 attributesForFaceting: [
   'name',
   'url'
 ]
});

index.search({
  query: 'name=Facebook'
  },
  function searchDone(err, content) {
    if (err) throw err;

    console.log(content.hits);
  }
);

search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  })
);

search.addWidget(
  instantsearch.widgets.clearRefinements({
    container: '#clear-refinements',
  })
);

search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: `
        <div>
          <div class="hit-name">
            {{#helpers.highlight}}{ "attribute": "name" }{{/helpers.highlight}}
          </div>
               <div class="hit-price" ><object type="text/html" data={{url}} ></object></div>
        </div>
      `,
    },
  })
);




search.addWidget(
  instantsearch.widgets.pagination({
    container: '#pagination',
  })
);

search.start();
