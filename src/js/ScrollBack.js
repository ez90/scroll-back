const scrollBackOptions = {
    tolerance: {
        up: 0,
        down: 0
    },
    offset: 0,
    scroller: window,
    classes: {
        initial: 'scrollback',
        pinned: 'scrollback-pinned',
        unpinned: 'scrollback-unpinned',
        scrolled: 'scrollback-scrolled'
    }
}

export default class ScrollBack {

    constructor(element, options = {}) {
        // Merge options
        const finalOptions = Object.assign(scrollBackOptions, options)

        // Set class attributes
        this.lastKnownScrollY = 0
        this.currentScrollY = 0
        this.isPinned = true;
        this.hasNoTopClass = false;
        this.ticking = false
        this.element = element
        this.tolerance = finalOptions.tolerance
        this.classes = finalOptions.classes
        this.scroller = finalOptions.scroller
        this.offset = finalOptions.offset
        this.scrollDirection = ''
        this.toleranceExceeded = false

        // Init
        this.init(element)
    }

    init() {
        this.bindEventListeners()
    }

    isToleranceExceeded() {
        return Math.abs(this.currentScrollY - this.lastKnownScrollY) >= this.tolerance[this.scrollDirection]
    }

    getScrollY() {
        let scrollY

        if (this.scroller.pageYOffset !== undefined) {
            scrollY = this.scroller.pageYOffset
        } else if (this.scroller.scrollTop !== undefined) {
            scrollY = this.scroller.scrollTop
        } else {
            scrollY = (document.documentElement || document.body.parentNode || document.body).scrollTop
        }

        return scrollY
    }

    shouldPin() {
        let scrollingUp = this.currentScrollY < this.lastKnownScrollY
        let pastOffset = this.currentScrollY <= this.offset

        return (scrollingUp && this.toleranceExceeded && !this.isPinned) || (pastOffset && !this.isPinned)
    }

    pin() {
        this.element.classList.remove(this.classes.unpinned)
        this.element.classList.add(this.classes.pinned)
        this.isPinned = true
    }

    shouldUnpin() {
        let scrollingDown = this.currentScrollY > this.lastKnownScrollY
        let pastOffset = this.currentScrollY >= this.offset

        return this.isPinned && scrollingDown && pastOffset && this.toleranceExceeded
    }

    unpin() {
        this.element.classList.remove(this.classes.pinned)
        this.element.classList.add(this.classes.unpinned)
        this.isPinned = false
    }

    update() {
        this.currentScrollY = this.getScrollY()
        this.scrollDirection = this.currentScrollY > this.lastKnownScrollY ? 'down' : 'up'
        this.toleranceExceeded = this.isToleranceExceeded()

        if (this.shouldUnpin()) {
            this.unpin()
        }
        else if (this.shouldPin()) {
            this.pin()
        }

        if(this.currentScrollY > this.offset){
            if(!this.isPinned && !this.hasNoTopClass ) {
                console.log('addClass')
                this.element.classList.add(this.classes.scrolled)
                this.hasNoTopClass = true
            }
        } else  {
            this.element.classList.remove(this.classes.scrolled)
            this.hasNoTopClass = false
        }

        this.lastKnownScrollY = this.currentScrollY
        this.ticking = false
    }

    requestTick() {
        if (!this.ticking) {
            requestAnimationFrame(this.update.bind(this))
        }
        this.ticking = true
    }

    onScroll() {
        this.requestTick()
    }

    bindEventListeners() {
        document.addEventListener('scroll', this.onScroll.bind(this), false)
    }
}