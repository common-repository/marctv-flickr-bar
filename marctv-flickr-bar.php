<?php
/*
  Plugin Name: MarcTV Flickr Bar 
  Plugin URI: http://www.marctv.de
  Description: Displays a list of flickr images of a specific account id.
  Version: 2.4.1
  Author: Marc Tönsing
  Author URI: http://www.marctv.de
  License: GPL v2 - http://www.gnu.org/licenses/old-licenses/gpl-2.0.html

  This program is free software; you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation; either version 2 of the License, or
  (at your option) any later version.
  your option) any later version.
 */



function marctv_flickr_bar_scripts() {
  wp_enqueue_style(
          "jquery.marctv-flickr-bar-style", WP_PLUGIN_URL . "/marctv-flickr-bar/marctv-flickr-bar.css",
          false, '2.4.1');

  wp_enqueue_script(
          "jquery.marctv-flickr-bar", WP_PLUGIN_URL . "/marctv-flickr-bar/jquery.marctv-flickr-bar.js",
          array("jquery", "colorbox"), '2.4.1', true);
}
add_action('wp_print_styles', 'marctv_flickr_bar_scripts');
?>
