import { getWindow } from '../../ssr-window/package/ssr-window.esm.js';
import $ from '../../utils/dom';
import { bindModuleMethods, getTranslate } from '../../utils/utils';
const Zoom = {
    // Calc Scale From Multi-touches
    getDistanceBetweenTouches(e) {
        if (e.targetTouches.length < 2) return 1;
        const x1 = e.targetTouches[0].pageX;
        const y1 = e.targetTouches[0].pageY;
        const x2 = e.targetTouches[1].pageX;
        const y2 = e.targetTouches[1].pageY;
        const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        return distance;
    },
    // Events
    onGestureStart(e) {
        const swiper = this;
        const support = swiper.support;
        const params = swiper.params.zoom;
        const zoom = swiper.zoom;
        const { gesture } = zoom;
        zoom.fakeGestureTouched = false;
        zoom.fakeGestureMoved = false;
        if (!support.gestures) {
            if (e.type !== 'touchstart' || (e.type === 'touchstart' && e.targetTouches.length < 2)) {
                return;
            }
            zoom.fakeGestureTouched = true;
            gesture.scaleStart = Zoom.getDistanceBetweenTouches(e);
        }
        if (!gesture.$slideEl || !gesture.$slideEl.length) {
            gesture.$slideEl = $(e.target).closest(`.${swiper.params.slideClass}`);
            if (gesture.$slideEl.length === 0) gesture.$slideEl = swiper.slides.eq(swiper.activeIndex);
            gesture.$imageEl = gesture.$slideEl.find('img, svg, canvas, picture, .swiper-zoom-target');
            gesture.$imageWrapEl = gesture.$imageEl.parent(`.${params.containerClass}`);
            gesture.maxRatio = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;
            if (gesture.$imageWrapEl.length === 0) {
                gesture.$imageEl = undefined;
                return;
            }
        }
        if (gesture.$imageEl) {
            gesture.$imageEl.transition(0);
        }
        swiper.zoom.isScaling = true;
    },
    onGestureChange(e) {
        const swiper = this;
        const support = swiper.support;
        const params = swiper.params.zoom;
        const zoom = swiper.zoom;
        const gesture = zoom.gesture;
        if (!support.gestures) {
            if (e.type !== 'touchmove' || (e.type === 'touchmove' && e.targetTouches.length < 2)) {
                return;
            }
            zoom.fakeGestureMoved = true;
            gesture.scaleMove = Zoom.getDistanceBetweenTouches(e);
        }
        if (!gesture.$imageEl || gesture.$imageEl.length === 0) {
            if (e.type === 'gesturechange') zoom.onGestureStart(e);
            return;
        }
        if (support.gestures) {
            zoom.scale = e.scale * zoom.currentScale;
        } else {
            zoom.scale = (gesture.scaleMove / gesture.scaleStart) * zoom.currentScale;
        }
        if (zoom.scale > gesture.maxRatio) {
            zoom.scale = gesture.maxRatio - 1 + (zoom.scale - gesture.maxRatio + 1) ** 0.5;
        }
        if (zoom.scale < params.minRatio) {
            zoom.scale = params.minRatio + 1 - (params.minRatio - zoom.scale + 1) ** 0.5;
        }
        gesture.$imageEl.transform(`translate3d(0,0,0) scale(${zoom.scale})`);
    },
    onGestureEnd(e) {
        const swiper = this;
        const device = swiper.device;
        const support = swiper.support;
        const params = swiper.params.zoom;
        const zoom = swiper.zoom;
        const { gesture } = zoom;
        if (!support.gestures) {
            if (!zoom.fakeGestureTouched || !zoom.fakeGestureMoved) {
                return;
            }
            if (
                e.type !== 'touchend' ||
                (e.type === 'touchend' && e.changedTouches.length < 2 && !device.android)
            ) {
                return;
            }
            zoom.fakeGestureTouched = false;
            zoom.fakeGestureMoved = false;
        }
        if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;
        zoom.scale = Math.max(Math.min(zoom.scale, gesture.maxRatio), params.minRatio);
        gesture.$imageEl
            .transition(swiper.params.speed)
            .transform(`translate3d(0,0,0) scale(${zoom.scale})`);
        zoom.currentScale = zoom.scale;
        zoom.isScaling = false;
        if (zoom.scale === 1) gesture.$slideEl = undefined;
    },
    onTouchStart(e) {
        const swiper = this;
        const device = swiper.device;
        const zoom = swiper.zoom;
        const { gesture, image } = zoom;
        if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;
        if (image.isTouched) return;
        if (device.android && e.cancelable) e.preventDefault();
        image.isTouched = true;
        image.touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
        image.touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
    },
    onTouchMove(e) {
        const swiper = this;
        const zoom = swiper.zoom;
        const { gesture, image, velocity } = zoom;
        if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;
        swiper.allowClick = false;
        if (!image.isTouched || !gesture.$slideEl) return;
        if (!image.isMoved) {
            image.width = gesture.$imageEl[0].offsetWidth;
            image.height = gesture.$imageEl[0].offsetHeight;
            image.startX = getTranslate(gesture.$imageWrapEl[0], 'x') || 0;
            image.startY = getTranslate(gesture.$imageWrapEl[0], 'y') || 0;
            gesture.slideWidth = gesture.$slideEl[0].offsetWidth;
            gesture.slideHeight = gesture.$slideEl[0].offsetHeight;
            gesture.$imageWrapEl.transition(0);
            if (swiper.rtl) {
                image.startX = -image.startX;
                image.startY = -image.startY;
            }
        }
        // Define if we need image drag
        const scaledWidth = image.width * zoom.scale;
        const scaledHeight = image.height * zoom.scale;
        if (scaledWidth < gesture.slideWidth && scaledHeight < gesture.slideHeight) return;
        image.minX = Math.min(gesture.slideWidth / 2 - scaledWidth / 2, 0);
        image.maxX = -image.minX;
        image.minY = Math.min(gesture.slideHeight / 2 - scaledHeight / 2, 0);
        image.maxY = -image.minY;
        image.touchesCurrent.x = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
        image.touchesCurrent.y = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
        if (!image.isMoved && !zoom.isScaling) {
            if (
                swiper.isHorizontal() &&
                ((Math.floor(image.minX) === Math.floor(image.startX) &&
                        image.touchesCurrent.x < image.touchesStart.x) ||
                    (Math.floor(image.maxX) === Math.floor(image.startX) &&
                        image.touchesCurrent.x > image.touchesStart.x))
            ) {
                image.isTouched = false;
                return;
            }
            if (
                !swiper.isHorizontal() &&
                ((Math.floor(image.minY) === Math.floor(image.startY) &&
                        image.touchesCurrent.y < image.touchesStart.y) ||
                    (Math.floor(image.maxY) === Math.floor(image.startY) &&
                        image.touchesCurrent.y > image.touchesStart.y))
            ) {
                image.isTouched = false;
                return;
            }
        }
        if (e.cancelable) {
            e.preventDefault();
        }
        e.stopPropagation();
        image.isMoved = true;
        image.currentX = image.touchesCurrent.x - image.touchesStart.x + image.startX;
        image.currentY = image.touchesCurrent.y - image.touchesStart.y + image.startY;
        if (image.currentX < image.minX) {
            image.currentX = image.minX + 1 - (image.minX - image.currentX + 1) ** 0.8;
        }
        if (image.currentX > image.maxX) {
            image.currentX = image.maxX - 1 + (image.currentX - image.maxX + 1) ** 0.8;
        }
        if (image.currentY < image.minY) {
            image.currentY = image.minY + 1 - (image.minY - image.currentY + 1) ** 0.8;
        }
        if (image.currentY > image.maxY) {
            image.currentY = image.maxY - 1 + (image.currentY - image.maxY + 1) ** 0.8;
        }
        // Velocity
        if (!velocity.prevPositionX) velocity.prevPositionX = image.touchesCurrent.x;
        if (!velocity.prevPositionY) velocity.prevPositionY = image.touchesCurrent.y;
        if (!velocity.prevTime) velocity.prevTime = Date.now();
        velocity.x =
            (image.touchesCurrent.x - velocity.prevPositionX) / (Date.now() - velocity.prevTime) / 2;
        velocity.y =
            (image.touchesCurrent.y - velocity.prevPositionY) / (Date.now() - velocity.prevTime) / 2;
        if (Math.abs(image.touchesCurrent.x - velocity.prevPositionX) < 2) velocity.x = 0;
        if (Math.abs(image.touchesCurrent.y - velocity.prevPositionY) < 2) velocity.y = 0;
        velocity.prevPositionX = image.touchesCurrent.x;
        velocity.prevPositionY = image.touchesCurrent.y;
        velocity.prevTime = Date.now();
        gesture.$imageWrapEl.transform(`translate3d(${image.currentX}px, ${image.currentY}px,0)`);
    },
    onTouchEnd() {
        const swiper = this;
        const zoom = swiper.zoom;
        const { gesture, image, velocity } = zoom;
        if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;
        if (!image.isTouched || !image.isMoved) {
            image.isTouched = false;
            image.isMoved = false;
            return;
        }
        image.isTouched = false;
        image.isMoved = false;
        let momentumDurationX = 300;
        let momentumDurationY = 300;
        const momentumDistanceX = velocity.x * momentumDurationX;
        const newPositionX = image.currentX + momentumDistanceX;
        const momentumDistanceY = velocity.y * momentumDurationY;
        const newPositionY = image.currentY + momentumDistanceY;
        // Fix duration
        if (velocity.x !== 0)
            momentumDurationX = Math.abs((newPositionX - image.currentX) / velocity.x);
        if (velocity.y !== 0)
            momentumDurationY = Math.abs((newPositionY - image.currentY) / velocity.y);
        const momentumDuration = Math.max(momentumDurationX, momentumDurationY);
        image.currentX = newPositionX;
        image.currentY = newPositionY;
        // Define if we need image drag
        const scaledWidth = image.width * zoom.scale;
        const scaledHeight = image.height * zoom.scale;
        image.minX = Math.min(gesture.slideWidth / 2 - scaledWidth / 2, 0);
        image.maxX = -image.minX;
        image.minY = Math.min(gesture.slideHeight / 2 - scaledHeight / 2, 0);
        image.maxY = -image.minY;
        image.currentX = Math.max(Math.min(image.currentX, image.maxX), image.minX);
        image.currentY = Math.max(Math.min(image.currentY, image.maxY), image.minY);
        gesture.$imageWrapEl
            .transition(momentumDuration)
            .transform(`translate3d(${image.currentX}px, ${image.currentY}px,0)`);
    },
    onTransitionEnd() {
        const swiper = this;
        const zoom = swiper.zoom;
        const { gesture } = zoom;
        if (gesture.$slideEl && swiper.previousIndex !== swiper.activeIndex) {
            if (gesture.$imageEl) {
                gesture.$imageEl.transform('translate3d(0,0,0) scale(1)');
            }
            if (gesture.$imageWrapEl) {
                gesture.$imageWrapEl.transform('translate3d(0,0,0)');
            }
            zoom.scale = 1;
            zoom.currentScale = 1;
            gesture.$slideEl = undefined;
            gesture.$imageEl = undefined;
            gesture.$imageWrapEl = undefined;
        }
    },
    // Toggle Zoom
    toggle(e) {
        const swiper = this;
        const zoom = swiper.zoom;
        if (zoom.scale && zoom.scale !== 1) {
            // Zoom Out
            zoom.out();
        } else {
            // Zoom In
            zoom.in(e);
        }
    },
    in(e) {
        const swiper = this;
        const window = getWindow();
        const zoom = swiper.zoom;
        const params = swiper.params.zoom;
        const { gesture, image } = zoom;
        if (!gesture.$slideEl) {
            if (swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual) {
                gesture.$slideEl = swiper.$wrapperEl.children(`.${swiper.params.slideActiveClass}`);
            } else {
                gesture.$slideEl = swiper.slides.eq(swiper.activeIndex);
            }
            gesture.$imageEl = gesture.$slideEl.find('img, svg, canvas, picture, .swiper-zoom-target');
            gesture.$imageWrapEl = gesture.$imageEl.parent(`.${params.containerClass}`);
        }
        if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;
        gesture.$slideEl.addClass(`${params.zoomedSlideClass}`);
        let touchX;
        let touchY;
        let offsetX;
        let offsetY;
        let diffX;
        let diffY;
        let translateX;
        let translateY;
        let imageWidth;
        let imageHeight;
        let scaledWidth;
        let scaledHeight;
        let translateMinX;
        let translateMinY;
        let translateMaxX;
        let translateMaxY;
        let slideWidth;
        let slideHeight;
        if (typeof image.touchesStart.x === 'undefined' && e) {
            touchX = e.type === 'touchend' ? e.changedTouches[0].pageX : e.pageX;
            touchY = e.type === 'touchend' ? e.changedTouches[0].pageY : e.pageY;
        } else {
            touchX = image.touchesStart.x;
            touchY = image.touchesStart.y;
        }
        zoom.scale = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;
        zoom.currentScale = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;
        if (e) {
            slideWidth = gesture.$slideEl[0].offsetWidth;
            slideHeight = gesture.$slideEl[0].offsetHeight;
            offsetX = gesture.$slideEl.offset().left + window.scrollX;
            offsetY = gesture.$slideEl.offset().top + window.scrollY;
            diffX = offsetX + slideWidth / 2 - touchX;
            diffY = offsetY + slideHeight / 2 - touchY;
            imageWidth = gesture.$imageEl[0].offsetWidth;
            imageHeight = gesture.$imageEl[0].offsetHeight;
            scaledWidth = imageWidth * zoom.scale;
            scaledHeight = imageHeight * zoom.scale;
            translateMinX = Math.min(slideWidth / 2 - scaledWidth / 2, 0);
            translateMinY = Math.min(slideHeight / 2 - scaledHeight / 2, 0);
            translateMaxX = -translateMinX;
            translateMaxY = -translateMinY;
            translateX = diffX * zoom.scale;
            translateY = diffY * zoom.scale;
            if (translateX < translateMinX) {
                translateX = translateMinX;
            }
            if (translateX > translateMaxX) {
                translateX = translateMaxX;
            }
            if (translateY < translateMinY) {
                translateY = translateMinY;
            }
            if (translateY > translateMaxY) {
                translateY = translateMaxY;
            }
        } else {
            translateX = 0;
            translateY = 0;
        }
        gesture.$imageWrapEl
            .transition(300)
            .transform(`translate3d(${translateX}px, ${translateY}px,0)`);
        gesture.$imageEl.transition(300).transform(`translate3d(0,0,0) scale(${zoom.scale})`);
    },
    out() {
        const swiper = this;
        const zoom = swiper.zoom;
        const params = swiper.params.zoom;
        const { gesture } = zoom;
        if (!gesture.$slideEl) {
            if (swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual) {
                gesture.$slideEl = swiper.$wrapperEl.children(`.${swiper.params.slideActiveClass}`);
            } else {
                gesture.$slideEl = swiper.slides.eq(swiper.activeIndex);
            }
            gesture.$imageEl = gesture.$slideEl.find('img, svg, canvas, picture, .swiper-zoom-target');
            gesture.$imageWrapEl = gesture.$imageEl.parent(`.${params.containerClass}`);
        }
        if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;
        zoom.scale = 1;
        zoom.currentScale = 1;
        gesture.$imageWrapEl.transition(300).transform('translate3d(0,0,0)');
        gesture.$imageEl.transition(300).transform('translate3d(0,0,0) scale(1)');
        gesture.$slideEl.removeClass(`${params.zoomedSlideClass}`);
        gesture.$slideEl = undefined;
    },
    toggleGestures(method) {
        const swiper = this;
        const zoom = swiper.zoom;
        const { slideSelector: selector, passiveListener: passive } = zoom;
        swiper.$wrapperEl[method]('gesturestart', selector, zoom.onGestureStart, passive);
        swiper.$wrapperEl[method]('gesturechange', selector, zoom.onGestureChange, passive);
        swiper.$wrapperEl[method]('gestureend', selector, zoom.onGestureEnd, passive);
    },
    enableGestures() {
        if (this.zoom.gesturesEnabled) return;
        this.zoom.gesturesEnabled = true;
        this.zoom.toggleGestures('on');
    },
    disableGestures() {
        if (!this.zoom.gesturesEnabled) return;
        this.zoom.gesturesEnabled = false;
        this.zoom.toggleGestures('off');
    },
    // Attach/Detach Events
    enable() {
        const swiper = this;
        const support = swiper.support;
        const zoom = swiper.zoom;
        if (zoom.enabled) return;
        zoom.enabled = true;
        const passiveListener =
            swiper.touchEvents.start === 'touchstart' &&
            support.passiveListener &&
            swiper.params.passiveListeners
                ? { passive: true, capture: false }
                : false;
        const activeListenerWithCapture = support.passiveListener
            ? { passive: false, capture: true }
            : true;
        const slideSelector = `.${swiper.params.slideClass}`;
        swiper.zoom.passiveListener = passiveListener;
        swiper.zoom.slideSelector = slideSelector;
        // Scale image
        if (support.gestures) {
            swiper.$wrapperEl.on(swiper.touchEvents.start, swiper.zoom.enableGestures, passiveListener);
            swiper.$wrapperEl.on(swiper.touchEvents.end, swiper.zoom.disableGestures, passiveListener);
        } else if (swiper.touchEvents.start === 'touchstart') {
            swiper.$wrapperEl.on(
                swiper.touchEvents.start,
                slideSelector,
                zoom.onGestureStart,
                passiveListener
            );
            swiper.$wrapperEl.on(
                swiper.touchEvents.move,
                slideSelector,
                zoom.onGestureChange,
                activeListenerWithCapture
            );
            swiper.$wrapperEl.on(
                swiper.touchEvents.end,
                slideSelector,
                zoom.onGestureEnd,
                passiveListener
            );
            if (swiper.touchEvents.cancel) {
                swiper.$wrapperEl.on(
                    swiper.touchEvents.cancel,
                    slideSelector,
                    zoom.onGestureEnd,
                    passiveListener
                );
            }
        }
        // Move image
        swiper.$wrapperEl.on(
            swiper.touchEvents.move,
            `.${swiper.params.zoom.containerClass}`,
            zoom.onTouchMove,
            activeListenerWithCapture
        );
    },
    disable() {
        const swiper = this;
        const zoom = swiper.zoom;
        if (!zoom.enabled) return;
        const support = swiper.support;
        swiper.zoom.enabled = false;
        const passiveListener =
            swiper.touchEvents.start === 'touchstart' &&
            support.passiveListener &&
            swiper.params.passiveListeners
                ? { passive: true, capture: false }
                : false;
        const activeListenerWithCapture = support.passiveListener
            ? { passive: false, capture: true }
            : true;
        const slideSelector = `.${swiper.params.slideClass}`;
        // Scale image
        if (support.gestures) {
            swiper.$wrapperEl.off(swiper.touchEvents.start, swiper.zoom.enableGestures, passiveListener);
            swiper.$wrapperEl.off(swiper.touchEvents.end, swiper.zoom.disableGestures, passiveListener);
        } else if (swiper.touchEvents.start === 'touchstart') {
            swiper.$wrapperEl.off(
                swiper.touchEvents.start,
                slideSelector,
                zoom.onGestureStart,
                passiveListener
            );
            swiper.$wrapperEl.off(
                swiper.touchEvents.move,
                slideSelector,
                zoom.onGestureChange,
                activeListenerWithCapture
            );
            swiper.$wrapperEl.off(
                swiper.touchEvents.end,
                slideSelector,
                zoom.onGestureEnd,
                passiveListener
            );
            if (swiper.touchEvents.cancel) {
                swiper.$wrapperEl.off(
                    swiper.touchEvents.cancel,
                    slideSelector,
                    zoom.onGestureEnd,
                    passiveListener
                );
            }
        }
        // Move image
        swiper.$wrapperEl.off(
            swiper.touchEvents.move,
            `.${swiper.params.zoom.containerClass}`,
            zoom.onTouchMove,
            activeListenerWithCapture
        );
    }
};
export default {
    name: 'zoom',
    params: {
        zoom: {
            enabled: false,
            maxRatio: 3,
            minRatio: 1,
            toggle: true,
            containerClass: 'swiper-zoom-container',
            zoomedSlideClass: 'swiper-slide-zoomed'
        }
    },
    create() {
        const swiper = this;
        bindModuleMethods(swiper, {
            zoom: {
                enabled: false,
                scale: 1,
                currentScale: 1,
                isScaling: false,
                gesture: {
                    $slideEl: undefined,
                    slideWidth: undefined,
                    slideHeight: undefined,
                    $imageEl: undefined,
                    $imageWrapEl: undefined,
                    maxRatio: 3
                },
                image: {
                    isTouched: undefined,
                    isMoved: undefined,
                    currentX: undefined,
                    currentY: undefined,
                    minX: undefined,
                    minY: undefined,
                    maxX: undefined,
                    maxY: undefined,
                    width: undefined,
                    height: undefined,
                    startX: undefined,
                    startY: undefined,
                    touchesStart: {},
                    touchesCurrent: {}
                },
                velocity: {
                    x: undefined,
                    y: undefined,
                    prevPositionX: undefined,
                    prevPositionY: undefined,
                    prevTime: undefined
                },
                ...Zoom
            }
        });
        let scale = 1;
        Object.defineProperty(swiper.zoom, 'scale', {
            get() {
                return scale;
            },
            set(value) {
                if (scale !== value) {
                    const imageEl = swiper.zoom.gesture.$imageEl
                        ? swiper.zoom.gesture.$imageEl[0]
                        : undefined;
                    const slideEl = swiper.zoom.gesture.$slideEl
                        ? swiper.zoom.gesture.$slideEl[0]
                        : undefined;
                    swiper.emit('zoomChange', value, imageEl, slideEl);
                }
                scale = value;
            }
        });
    },
    on: {
        init(swiper) {
            if (swiper.params.zoom.enabled) {
                swiper.zoom.enable();
            }
        },
        destroy(swiper) {
            swiper.zoom.disable();
        },
        touchStart(swiper, e) {
            if (!swiper.zoom.enabled) return;
            swiper.zoom.onTouchStart(e);
        },
        touchEnd(swiper, e) {
            if (!swiper.zoom.enabled) return;
            swiper.zoom.onTouchEnd(e);
        },
        doubleTap(swiper, e) {
            if (
                !swiper.animating &&
                swiper.params.zoom.enabled &&
                swiper.zoom.enabled &&
                swiper.params.zoom.toggle
            ) {
                swiper.zoom.toggle(e);
            }
        },
        transitionEnd(swiper) {
            if (swiper.zoom.enabled && swiper.params.zoom.enabled) {
                swiper.zoom.onTransitionEnd();
            }
        },
        slideChange(swiper) {
            if (swiper.zoom.enabled && swiper.params.zoom.enabled && swiper.params.cssMode) {
                swiper.zoom.onTransitionEnd();
            }
        }
    }
};
