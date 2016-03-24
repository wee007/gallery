var s = {
  galleryContent:      $('#content'),
  gallerySearchField:  $('.gallery-search_field'),
  gallerySearchButton: $('.gallery-search_button'),
  galleryViewToggle:   $('.gallery-view_toggle')
}

showGridView(items);
setupViewToggle(items);
setupSearch(items);

function setupSearch(items) {
  s.gallerySearchButton.on('keypress', function(event) {
    if (event.keyCode == '13') {
      showSearchResult(items);
    }
  });
  s.gallerySearchButton.on('click', function() {
    showSearchResult(items);
  });
}

function showSearchResult(items) {
  var new_items = [];
  $.each(items, function(index, value) {
    var regex = new RegExp(s.gallerySearchField.val(), 'gi');
    if (value["title"].match(regex)) {
      new_items.push(value);
    }
  });

  s.galleryContent.empty();
  if (s.galleryViewToggle.hasClass('gallery-grid_view')) {
    showGridView(new_items);
  } else {
    showListView(new_items);
  }
  setupViewToggle(new_items);
}

function setupViewToggle(items) {
  s.galleryViewToggle.off('click')
  s.galleryViewToggle.on('click', function() {
    if (s.galleryViewToggle.hasClass('gallery-grid_view')) {
      s.galleryViewToggle.attr('src','images/icons/list-toggle.jpg');
      s.galleryViewToggle.switchClass('gallery-grid_view','gallery-list_view');
      showListView(items);
    } else {
      s.galleryViewToggle.attr('src','images/icons/grid-toggle.jpg');
      s.galleryViewToggle.switchClass('gallery-list_view','gallery-grid_view');
      showGridView(items);
    }
  });
}

function showGridView(items) {
  $.each(items, function(index, value) {
    if ($('.gallery-tile').length == 0) {
      s.galleryContent.html('\
        <figure class="gallery-tile">\
          <div class="gallery-tile_container">\
            <div class="gallery-image_section">\
              <img src="images/'+value["path"]+'" alt="'+value["title"]+'" title="'+value["title"]+'" class="gallery-grid-image">\
            </div>\
            <figcaption class="gallery-grid-title">'+value["title"]+'</figcaption>\
          </div>\
        </figure>');
    } else {
      $('.gallery-tile').last().after('\
        <figure class="gallery-tile">\
          <div class="gallery-tile_container">\
            <div class="gallery-image_section">\
              <img src="images/'+value["path"]+'" alt="'+value["title"]+'" title="'+value["title"]+'" class="gallery-grid-image">\
            </div>\
            <figcaption class="gallery-grid-title">'+value["title"]+'</figcaption>\
          </div>\
        </figure>');
    }
  });
}

function showListView(items) {
  s.galleryContent.html('\
    <header class="gallery-header">\
      <h2 class="gallery-heading">Title</h2>\
      <h2 class="gallery-heading">Type</h2>\
    </header>');

  $.each(items, function(index, value) {
    if ($('.gallery-row').length == 0) {
      $('.gallery-header').after('\
        <figure class="gallery-row">\
          <img src="images/'+value["path"]+'" alt="'+value["title"]+'" title="'+value["title"]+'" class="gallery-list-image">\
          <figcaption class="gallery-list-title">'+value["title"]+'</figcaption>\
          <figcaption class="gallery-list-type">'+value["type"]+'</figcaption>\
        </figure>');
    } else {
      $('.gallery-row').last().after('\
        <figure class="gallery-row">\
          <img src="images/'+value["path"]+'" alt="'+value["title"]+'" title="'+value["title"]+'" class="gallery-list-image">\
          <figcaption class="gallery-list-title">'+value["title"]+'</figcaption>\
          <figcaption class="gallery-list-type">'+value["type"]+'</figcaption>\
        </figure>');
    }
  });
}
