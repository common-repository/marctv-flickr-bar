(function ($) {
    $.fn.marctvflickrbar = function (o) {
        o = $.extend({
            callback: null,
            api_callback: '?',
            api_key: null,
            headline: 'images',
            user_id: null,
            user_name: null,
            display_limit: 3,
            query_limit: 6
        }, o);

        var aspectHeight = function (width, aspect_w, aspect_h) {
            var height = width / aspect_w * aspect_h;
            return height;
        };

        $.fn.setSize_flickrbar = function () {
            this.each(function () {

                var margin = 0;

                var img_width = $(".crop", this).innerWidth();
                var img_height = aspectHeight(img_width, 4, 3);
                var img_height_input = aspectHeight(img_width, 16, 7);

                var margin = ((((img_height_input - img_height) / 2)));

                $("img", this).css({
                    'width': img_width,
                    'height': img_height,
                    'margin-top': margin,
                    'margin-bottom': margin
                });

            });
        };

        $.fn.getFlickrData = function (i) {
            var flickrbar = $(this);

            $(this).append('<h2 class="box_title supertitle"><span>' + o.headline + '</span></h2>').append('<ul class="loading container multi"><li class="box first">Lade...</li><li class="box">Lade...</li><li class="box multi-last">Lade...</li><li class="box multi-first">Lade...</li><li class="box">Lade...</li><li class="box last">Lade...</li></ul>');

            $.ajax({
                url: 'https://api.flickr.com/services/rest/?format=json&jsoncallback=' + o.api_callback + '&api_key=' + o.api_key + '&method=flickr.photos.search&sort=date-posted-desc&user_id=' + o.user_id + '&per_page=' + o.query_limit + '&page=1',
                dataType: 'jsonp',
                success: function (data) {
                    var list = '<ul class="container multi">';
                    var item = '';

                    $.each(data.photos.photo, function (key, photo) {
                        var flBaseURL = 'http://farm' + photo['farm'] + '.static.flickr.com/' + photo['server'] + '/' + photo['id'] + '_' + photo['secret'];

                        var flSmallIMG = flBaseURL + '_m.jpg';
                        var flIMG = flBaseURL + '_b.jpg';
                        var flTITLE = photo['title'];
                        var flID = photo['id'];

                        if (key < o.display_limit) {
                            if (key === o.display_limit - 1) {
                                item = '<li class="box last"><div class="crop">';
                            } else if (key === 0) {
                                item = '<li class="box first"><div class="crop">';
                            } else if (key === 2) {
                                item = '<li class="box multi-last"><div class="crop">';
                            } else if (key % (4 - 1) === 0) {
                                item = '<li class="box multi-first"><div class="crop">';
                            } else {
                                item = '<li class="box"><div class="crop">';
                            }

                            item += '<a data-url="' + flID + '" title="' + flTITLE + '" rel="marctvflickrbar' + i + '" href="' + flIMG + '">';
                            item += '<span class="sprite fullscreenicon"> </span>';
                            item += '<span class="sprite flickrb"> </span>';
                            item += '<img src="' + flSmallIMG + '" alt="' + flTITLE + '">';
                            item += '</a></div>';
                            item += '<div class="title">' + flTITLE.substring(0, 50) + '</div>';
                            item += '</li>';
                        } else {
                            item = '<li style="display:none;">';
                            item += '<a data-url="' + flID + '" title="' + flTITLE + '" rel="marctvflickrbar' + i + '" href="' + flIMG + '"></a>';
                            item += '</li>';
                        }
                        list += item;
                    });
                    list += '</ul>';

                    $('.loading', flickrbar).hide();

                    flickrbar.append(list);
                    if (o.callback)
                        o.callback(flickrbar, o.user_name);
                    $(flickrbar).setSize_flickrbar();
                }
            });

        };
        return this.each(function (i) {
            $(this).getFlickrData(i);
        });
    };


    $.fn.isOnScreen = function () {

        var win = $(window);

        var viewport = {
            top: win.scrollTop(),
            left: win.scrollLeft()
        };
        viewport.right = viewport.left + win.width();
        viewport.bottom = viewport.top + win.height();

        var bounds = this.offset();
        bounds.right = bounds.left + this.outerWidth();
        bounds.bottom = bounds.top + this.outerHeight();

        return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));

    };

    $(document).ready(function ($) {

        function fl_colorbox_callback(el, user_name) {
            if ($.isFunction($.colorbox) && $(window).width() > 1000) {
                $('ul a', el).colorbox({
                    preloading: true,
                    iframe: false,
                    innerWidth: 600,
                    innerHeight: 448,
                    current: '{current}/{total}',
                    title: function () {
                        return '<a class="flickricon" href="http://www.flickr.com/photos/' + user_name + '/' + $(this).attr("data-url") + '">' + this.title + '</a>';
                    },
                    initialHeight: 374
                });
            }
        }

        function resizeStuff_flickrbar() {
            $('#marctvflickrbar').setSize_flickrbar();
        }

        var TO = false;

        $(window).resize(function () {
            if (TO !== false)
                clearTimeout(TO);
            TO = setTimeout(resizeStuff_flickrbar, 200); //200 is time in miliseconds
        });

        $("#marctvflickrbar").marctvflickrbar({
            user_name: 'marctv', // your flickr user name
            headline: '<a href="http://www.flickr.com/marctv">Bilder vom Mobiltelefon</a>', // headline
            display_limit: 6, // hide any following item
            query_limit: 18, // query limit
            api_key: '36ba60d90bb42ca4f6646b2f5997f959', // you get this in your flickr options
            user_id: '13908671@N00', // your flickr user id
            callback: fl_colorbox_callback        // callback function name
        });
    });
}(jQuery));





