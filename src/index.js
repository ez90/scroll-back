import ScrollBack from './js/ScrollBack';


var header = document.querySelector("header");

const headerScrollBack = new ScrollBack(header, {
    tolerance: {
        up: 5,
        down: 5
    },
    offset: 80,
    scroller: window,
    classes: {
        initial: 'header',
        pinned: 'header-pinned',
        unpinned: 'header-unpinned',
        scrolled: 'header-scrolled'
    }
});
