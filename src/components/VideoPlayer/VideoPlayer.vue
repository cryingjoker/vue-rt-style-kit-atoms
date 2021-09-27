<script type="text/jsx">
    import './videoplayer.styl'
    import {default as Spinner} from "../Spinner/Spinner.vue";
    import debounce from "debounce";
    import variables from "../../variables.json";


    const componentsList = {};
    componentsList[Spinner.name] = Spinner;

    export default {
        name: "RtVideoPlayer",
        components: componentsList,
        props: {
            ga: {
                type: Object,
                default: null
            },
            source: {
                type: Array,
                default: []
            },
            pauseImage: {
                type: String,
                default: ''
            },
            autoplay: {
                type: Boolean,
                default: false
            }
        },
        data: () => ({
            isPlaying: false,
            isMobile: window.innerWidth <= parseInt(variables["mobile-upper-limit"])
        }),
        computed: {
            posterClass() {
                let className = ["rt-video-player__poster"];
                if (this.isPlaying) {
                    className.push("rt-video-player__poster--hidden");
                }
                return className.join(' ');
            }
        },

        mounted: function () {
            if(this.autoplay && !this.isMobile) {
                window.addEventListener('scroll', debounce(this.checkPosition, 35));
                if(this.$refs.video.webkitRequestFullscreen) {
                    document.addEventListener('webkitfullscreenchange', () => {
                        this.unMute();
                    });
                } else if(this.$refs.video.msRequestFullscreen) {
                    document.addEventListener('msfullscreenchange', () => {
                        this.unMute();
                    });
                } else if(this.$refs.video.mozRequestFullscreen) {
                    document.addEventListener('mozfullscreenchange', () => {
                        this.unMute();
                    });
                } else if (this.$refs.video.requestFullscreen) {
                    document.addEventListener('fullscreenchange', () => {
                        this.unMute();
                    });
                }
            }
        },
        methods: {
            activateEventToLink(ga) {
                // const button = this.$refs["button"];
                // button.addEventListener("click", (e) => {
                //     if (!window.dataLayer) {
                //         window.dataLayer = [];
                //     }
                //     window.dataLayer.push(ga);
                // }, false);
            },
            togglePlay() {
                if(!this.isPlaying) {
                    setTimeout(() => {
                        this.$refs.video.play()
                    },0)
                } else {
                    setTimeout(()=> {
                        this.$refs.video.pause();
                    },0)
                }
                this.isPlaying = !this.isPlaying;
            },
            paused() {
                this.isPlaying = false;
            },
            checkPosition() {
                if(this.$refs.wrapper) {
                    if(this.$refs.wrapper.getBoundingClientRect().top > 0 && this.$refs.wrapper.getBoundingClientRect().bottom < window.innerHeight) {
                        this.$refs.video.muted = true;
                        this.$refs.video.play();
                        this.isPlaying = true;
                    } else {
                        this.$refs.video.pause();
                        this.isPlaying = false;
                    }
                }
            },
            unMute() {
                setTimeout(()=> {
                    this.$refs.video.muted = false;
                }, 50)
            }
        },
        render: function (h) {
            const sources = () => {
                return this.source.map((item) => {
                    return <source src={item}/>
                })
            };
            return <div class="rt-video-player-wrapper" ref="wrapper" onClick={this.togglePlay}>
                <div class={this.posterClass} style={"background-image: url(" + this.pauseImage + ")"}>
                    <div class="rt-video-player__play-button">
                        <svg width="63" height="63" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_d)">
                                <circle cx="31.5" cy="29.5" r="27.5" fill="white"/>
                            </g>
                            <path d="M26.0933 20.75L41.8433 29.8433L26.0933 38.9365L26.0933 20.75Z" fill="#101828"/>
                            <defs>
                                <filter id="filter0_d" x="0" y="0" width="63" height="63" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
                                    <feOffset dy="2"/>
                                    <feGaussianBlur stdDeviation="2"/>
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
                                </filter>
                            </defs>
                        </svg>
                    </div>
                </div>
                <video class="rt-video-player" controls ref="video">
                    {sources()}
                </video>
            </div>
        }
    };
</script>
