/**
 * Created by murli on 3/21/2017.
 */

(function($) {
  var baseUrl = 'http://www.krsna.us/api/v1/search';
  var category = 'all';
  var baseAllUrl = 'http://www.krsna.us/api/v1/';
  $.fn.bhaktiBar = function() {
    setSize();
    this.html(createHtml());
    handleClick();
    submitSearch();
    styling();
    watchInput();
    return this;
  };
  function createHtml() {
    var html = '<div id="bhakti-wrapper">';
    html += '<div id="bhakti-nav">';
    html += '<button id="bhakti-dropbtn">All ▾</button>';
    html += '<div id="bhakti-categories">';
    html = addCategories(html);
    html += '</div>';
    html += '<input id="bhakti-input" placeholder="Search Here" />';
    html += '<button id="bhakti-submit-btn">Go</button>';
    html += '</div>';
    html += '<div id="results-nav"></div>';
    html += '<div id="bhakti-search-results"></div>';
    html += '</div>';
    return html
  }
  function handleClick() {
    $('#bhakti-categories a').click(function() {
      $('#bhakti-dropbtn').text(this.text + ' ▾');
      category = this.text[0].toLowerCase() + this.text.substr(1);
      $('#bhakti-categories').css({'display': 'none'});
      var searchButton = $('#bhakti-submit-btn');
      searchButton.click();
    });
  }
  function watchInput() {
    $('#bhakti-input').keyup(function(e) {
      if (e.keyCode == 13) {
        $('#bhakti-submit-btn').click();
      }
    });
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
    var $rc = $('#results-categories');
    $rc.css({
      'display': 'none',
      'position': 'absolute',
      'z-index': '1',
      'width': '45%',
      'background-color': '#f9f9f9',
      'box-shadow': '0px 8px 15px 0px rgba(0,0,0,0.2)'
    });
    $('#results-categories a').css({'display': 'block'});
    $('#results-btn, #results-categories').hover(function() {$rc.css({'display': 'block'})}, function() {$rc.css({'display': 'none'})});
    $('#bhakti-dropbtn').css({'min-width': '160px'});
    $('#bhakti-dropbtn, #bhakti-categories').hover(function() {$bc.css({'display': 'block'})}, function() {$bc.css({'display': 'none'})});
    $('#bhakti-categories a').css({'display': 'block', 'padding': '12px 16px', 'text-decoration': 'none'});
    $('#bhakti-search-results').css({'overflow-y': 'auto', 'max-height': '300px', 'overflow-x': 'hidden', 'word-wrap': 'break-word'});
    $('#resultList a').css({'text-decoration': 'none', 'display': 'block'});
    // $('#result-menu').css({'position': 'fixed', 'background-color': 'white', 'margin-top': '-20px', 'padding': '5px'});
    // $('#resultList h2').css({'padding-top': '20px'});
    $('#resultList .bhakti-anchors').css({'padding-top': '300px', 'margin-top': '-350px'});
    $('.color-book-results').css({'background-color': 'red', 'color': 'white'});
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
    var categories = ['all', 'bhagavatpatrika', 'movies', 'songs', 'harmonistmonthly', 'harmonistmagazine',
    'books', 'book content', 'lectures', 'harikatha'];
    categories.forEach(function(item) {
      html += '<a href="javascript:void(0)">';
      html += item[0].toUpperCase() + item.substr(1);
      html += '</a>';
    });
    return html;
  }
  // function displayMenu(results) {
  //   var html = '<button id="results-btn">BhagavatPatrika</button>';
  //   html += '<div id="results-categories">';
  //   Object.keys(results).forEach(function(name, index) {
  //     html += '<a href="#bhakti-';
  //     html += name;
  //     html += '">';
  //     html += name;
  //     html += '</a>';
  //   });
  //   html += '</div>';
  //   $('#results-nav').html(html);
  // }
  function submitSearch() {
    var searchButton = $('#bhakti-submit-btn');
    searchButton.click(function() {
      var searchQuery = $('#bhakti-input').val();
      console.log(category.split(" ").join(""));
      var searchUrl = baseUrl + '/' + category + '/' + searchQuery;
      var displayAllUrl = baseAllUrl + category;
      if (category.split(" ").join("") == 'bookcontent') {
        bookContentSearch(baseAllUrl + 'booksearch' + '/' + searchQuery, searchQuery);
        return;
      }
      if (!searchQuery) {
        if (category === 'all') {
          console.log('Enter something to search')
        } else {
          search(displayAllUrl);
        }
      } else {
        if (category === 'all') {
          searchAll(searchUrl);
        } else {
          search(searchUrl);
        }
      }
    })
  }
  function bookContentSearch(url, query) {
    $.get(url).then(function(result) {
        return result
      }).then(function(result) {
        var results = result[Object.keys(result)[0]];
        console.log(results);
        displayBookContent(results, query);
        styling();
      })
  }
  function search(searchUrl) {
    $.get(searchUrl).then(function(result) {
        return result
      }).then(function(result) {
        var results = result[Object.keys(result)[0]];
        displayResults(results);
        styling();
      })
  }
  function searchAll(url) {
    $.get(url).then(function(result) {
        return result
      }).then(function(result) {
        var results = result[Object.keys(result)[0]];
        displayAllResults(results);
        styling();
      })
  }
  function displayBookContent(results, query) {
    console.log(query);
    var regex = new RegExp(query, 'gi');
    var html = '<div id="resultList">';
    results.forEach(function(item) {
      html += '<h4>Title:</h4>';
      html += '<a href="';
      html += item.link;
      html += '">';
      html += item.title;
      html += '</a>';
      html += '<h4>Page: </h4>';
      html += item.page;
      html += '<h4>Content</h4>';
      html += '<p>content is scanned so some words might not show up properly</p>';
      html += '<div class="book-content">';
      html += item.content.replace(regex, '<span class="color-book-results">' + query + '</span>');
      html += '</div>';

    });
    html += '</div>';
    $('#bhakti-search-results').html(html);
  }
  function displayAllResults(results) {
    var html = '<div id="resultList">';
    // html += '<ul id="result-menu">';
    // Object.keys(results).forEach(function(name, index) {
    //
    //   html += `<li><a href="#bhakti-${name}">`;
    //   html += name;
    //   html += '</a></li>';
    // });
    // html += '</ul>';
    Object.keys(results).forEach(function(name, index) {
      name ? html += `<h2 id="bhakti-${name}" class=".bhakti-anchors">${name}</h2>`:null;
      results[name].forEach(function(obj, i) {
        html += '<a href';
        html += '="';
        html += obj.link;
        html += '"';
        html += '>';
        html += obj.title;
        obj.hasOwnProperty('language') ? html += ' | ' + obj.language: null;
        obj.hasOwnProperty('category') ? html += ' | ' + obj.category: null;
        html += '</a>';
      });
    });
    html += '</div>';
    $('#bhakti-search-results').html(html);
  }
  function displayResults(results) {
    var html = '<div id="resultList">';
    results.forEach(function(item) {
      html += '<a href';
      html += '="';
      html += item.link;
      html += '"';
      html += '>';
      html += item.title;
      item.hasOwnProperty('language') ? html += ' | ' + item.language: null;
      item.hasOwnProperty('category') ? html += ' | ' + item.category: null;
      html += '</a>';
    });
    html += '</div>';
    $('#bhakti-search-results').html(html);

  }
  function setSize() {
    responsiveDesign();
    $(window).resize(function() {
      responsiveDesign();
    })
  }
}(jQuery));


