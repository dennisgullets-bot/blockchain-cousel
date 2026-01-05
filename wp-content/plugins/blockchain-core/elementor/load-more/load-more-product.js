jQuery(document).ready(function($) {
    "use strict";
    /**
     * Load category tab.
     */

    ajax_pagenav();

    $('.ajax-filter').on('click', 'a', function(e) {
        e.preventDefault();

        $('.ajax-filter a').removeClass('active');
        $(this).addClass('active');

        var cat = $(this).data('cat'),
            limit = $(this).data('limit');

        $.ajax({
            type: 'POST',
            dataType: 'html',
            url: blockchain_admin_url.ajaxurl,
            data: {
                'cat': cat,
                'limit': limit,
                'action': 'blockchain_product_ajax'
            },
            beforeSend: function() {
                $(".blcn-masonry").append('<div class="products-loading"><div class="la-timer la-dark la-3x"><div></div></div></div>');
                $('.blcn-masonry').isotope('reloadItems').isotope();
                $('.blcn-item').matchHeight();
            },
            success: function(data) {
                $('.blcn-masonry').isotope('reloadItems').isotope();
                $(".blcn-product-section .blcn-masonry").html(data);
                $('.blcn-item').matchHeight();

                $(".filter-item").mouseenter(function() {
                    $(this).addClass('blcn-hover');
                });
                $(".filter-item").mouseleave(function() {
                    $(this).removeClass('blcn-hover');
                });

                var $masonryheight = $(".blcn-masonry").height();
                $(".blcn-app-data").css('height', $masonryheight);

                setTimeout(function() {
                    $('.blcn-masonry').isotope('reloadItems').isotope();
                    var $masonryheight = $(".blcn-masonry").height();
                    $(".blcn-app-data").css('height', $masonryheight);
                    $('.blcn-item').matchHeight();
                }, 100);

                setTimeout(ajax_pagenav, 100);
                $('nav.blcn-pagination').hide();
            },
        });
    });

    function ajax_pagenav() {
        $(".ajax-page-numbers li").on('click', 'a', function(e) {
            e.preventDefault();

            var page_no = $(this).data("page"),
                cat_slug = $(".ajax-filter a.active").data("cat"),
                limit = $(".ajax-filter a.active").data('limit');

            $.ajax({
                type: 'POST',
                dataType: 'html',
                url: blockchain_admin_url.ajaxurl,
                data: {
                    'cat': cat_slug,
                    'offset': page_no,
                    'limit': limit,
                    'action': 'blockchain_more_product_ajax_pagi'
                },
                beforeSend: function() {
                    $('.blcn-masonry').isotope('reloadItems').isotope();
                    $(".blcn-masonry").append('<div class="products-loading"><div class="la-timer la-dark la-3x"><div></div></div></div>');
                    $('.blcn-item').matchHeight();
                },
                success: function(data) {
                    $('.blcn-masonry').isotope('reloadItems').isotope();
                    $(".blcn-product-section .blcn-masonry").html(data);
                    var $masonryheight = $(".blcn-masonry").height();
                    $(".blcn-app-data").css('height', $masonryheight);
                    $('.blcn-item').matchHeight();
                },
                complete: function(data) {
                    setTimeout(function() {
                        $('.blcn-masonry').isotope('reloadItems').isotope();
                        var $masonryheight = $(".blcn-masonry").height();
                        $(".blcn-app-data").css('height', $masonryheight);
                        $('.blcn-item').matchHeight();
                    }, 100);
                    // Pagination data link update
                    $('.blcn-item').matchHeight();
                    $('.blcn-masonry').isotope('reloadItems').isotope();
                    $(".ajax-page-numbers .last").remove();
                    $(".ajax-page-numbers .first").remove();
                    $('.ajax-page-numbers a').removeClass('current disabled-click');
                    $('.ajax-page-numbers a[data-page = ' + page_no + ']').addClass('current disabled-click');
                    if (page_no > 1) {
                        $(".ajax-page-numbers").prepend('<li class="first update-item"><a class="prev page-numbers" data-page="' + (page_no - 1) + '" href="#"><i class="fa fa-angle-left"></i></a></li>');
                    }
                    var navcount = $(".ajax-page-numbers > li").not('.update-item').length;
                    if (navcount >= (page_no + 1)) {
                        $(".ajax-page-numbers").append('<li class="last update-item"><a class="next page-numbers" data-page="' + (page_no + 1) + '" href="#"><i class="fa fa-angle-right"></i></a></li>');
                    }
                    $(".filter-item").mouseenter(function() {
                        $(this).addClass('blcn-hover');
                    });
                    $(".filter-item").mouseleave(function() {
                        $(this).removeClass('blcn-hover');
                    });

                    ajax_pagenav();
                    $('div.blcn-pagination').hide();
                }
            });

        });
    }

});