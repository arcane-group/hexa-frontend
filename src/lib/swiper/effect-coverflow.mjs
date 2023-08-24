import { c as createShadow } from '../../../node_modules/swiper/shared/create-shadow.mjs'
import { e as effectInit } from '../../../node_modules/swiper/shared/effect-init.mjs'
import { e as effectTarget } from '../../../node_modules/swiper/shared/effect-target.mjs'
import { k as getSlideTransformEl } from '../../../node_modules/swiper/shared/utils.mjs'

// 改版
function EffectCoverflow(_ref) {
  let { swiper, extendParams, on } = _ref
  extendParams({
    coverflowEffect: {
      translateY: -186,
      stretch: -38,
      depth: 0,
      scale: 1,
      modifier: 1,
    },
  })
  const setTranslate = () => {
    const { width: swiperWidth, height: swiperHeight, slides, slidesSizesGrid } = swiper
    const params = swiper.params.coverflowEffect
    const transform = swiper.translate
    const center = -transform + swiperWidth / 2
    // Each slide offset from center
    for (let i = 0, length = slides.length; i < length; i += 1) {
      const slideEl = slides[i]
      const slideSize = slidesSizesGrid[i]
      const slideOffset = slideEl.swiperSlideOffset
      const centerOffset = (center - slideOffset - slideSize / 2) / slideSize
      const offsetMultiplier =
        typeof params.modifier === 'function'
          ? params.modifier(centerOffset)
          : centerOffset * params.modifier
      let rotateY = 0
      let rotateX = 0
      // var rotateZ = 0

      const absOffset = Math.abs(offsetMultiplier) - 0.5
      let translateZ = absOffset * params.depth
      let stretch = params.stretch
      // Allow percentage to make a relative stretch for responsive sliders
      if (typeof stretch === 'string' && stretch.indexOf('%') !== -1) {
        stretch = (parseFloat(params.stretch) / 100) * slideSize
      }
      let translateY = absOffset * params.translateY
      let translateX =
        absOffset >= 0.6 ? -1 * stretch * offsetMultiplier * 0.8 : stretch * offsetMultiplier
      let scale = 1 - (1 - params.scale) * Math.abs(offsetMultiplier)

      // Fix for ultra small values
      if (Math.abs(translateX) < 0.001) translateX = 0
      if (Math.abs(translateY) < 0.001) translateY = 0
      if (Math.abs(translateZ) < 0.001) translateZ = 0
      if (Math.abs(rotateY) < 0.001) rotateY = 0
      if (Math.abs(rotateX) < 0.001) rotateX = 0
      if (Math.abs(scale) < 0.001) scale = 0
      const slideTransform = `translate3d(${translateX}px,${translateY}px,${translateZ}px)  rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`
      const targetEl = effectTarget(params, slideEl)
      targetEl.style.transform = slideTransform
      slideEl.style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1
    }
  }
  const setTransition = (duration) => {
    const transformElements = swiper.slides.map((slideEl) => getSlideTransformEl(slideEl))
    transformElements.forEach((el) => {
      el.style.transitionDuration = `${duration}ms`
      el.querySelectorAll('.swiper-slide-shadow-right, .swiper-slide-shadow-left').forEach(
        (shadowEl) => {
          shadowEl.style.transitionDuration = `${duration}ms`
        }
      )
    })
  }
  effectInit({
    effect: 'coverflow',
    swiper,
    on,
    setTranslate,
    setTransition,
    perspective: () => true,
    overwriteParams: () => ({
      watchSlidesProgress: true,
    }),
  })
}

export { EffectCoverflow as default }
