#  Scrollback

Lightweight JS ( ES6 syntax ) to handle when user scroll back. ( strongly inspired by http://wicky.nillia.ms/headroom.js/ )

##  How to 

``` 
// Select dom element you want to manage 
var header = document.querySelector("header")

// Init and set scrollback
var headerScrollBack = new scrollback(header, {
    tolerance: {
        up: 0,
        down: 0
    },
    offset: 80,
    scroller: window,
    disable: false,
    classes: {
        initial: 'header',
        pinned: 'header-pinned',
        unpinned: 'header-unpinned',
        scrolled: 'header-nottop'
    }
})
```



