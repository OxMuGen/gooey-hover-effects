import gsap from 'gsap'
import { ev } from './utils/utils'

export default class DetailView {

    constructor() {
        this.$els = {
            el: document.querySelector('.detail-view'),
            closeBtn: document.querySelector('.close-detail'),
            title: document.querySelector('.detail-view__title'),
        }
        this.$els.text = this.$els.el.querySelectorAll('.detail-view__title, p')

        this.bindEvent()
    }

    bindEvent() {
        document.addEventListener('view:toggle', ({ detail }) => { this.toggleReveal(detail) })

        this.$els.closeBtn.addEventListener('click', () => { this.onClose() })
    }

    onToggleView(shouldOpen = true) {
        this.$els.el.classList.toggle('is-interactive', shouldOpen)
        this.$els.el.classList.toggle('is-visible', shouldOpen)
    }

    onOpen() {
        const { title: pageTitle } = APP.Stage.$els

        gsap.to(pageTitle, {
            duration: 0.5,
            alpha: 0,
            force3D: true,
        })

        gsap.fromTo(this.$els.closeBtn, {
            duration: 0.5,
            rotate: -45,
            scale: 0,
            alpha: 0,
        }, {
            duration: 0.5,
            rotate: 0,
            scale: 1,
            alpha: 1,
            ease: "power2.inOut",
            force3D: true,
        })

        gsap.fromTo(this.$els.text, {
            duration: 0.8,
            yPercent: 100,
            alpha: 0,
        }, {
            duration: 0.8,
            yPercent: 0,
            ease: "power3.inOut",
            force3D: true,
            alpha: .7,
            stagger:  0.5 / this.$els.text.length
        })

        this.onToggleView()
    }

    onClose() {
        const { title: pageTitle } = APP.Stage.$els

        gsap.to(pageTitle, {
            duration: 0.5,
            alpha: 0.1,
            force3D: true,
        })

        gsap.to(this.$els.text, {
            duration: 0.8,
            yPercent: 100,
            ease: "power3.inOut",
            force3D: true,
            alpha: 0,
            stagger: 0.5 / this.$els.text.length,
            onComplete: () => {
                this.onToggleView(false)
            }
        })

        gsap.to(this.$els.closeBtn, {
            duration: 0.5,
            rotate: -45,
            scale: 0,
            alpha: 0,
            ease: "power2.inOut",
            force3D: true,
        })

        gsap.delayedCall(0.3, () => {
            ev('toggleDetail', {
                open: false,
                force: true,
            })
        })
    }

    toggleReveal({ shouldOpen, target }) {
        if (!shouldOpen) return

        this.$els.title.innerText = target.$els.title
        this.onOpen()
    }

}
