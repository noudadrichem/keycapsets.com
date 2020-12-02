import React from 'react';
import Router from 'next/router';
import withGA from 'next-ga';

import '../assets/styles/main.scss';

import Heading from '../components/Heading';
import Meta from '../components/Meta';
import Button from '../components/Button';
import ImageCard from '../components/ImageCard';
import Arrow from '../components/Arrow';
import useModalStore, { Modals } from '../hooks/useModalStore';

function CtaButtons() {
    const openModal = useModalStore((state) => state.openModal);

    function contactKCS() {
        openModal(Modals.Contact);
    }

    function redirectToExample() {
        Router.push('/ic/gmk-test-cherry');
    }

    return (
        <div className="button-container flex align-center mobile-left">
            <Button size="lg" variant="primary" onClick={contactKCS}>
                Get in contact
            </Button>

            <Button size="lg" variant="secondary" onClick={redirectToExample}>
                Start example
            </Button>
        </div>
    );
}

function PromoteYourSet() {
    const title = `Promote and run your set via keycapsets.com!    `;
    const description = `Get a completely themed landing page and run an interest check for your unique designed keycapset! KCS provides targeted SEO.`;

    return (
        <>
            <Meta
                title={title}
                description={description}
                metaImgUrl="https://i.ibb.co/gWH2bN8/meta-image-promote-your-keycapset.png"
                keywords={['promoting', 'keycapsets', 'keycap', 'gmk', 'keyboard', 'mechanical keyboard', 'promoting']}
            />

            <div className="promote-your-set container">
                <Heading
                    mainTitle="Promote your keycapset the right way"
                    subTitle="Get a completely themed landing page and run an interest check for your unique designed keycapset!"
                >
                    <CtaButtons />
                </Heading>

                <section className="set-arrow">
                    <Arrow color="#D4E4FA" direction="bottom" />
                </section>

                {/* <section className="flex align-center">
                    <div
                        style={{
                            width: 1008,
                            height: 668,
                            background: '#f2f2f2',
                            borderRadius: 8,
                        }}
                    ></div>
                </section> */}

                <section className="section feature-block left">
                    <div className="grid v-center two-column">
                        <div
                        // style={{
                        //     width: 504,
                        //     height: 334,
                        //     background: '#f2f2f2',
                        //     borderRadius: 8,
                        // }}
                        >
                            {/* <img src="https://i.ibb.co/197KHt9/custom-themed-page-2x.png" alt="Displaying difference between normal and themed page." /> */}
                            <img
                                src="https://i.ibb.co/2KR79M7/custom-themed-page-2x-1.png"
                                alt="Displaying difference between normal and themed page."
                            />
                        </div>

                        <div>
                            <h3>A themed single page to promote your unique keycapset</h3>
                            <p className="light">
                                Upload your set to Keycapsets and let us do the hard work. Keycapsets generates a themed
                                page based on the colours of your unique design. Use this page to promote your set on
                                all the socials and make it the center piece of information.
                                <br />I want to provide more layouts for themed pages in the near future. Do you have a
                                lay-out in mind? Contact me so we can work together towards a beautifull website!
                            </p>
                        </div>
                    </div>
                </section>

                {/*
                <section className="section promo-before">
                    <h3 className="center">Designers before you</h3>

                    <div className="images-container">
                        <ImageCard
                            keycapset={{
                                name: 'Test',
                                coverImageUrl: 'https://keycapsets.com/images/empty-base-kit-illu.png',
                                type: 'cherry',
                                brand: 'gmk',
                                slug: 'gmk-test-cherry',
                                groupbuyStartDate: '2020-11-04',
                                groupbuyEndDate: '2020-12-04',
                                isInterestCheck: false,
                            }}
                        />
                        <ImageCard
                            keycapset={{
                                name: 'Test',
                                coverImageUrl: 'https://keycapsets.com/images/empty-base-kit-illu.png',
                                type: 'cherry',
                                brand: 'gmk',
                                slug: 'gmk-test-cherry',
                                groupbuyStartDate: '2019-11-04',
                                groupbuyEndDate: '2019-12-04',
                                isInterestCheck: false,
                            }}
                        />
                        <ImageCard
                            keycapset={{
                                name: 'Test',
                                coverImageUrl: 'https://keycapsets.com/images/empty-base-kit-illu.png',
                                type: 'cherry',
                                brand: 'gmk',
                                slug: 'gmk-test-cherry',
                                groupbuyStartDate: '2020-11-04',
                                groupbuyEndDate: '2020-12-04',
                                isInterestCheck: true,
                            }}
                        />
                    </div>
                </section>
*/}

                <section className="section feature-block right">
                    <div className="grid v-center two-column">
                        <div>
                            <img
                                src="https://i.ibb.co/8dwjWhN/seo-meta-2x.png"
                                alt="Displaying difference between normal and themed page."
                            />
                        </div>

                        <div>
                            <h3>Targeted SEO for your single page</h3>
                            <p className="light">
                                Keycapsets applies SEO (Search Engine Optimalisation) based on your keycapset. You're
                                able to provide even more keywords to make the most out of your themed single page.
                                <br />
                                Every set will get their own share and meta image based on the colour pallet and design.
                                These images are used at Google, Twitter, Discord, Facebook, Pinterest, LinkedIn, Slack
                                and more. More info about this? Get in contact!
                            </p>
                        </div>
                    </div>
                </section>

                <section className="section feature-block left">
                    <div className="grid v-center two-column">
                        <div
                            style={{
                                boxShadow: '0px 0px 6px 0px rgba(63,63,63, .25)',
                            }}
                        >
                            <img
                                src="https://i.ibb.co/tKbSnnK/custom-ic-numpad-question.png"
                                alt="Visual representation of the IC form."
                            />
                        </div>

                        <div>
                            <h3>Interest check forms tailored to your keycapset design</h3>
                            <p className="light">
                                Want to know what the public is thinking about your design? Want to fine tune your kits
                                based on actual consumer feedback? Run your interest check via Keycapsets. This form is
                                themed with the colours of your design and provides easy insight to consumer opinions.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="section feature-block left">
                    <div className="grid one-column">
                        <div>
                            <h3 className="center">Promote and run your set via keycapsets.com!</h3>
                            <p className="light center">
                                As keycapsets.com is growing I'm working towards a platform that provides a toolbelt for
                                keycapset designers like you! Help Keycapsets grow as a platform and <br />
                                Use Keycapsets as your promotional tool to get insight in how your sets are doing at the
                                public.
                            </p>
                            <br />
                            <CtaButtons />
                        </div>
                    </div>
                </section>

                {/* <section className="section"></section> */}

                {/* <div className="text-container">
                    <h3>Use of the Service</h3>
                    <p className="light alinea">
                        This site tracks analytics via Google Analytics. By using this platform you agree that we track
                        your views of this site.
                    </p>

                    <ButtonLink isLarge href="/">
                        button link
                    </ButtonLink>
                </div> */}
            </div>
        </>
    );
}

export default withGA('UA-115865530-2', Router)(PromoteYourSet);
