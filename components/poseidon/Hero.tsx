import React, { ReactNode, useRef } from 'react';
import Button from '../../components/Button';
import ButtonLink from '../../components/ButtonLink';

interface HeroProps {}

function Hero(props: HeroProps): JSX.Element {
    const heroRef = useRef(null);
    const videoRef = useRef(null);
    const fullSource = '/images/poseidon.mp4';

    const onVideoPasuse = () => {
        heroRef.current.classList.remove('video-playing');

        videoRef.current.muted = true;
        videoRef.current.controls = false;

        if (document.fullscreen) {
            document.exitFullscreen();
        }

        videoRef.current.removeEventListener('ended', onVideoPasuse);
        videoRef.current.removeEventListener('pause', onVideoPasuse);
    };

    const onPlayClick = () => {
        const videoBreakpoint = 1120; // window.getComputedStyle(document.documentElement).getPropertyValue('--bp-desktop-sm');
        const clientWidth = document.documentElement.clientWidth;

        console.log({ videoBreakpoint, clientWidth });

        videoRef.current.muted = false;
        videoRef.current.controls = true;

        if (videoRef.current.firstChild.src !== fullSource) {
            videoRef.current.firstChild.src = fullSource;
            videoRef.current.load();
        }

        heroRef.current.classList.add('video-playing');
        videoRef.current.addEventListener('ended', onVideoPasuse);
        videoRef.current.addEventListener('pause', onVideoPasuse);

        document.addEventListener('fullscreenchange', () => {
            if (!document.fullscreenElement) {
                videoRef.current.pause();
            }
        });

        // TODO fix type interference
        if (clientWidth <= videoBreakpoint) {
            videoRef.current.requestFullscreen();
        }

        videoRef.current.play();
    };

    return (
        <div ref={heroRef} className="poseidon--hero">
            <div className="poseidon--hero__video">
                <video muted autoPlay ref={videoRef}>
                    {/* <source src="http://quaddepos.nl/poseidon.mp4#t=0,13" type="video/mp4" /> */}
                    <source src="/images/poseidon.mp4" type="video/mp4" />
                </video>
            </div>
            <div className="container poseidon--hero__inner">
                <svg className="logo" version="1.1" x="0px" y="0px" viewBox="0 0 817.4 178.8">
                    <g>
                        <path
                            d="M107.9,64c-2.4,6.4-5.9,12.3-10.2,17.5c-4.3,5.1-9.6,9.3-15.5,12.5c-6.1,3.2-12.8,4.8-19.7,4.8
                c-4.6,0-9.1-0.7-13.5-1.9c-0.5-0.2-0.7-0.5-0.6-1.2s0.3-0.9,0.8-0.7c0.8,0.1,1.7,0.2,2.6,0.2h2.8c5.6,0.1,11.1-0.9,16.3-2.9
                c4.6-1.8,8.8-4.6,12.2-8.3c3.4-3.7,6-8.1,7.7-12.8c1.8-5.2,2.7-10.7,2.7-16.3c0-5.4-0.8-10.7-2.4-15.8c-1.6-5.1-4-10-7.2-14.3
                c-3.1-4.2-7.1-7.7-11.6-10.4c-4.7-2.7-10.1-4-15.5-4c-5.8,0.1-11.5,1.4-16.8,3.7v138.9c0,7.3,1.6,12.5,4.7,15.7
                c3.1,3.2,8.4,4.9,15.8,5.2c0.5,0,0.7,0.3,0.7,0.9s-0.2,0.9-0.7,0.9H14.1c-3.6,0-7.1-0.1-10.7-0.2c-0.5,0-0.7-0.3-0.8-0.8
                c-0.1-0.4,0.1-0.9,0.6-1c0,0,0,0,0,0c3.1-0.4,6.2-1.3,9.1-2.6c2-0.9,3.6-2.4,4.7-4.3c1-2,1.6-4.3,1.6-6.5c0.2-2.6,0.2-5.7,0.2-9.4
                V21.9c0-2.3-0.6-4.5-1.7-6.4c-1.2-1.9-2.6-3.7-4.3-5.1C10.9,8.9,9,7.6,6.9,6.7c-2-1-4.1-1.7-6.3-2.2C0.2,4.4-0.1,4,0,3.5
                c0,0,0,0,0,0c0-0.4,0.4-0.7,0.8-0.7c0,0,0,0,0,0C6.9,3.1,12.9,3.4,19,3.5C25,3.7,31,3.7,36.9,3.7h28.9c6.4-0.1,12.7,0.6,19,1.9
                c5.2,1.1,10.2,3.3,14.4,6.5c4.1,3.3,7.2,7.5,9.2,12.3c2.2,5.1,3.3,11.6,3.3,19.5C111.6,50.8,110.3,57.6,107.9,64z"
                        />
                        <path
                            d="M224.3,113.3c-2.9,6.1-6.9,11.6-11.8,16.1c-5,4.6-10.8,8.2-17.1,10.6c-6.5,2.5-13.5,3.8-20.5,3.8
                c-6.4-0.1-12.6-1.6-18.4-4.3c-6.3-2.9-12.2-6.7-17.4-11.3c-5.2-4.5-9.6-9.9-13.1-15.8c-3.3-5.4-5.1-11.6-5.2-17.9
                c-0.1-8,0.7-15.9,2.5-23.7c2.8-12.5,11.4-22.9,23.1-28.1c7.2-3.3,14.8-5.7,22.6-7.3l2.5-0.2c7.7-0.7,15.4,0.5,22.4,3.5
                c6.8,2.9,13,7.1,18.1,12.4c5.2,5.5,9.4,11.9,12.2,19c3,7.3,4.5,15.1,4.4,23C228.8,100.1,227.3,107,224.3,113.3z M213.4,74.4
                c-1.7-6-4.5-11.6-8.1-16.6c-3.5-4.8-8-8.9-13.2-11.9c-5.5-3.1-11.7-4.7-18-4.5c-5.9-0.1-11.7,1.1-17.1,3.5
                c-4.8,2.2-9.1,5.5-12.5,9.6c-3.5,4.2-6.1,9-7.8,14.1c-1.8,5.5-2.8,11.3-2.7,17.1c0,6.3,1,12.6,2.8,18.7c1.8,6,4.6,11.7,8.4,16.7
                c3.6,4.9,8.2,9,13.5,12.1c5.5,3.1,11.8,4.7,18.1,4.6c11.3,0.3,22.2-4.7,29.3-13.5c3.4-4.2,6-9.1,7.5-14.2
                c1.7-5.6,2.6-11.3,2.5-17.2C216.1,86.6,215.2,80.4,213.4,74.4L213.4,74.4z"
                        />
                        <path
                            d="M287.5,126.1c-2.3,3.7-5.3,6.8-8.9,9.3c-3.6,2.6-7.6,4.6-11.9,6c-4,1.4-8.1,2.1-12.4,2.2
                c-2,0-4-0.2-5.9-0.7c-2-0.4-3.9-1.1-5.7-2.2c-1.7-1-3.1-2.3-4.2-3.9c-1.1-1.8-1.7-3.8-1.6-5.9c0-1.5,0.2-3,0.5-4.5
                c0.3-1.5,0.6-3,0.8-4.3l0.9-4.5c0-0.4,0.2-0.6,0.8-0.6s0.8,0.2,0.8,0.6v2.8c-0.1,2.4,0.5,4.8,1.7,7c1.1,2,2.6,3.7,4.3,5.2
                c1.8,1.5,3.9,2.6,6.1,3.2c2.3,0.7,4.7,1,7.1,1c2.4,0,4.7-0.4,7-1.1c2.3-0.7,4.5-1.8,6.5-3.3c1.9-1.4,3.6-3.2,4.8-5.3
                c1.3-2.1,1.9-4.5,1.9-6.9c0-2.5-0.6-4.9-1.7-7.1c-1.3-2.5-2.8-4.9-4.5-7.1c-2-2.5-4.1-4.9-6.4-7.2c-2.4-2.4-4.8-4.8-7.4-7.2
                c-2.6-2.5-5.3-5.1-7.9-7.6c-2.5-2.5-4.9-5.1-7-7.9c-1.9-2.6-3.6-5.3-4.9-8.2c-1.2-2.7-1.9-5.6-1.9-8.5c-0.1-4,1.2-7.9,3.6-11
                c2.4-3.1,5.4-5.7,8.9-7.5c3.6-2,7.5-3.4,11.5-4.3c3.8-0.9,7.6-1.4,11.5-1.4c4.7-0.1,9.3,0.6,13.8,1.9c0.4,0.3,0.6,0.5,0.6,0.8
                c-0.5,6.2-1.3,12.5-2.3,19.1c-0.1,0.4-0.6,0.7-1,0.5c-0.3-0.1-0.5-0.3-0.5-0.5c-0.9-4.2-2.9-8.1-5.8-11.3c-2.9-3.2-7-4.9-11.2-4.7
                c-4.5-0.1-8.8,1.5-12,4.6c-3.2,3.1-5,7.4-4.8,11.8c0,2.4,0.5,4.8,1.6,7c1.1,2.2,2.5,4.3,4.2,6.2c1.8,2.1,3.8,4.1,5.9,5.9
                c2.3,2,4.6,3.9,7,5.9c2.6,2.1,5.3,4.4,7.8,6.7c2.5,2.2,4.8,4.7,6.9,7.4c2,2.5,3.6,5.3,4.9,8.2c1.3,3,1.9,6.2,1.9,9.4
                C291.1,118.3,289.9,122.5,287.5,126.1z"
                        />
                        <path
                            d="M359.3,132.3c-0.4,2.7-0.8,5.5-1.1,8.4c0,0.4-0.3,0.6-0.8,0.6l-0.2,0.2c-0.8,0.3-1.6,0.5-2.5,0.6
                c-2.9,0-5.8,0-8.8-0.1c-3-0.1-5.9-0.1-8.8-0.1c-2.5,0-5,0-7.4-0.1c-2.4-0.1-4.8-0.1-7.4-0.1c-3.4,0-6.8,0-10.3,0.1
                c-3.5,0.1-6.9,0.2-10.3,0.3v-1.5c1.6,0.1,3.2-0.4,4.6-1.2c1.2-0.8,2.1-1.9,2.7-3.1c0.7-1.3,1.1-2.8,1.2-4.2
                c0.2-1.6,0.3-3.2,0.3-4.8V48.6c0-2.5-0.6-4.1-1.8-4.9c-1.2-0.8-2.5-1.4-3.9-1.9c-0.8-0.2-1.6-0.5-2.5-0.8c-1-0.4-2-0.8-2.9-1.4
                c-0.2-0.2-0.3-0.5-0.3-0.8c0.1-0.3,0.3-0.5,0.7-0.5h53.8c0.5-0.3,1.1-0.5,1.6-0.7c0.5-0.2,1.1-0.4,1.6-0.7c0.6-0.3,0.9,0,0.9,0.8
                c-0.4,3.3-0.9,6.3-1.4,9.1c-0.6,2.8-1.2,5.7-1.8,8.6c-0.1,0.4-0.5,0.6-0.8,0.5c0,0,0,0,0,0c-0.4-0.1-0.7-0.3-0.7-0.7
                c-0.3-4.4-1.8-7.3-4.5-8.7c-3.2-1.5-6.7-2.2-10.2-2.1h-14.9v38.7h21.9c0.8,0,1.7-0.2,2.5-0.6c1-0.4,2-0.8,3-1.1
                c1.3-0.7,2.7-1.3,4.1-1.7c0.6-0.3,0.9,0,0.9,0.8c-0.1,1.5-0.3,3.1-0.5,4.9c-0.2,1.8-0.4,3.4-0.7,4.9s-0.4,3.1-0.6,4.7
                s-0.3,3.2-0.6,4.7c0,0.4-0.3,0.8-0.7,0.8c-0.2,0-0.5-0.1-0.6-0.2c-0.6-0.5-1-1.2-1.2-1.9c-0.2-0.6-0.4-1.3-0.7-2.1
                s-0.5-1.5-0.8-2.3c-0.3-0.8-0.7-1.5-1.3-2.1c-1-0.8-2.2-1.3-3.5-1.4c-1.7-0.3-3.5-0.6-5.5-0.8c-1.9-0.2-3.9-0.3-5.8-0.3h-10v38.9
                c2,2.9,4.8,5,8,6.3c3.2,1.4,6.6,2.1,10.1,2.2c4,0.1,8-1.1,11.2-3.5c3.2-2.5,5.3-6,6.1-9.9l1.5,0.4
                C360.2,126.8,359.7,129.6,359.3,132.3z"
                        />
                        <path
                            d="M397.7,140.8c-2.3-0.1-4.7-0.1-7.1-0.1c-3.4,0-6.7,0-10,0.1c-3.3,0.1-6.6,0.2-10,0.3
                c-0.4,0-0.6-0.2-0.7-0.7c-0.1-0.4,0.1-0.7,0.5-0.8c0,0,0,0,0,0c2.8-0.9,5.3-2.7,6.9-5.2c1.5-2.5,2.3-5.4,2.2-8.4V47.7
                c0-2.9-1-4.9-2.9-6c-2.1-1.2-4.5-2-6.9-2.3c-0.4-0.1-0.6-0.5-0.5-0.8c0,0,0,0,0,0c0.1-0.4,0.3-0.7,0.7-0.7c2.6,0.3,5.3,0.4,7.9,0.6
                c2.6,0.1,5.3,0.2,8.1,0.2c2.6,0,5.3-0.1,7.9-0.2c2.6-0.1,5.2-0.4,7.7-0.8c0.4-0.1,0.6,0.1,0.8,0.6c0.1,0.5,0,0.8-0.4,0.9
                c-2.3,0.5-4.6,1.2-6.7,2.3c-1.7,0.9-2.5,3-2.5,6.2v77.7c0,4.8,0.9,8.2,2.7,10.3s5,3.3,9.5,3.7v1.5
                C402.4,140.9,400,140.9,397.7,140.8z"
                        />
                        <path
                            d="M512.7,111.8c-2.7,6.5-6.8,12.3-12.1,17c-5.4,4.6-11.8,8-18.7,10c-7.8,2.3-16,3.4-24.1,3.3
                c-3.3,0-6.6-0.1-10.1-0.4c-3.5-0.3-6.8-0.5-10.1-0.8c-3.6-0.2-7.3-0.5-11-0.8c-3.7-0.3-7.4-0.3-11-0.2c-0.4,0-0.6-0.2-0.7-0.7
                c-0.1-0.4,0.1-0.7,0.5-0.8c0,0,0,0,0,0c4.1-0.9,6.7-2.3,7.6-4.3s1.4-5,1.4-9.1V47.2c0-2.9-0.8-4.7-2.3-5.6
                c-1.4-0.8-2.9-1.3-4.5-1.6c-0.8-0.1-1.7-0.3-2.5-0.6c-0.7-0.2-1.3-0.7-1.7-1.3c-0.5-0.8-0.3-1.1,0.6-1.1c1.6,0,3.2,0,4.7,0.1
                c1.5,0.1,3.1,0.2,4.7,0.3c1.9,0.1,4,0.3,6.2,0.4s4.4,0.2,6.4,0.2c2.5,0,5-0.1,7.5-0.2c2.5-0.1,5-0.3,7.5-0.6
                c2.4-0.2,4.9-0.4,7.5-0.5c2.6-0.1,5.1-0.1,7.5-0.1c7-0.1,13.9,1.3,20.3,4c6,2.5,11.5,6.2,16.1,10.8c4.6,4.7,8.2,10.2,10.7,16.2
                c2.6,6.3,3.9,13.1,3.9,19.9C517,96.9,515.6,105,512.7,111.8z M500.3,72.1c-4.9-12.1-14.7-21.5-27-25.8c-6.7-2.4-13.7-3.6-20.8-3.5
                c-2.5,0-5,0.1-7.5,0.4c-2.5,0.3-5,0.8-7.4,1.7v74.9c-0.1,2.9,0.3,5.9,1.2,8.7c0.7,2,2,3.7,3.7,4.9c1.8,1.2,3.9,2,6.1,2.2
                c2.9,0.3,5.8,0.5,8.8,0.5c6.4,0.1,12.8-0.9,19-2.7c5.4-1.7,10.5-4.4,14.8-8.1c4.2-3.7,7.5-8.3,9.6-13.5c2.4-6,3.5-12.4,3.4-18.9
                C504.3,85.8,503,78.7,500.3,72.1z"
                        />
                        <path
                            d="M628.8,113.3c-2.9,6.1-6.9,11.6-11.8,16.1c-5,4.6-10.8,8.2-17.1,10.6c-6.5,2.5-13.5,3.8-20.5,3.8
                c-6.4-0.1-12.6-1.6-18.4-4.3c-6.3-2.9-12.2-6.7-17.4-11.3c-5.2-4.5-9.6-9.9-13.1-15.8c-3.3-5.4-5.1-11.6-5.2-17.9
                c-0.1-8,0.7-15.9,2.5-23.7c2.8-12.5,11.4-22.9,23.1-28.1c7.2-3.3,14.8-5.7,22.6-7.3l2.5-0.2c7.7-0.7,15.4,0.5,22.4,3.5
                c6.8,2.9,13,7.1,18.1,12.4c5.2,5.5,9.4,11.9,12.2,19c3,7.3,4.5,15.1,4.4,23C633.3,100.1,631.8,107,628.8,113.3z M617.8,74.4
                c-1.7-6-4.5-11.6-8.1-16.6c-3.5-4.8-8-8.9-13.2-11.9c-5.5-3.1-11.7-4.7-18-4.5c-5.9-0.1-11.7,1.1-17.1,3.5
                c-4.8,2.2-9.1,5.5-12.5,9.6c-3.5,4.2-6.1,9-7.8,14.1c-1.8,5.5-2.8,11.3-2.7,17.1c0,6.3,1,12.6,2.8,18.7c1.8,6,4.6,11.7,8.4,16.7
                c3.6,4.9,8.2,9,13.5,12.1c5.5,3.1,11.8,4.7,18.1,4.6c11.3,0.3,22.2-4.7,29.3-13.5c3.4-4.2,6-9.1,7.5-14.2
                c1.7-5.6,2.6-11.3,2.6-17.2C620.6,86.6,619.6,80.4,617.8,74.4z"
                        />
                        <path
                            d="M816.4,6.5c-0.3,0-0.6,0.1-0.9,0.2c-1.4,0.5-2.9,0.9-4.5,1.4c-1.6,0.4-3.1,1-4.5,1.7
                c-1.3,0.6-2.5,1.6-3.4,2.8c-0.9,1.2-1.3,2.6-1.3,4.1v19.1c0,6.4,0.1,12.7,0.2,19.1s0.2,12.7,0.2,19.1v19.1
                c0,14.1-0.2,28.2-0.6,42.2s-1.2,28.2-2.4,42.5c0,0.4-0.3,0.7-0.6,0.8c-0.3,0.2-0.8,0.2-1-0.1c-21.1-18.2-41.2-37.6-60-58.2
                C718.6,99.7,700,78.9,681.7,58c-3.1-3.6-5.9-6.8-8.3-9.7c-2.4-2.9-5.2-6-8.3-9.4c-0.3,2.9-0.6,5.8-0.8,8.6
                c-0.2,2.8-0.3,5.7-0.3,8.6c0,7.9,0.2,15.9,0.5,23.9c0.3,8,0.6,16.1,0.9,24.3c0.3,8.1,0.6,16.1,0.9,24c0.3,7.9,0.5,15.9,0.5,24
                c-0.1,3.2,0.2,6.3,0.8,9.4c0.4,1.9,1.2,3.6,2.3,5.1c0.9,1.1,2.1,2,3.5,2.4c1.4,0.5,2.8,0.9,4.3,1.2c1.8,0.3,3.6,0.8,5.4,1.3
                c2.1,0.7,4.1,1.7,5.8,3.1c0.3,0.3,0.4,0.7,0.3,1c-0.1,0.4-0.4,0.6-0.8,0.6c-2.2-0.2-4.3-0.3-6.5-0.5s-4.3-0.4-6.5-0.7
                c-2.8-0.3-5.6-0.6-8.5-0.8s-5.8-0.4-8.7-0.3c-4,0-7.9,0.2-11.9,0.7c-4,0.5-8.1,1-12.1,1.6c-0.3,0.2-0.6,0-0.8-0.5
                c-0.2-0.4-0.2-0.9,0.1-1.2c1.3-1.1,2.7-2.1,4.2-3c1.2-0.8,2.5-1.6,3.7-2.3c1.4-0.8,2.7-1.5,4-2.2c1.3-0.7,2.4-1.7,3.3-2.8
                c1-1.3,1.8-2.8,2.2-4.4c0.6-2.2,0.9-4.6,0.8-6.9v-6.5c0-2.9-0.1-6.4-0.2-10.5c-0.2-8.5-0.3-18.9-0.3-31s-0.1-24.4-0.1-37
                c0-8.5,0-16.8,0.1-24.7c0.1-7.9,0.2-15,0.5-21.2c0.2-6.2,0.5-11.3,0.9-15.2s1-6.2,1.7-6.9c0.6-0.3,1.1-0.3,1.4,0
                c23,23.6,45.3,47.1,67,70.4c21.7,23.3,43.5,47.4,65.4,72v-1.9c0-19.2-0.2-38.6-0.7-57.9c-0.5-19.2-0.7-38.6-0.7-58
                c0.1-3.1-0.3-6.2-1.2-9.2c-0.6-1.9-1.7-3.7-3.1-5.1c-1.2-1.1-2.7-1.9-4.3-2.2c-1.6-0.3-3.1-0.6-4.7-0.9c-1.4-0.3-2.8-0.6-4.2-0.8
                c-1.4-0.2-2.7-0.8-3.7-1.7c-0.3-0.3-0.4-0.7-0.1-1c0.2-0.4,0.7-0.5,1-0.3c4.5,0.5,9,1,13.5,1.5c4.5,0.5,9,0.7,13.5,0.3l8.1-0.7
                c1.5-0.2,3.2-0.3,4.9-0.6c1.6-0.2,3.3-0.2,4.9,0.1c0.8,0,1.8,0,3,0.1s2.2,0.1,2.8,0.1l0.2,1.9C817.1,6.4,816.8,6.5,816.4,6.5z"
                        />
                    </g>
                </svg>
                <div className="button-wrapper">
                    <Button
                        className="btn--poseidon"
                        size="lg"
                        onClick={() => (window.location.href = '/ic/gmk-poseidon-cherry')}
                    >
                        Fill in Interest Check
                    </Button>
                    {/* <ButtonLink isLarge={true} href="http://google.nl">
                        Go to Geeknack
                    </ButtonLink> */}
                </div>

                <Button onClick={onPlayClick} className="btn--video" size="md">
                    <div className="play-icon"></div>
                </Button>
            </div>
        </div>
    );
}

export default Hero;
