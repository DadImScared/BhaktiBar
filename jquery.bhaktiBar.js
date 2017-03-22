/**
 * Created by murli on 3/21/2017.
 */

(function($) {
    var baseUrl = 'http://www.krsna.us/api/v1/search';
    var category = 'bhagavatpatrika';
  $.fn.bhaktiBar = function() {
    setSize(this);
    this.html(createHtml());
    handleClick();
    submitSearch();
    styling();
    return this;
  };
  function createHtml() {
    var html = '<div id="bhakti-wrapper">';
    html += '<div id="bhakti-nav">';
    html += '<button id="bhakti-dropbtn">Bhagavatpatrika ▾</button>';
    html += '<div id="bhakti-categories">';
    html = addCategories(html);
    html += '</div>';
    html += '<input id="bhakti-input" placeholder="Search Here" />';
    html += '<button id="bhakti-submit-btn">Go</button>';
    html += '</div>';
    html += '<div id="bhakti-search-results"></div>';
    html += '</div>';
    return html
  }
  function handleClick() {
    $('#bhakti-categories a').click(function() {
      $('#bhakti-dropbtn').text(this.text + ' ▾');
      category = this.text[0].toLowerCase() + this.text.substr(1);
      $('#bhakti-categories').css({'display': 'none'})
    })
  }
  function styling() {

    var $bc = $('#bhakti-categories');
    $bc.css({
      'display': 'none',
      'position': 'absolute',
      'z-index': '1',
      // 'min-width': '160px',
      'width': '45%',
      'background-color': '#f9f9f9',
      'box-shadow': '0px 8px 15px 0px rgba(0,0,0,0.2)'
    });
    $('#bhakti-dropbtn').css({'min-width': '160px'});
    $('#bhakti-dropbtn, #bhakti-categories').hover(function() {$bc.css({'display': 'block'})}, function() {$bc.css({'display': 'none'})});
    $('#bhakti-categories a').css({'display': 'block', 'padding': '12px 16px', 'text-decoration': 'none'});
    $('#bhakti-search-results').css({'overflow-y': 'auto', 'max-height': '300px'});
    $('#resultList a').css({'text-decoration': 'none', 'display': 'block'});
    responsiveDesign();
  }
  function responsiveDesign() {
    if ($(window).width() < 600) {
      $('#bhakti-dropbtn, #bhakti-input, #bhakti-submit-btn').css({'width': '100%'});
      $('#bhakti-categories').css({'width': '80%'});
      $('#bhakti-wrapper').css({'width': '100%', 'margin': '0 auto'});
    } else if ($(window).width() > 620 && $(window).width() < 1189) {
      // $('#bhakti-dropbtn').css({'width': '35%'});
      // $('#bhakti-input').css({'width': '30%'});
      // $('#bhakti-submit-btn').css({'width': '25%'});
      $('#bhakti-dropbtn, #bhakti-input, #bhakti-submit-btn').css({'width': '100%'});
      $('#bhakti-wrapper').css({'width': '50%', 'margin': '0 auto'});
      $('#bhakti-categories').css({'width': '45%'});
    } else if ($(window).width() > 1200 ) {
      $('#bhakti-wrapper').css({'width': '50%', 'margin': '0 auto'});
      // $('#bhakti-search-results').css({'text-align': 'center'});
      $('#bhakti-categories').css({'width': '17.3%'});
      $('#bhakti-dropbtn').css({'width': '35%'});
      $('#bhakti-input').css({'width': '50%'});
      $('#bhakti-submit-btn').css({'width': '14%'})
    }
  }
  function addCategories(html) {
    var categories = ['bhagavatpatrika', 'movies', 'songs', 'harmonistmonthly', 'harmonistmagazine',
    'books', 'lectures', 'harikatha'];
    categories.forEach(function(item) {
      html += '<a href="javascript:void(0)">';
      html += item[0].toUpperCase() + item.substr(1);
      html += '</a>';
    });
    return html;
  }
  function submitSearch() {
    var searchButton = $('#bhakti-submit-btn');
    searchButton.click(function() {
      var searchQuery = $('#bhakti-input').val();
      var searchUrl = baseUrl + '/' + category + '/' + searchQuery;
      $.get(searchUrl).then(function(result) {
        return result
      }).then(function(result) {
        var results = result[Object.keys(result)[0]];
        displayResults(results);
        styling();
      })
    })
  }
  function displayResults(results) {
    var html = '<div id="resultList">';
    results.forEach(function(item) {
      html += '<a href';
      html += '=';
      html += item.link;
      html += '>';
      html += item.title;
      html += '</a>';
    });
    html += '</div>';
    $('#bhakti-search-results').html(html);

  }
  function setSize(elem) {
    responsiveDesign();
    $(window).resize(function() {
      responsiveDesign();
    })
  }
}(jQuery));


