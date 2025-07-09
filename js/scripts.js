////////////////////////////////////////
// reload page after Forward and back
///////////////////////////////////////

const TYPE_BACK_FORWARD = 2;

function isReloadedPage() {
  return performance.navigation.type === TYPE_BACK_FORWARD;
}

function main() {
  if (isReloadedPage()) {
    window.location.reload();
  }
}
main();

////////////////////////////////////////////////////////////
///// TEAM  API REQUEST ` `
////////////////////////////////////////////////////////////


Vue.use(VueMeta);

new Vue({
    
  el: '#home-page',
    
  data () {

    return {
      indexData: [],
      // apiURL: 'https://directus.thegovlab.com/odpl-course',
    }
  },

  created: function created() {
    this.fetchIndex();
  },
  methods: {
    fetchIndex(){
      self = this;
      // Instead of API, load local JSON
      fetch('data/tools.json')
        .then(response => response.json())
        .then(data => {
          // Patch image URLs to local
          self.indexData = data.data.map(tool => {
            if (tool.thumbnail && tool.thumbnail.private_hash) {
              tool.thumbnail.local_url = `img/${tool.thumbnail.private_hash}.jpg`;
            }
            return tool;
          });
        })
        .catch(error => console.error(error));
    },


}
});

