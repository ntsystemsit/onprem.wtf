import "index.scss"
import * as Turbo from "@hotwired/turbo"

// Uncomment the line below to add transition animations when Turbo navigates.
// We recommend adding <meta name="turbo-cache-control" content="no-preview" />
// to your HTML head if you turn on transitions. Use data-turbo-transition="false"
// on your <main> element for pages where you don't want any transition animation.
//
import "./turbo_transitions.js"
import "bridgetown-quick-search/dist"

// Import all JavaScript & CSS files from src/_components
import components from "bridgetownComponents/**/*.{js,jsx,js.rb,css}"

console.info("onprem.wtf is loaded!")

if ('serviceWorker' in navigator && !(/localhost/.test(window.location.href))) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/serviceworker.js')
        console.log('Servie worker registered.');
    });
}
