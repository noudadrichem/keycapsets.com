import React from 'react';
import Router from 'next/router';
import withGA from 'next-ga';

import '../assets/styles/main.scss';

import Heading from '../components/Heading';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import ButtonLink from '../components/ButtonLink';
import Meta from '../components/Meta';
import Button from '../components/Button';
import ImageCard from '../components/ImageCard';

function Terms() {
    const title = `Promote your keycapset the right way`;
    const description = `Get a completely themed landing page and run an interest check for your unique designed keycapset?`;

    return (
        <>
            <Meta title={title} description={description} />

            <div className="promote-your-set container">
                <Heading
                    mainTitle="Promote your keycapset the right way"
                    subTitle="Get a completely themed landing page and run an interest check for your unique designed keycapset?"
                >
                    <div className="button-container flex align-center">
                        <Button size="md" variant="primary" onClick={() => console.log('-')}>
                            Start now
                        </Button>

                        <Button size="md" variant="secondary" onClick={() => console.log('--')}>
                            Contact
                        </Button>
                    </div>
                </Heading>

                <section className="flex align-center">
                    <div
                        style={{
                            width: 1008,
                            height: 668,
                            background: '#f2f2f2',
                            borderRadius: 8,
                        }}
                    ></div>
                </section>

                <section className="">
                    <h3>Designers before you</h3>

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

                <section className="feature-block left">
                    <div className="grid two-column">
                        <div
                            style={{
                                width: 504,
                                height: 334,
                                background: '#f2f2f2',
                                borderRadius: 8,
                            }}
                        ></div>

                        <div>
                            <h4>A themed single page to promote your unique keycapset</h4>
                            <p className="light">
                                Lorem ipsum dolor sit amet. Curabitur vel volutpat erat. Suspendisse metus eros,
                                fringilla quis dolor at, accumsan maximus ligula. Etiam varius eu odio sit amet
                                molestie. Integer condimentum sem eu orci laoreet, vel gravida purus maximus. Mauris
                                quam tellus, finibus eget ipsum sit amet, elementum efficitur lectus. In et quam diam.
                                Curabitur efficitur dolor in libero hendrerit, id maximus est bibendum. Etiam ac nibh
                                sagittis tellus sollicitudin accumsan maximus a leo.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="feature-block right">
                    <div className="grid two-column">
                        <div
                            style={{
                                width: 504,
                                height: 334,
                                background: '#f2f2f2',
                                borderRadius: 8,
                            }}
                        ></div>

                        <div>
                            <h4>A themed single page to promote your unique keycapset</h4>
                            <p className="light">
                                Lorem ipsum dolor sit amet. Curabitur vel volutpat erat. Suspendisse metus eros,
                                fringilla quis dolor at, accumsan maximus ligula. Etiam varius eu odio sit amet
                                molestie. Integer condimentum sem eu orci laoreet, vel gravida purus maximus. Mauris
                                quam tellus, finibus eget ipsum sit amet, elementum efficitur lectus. In et quam diam.
                                Curabitur efficitur dolor in libero hendrerit, id maximus est bibendum. Etiam ac nibh
                                sagittis tellus sollicitudin accumsan maximus a leo.
                            </p>
                        </div>
                    </div>
                </section>

                {/* <div className="text-container">
                    <h4>Use of the Service</h4>
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

export default withGA('UA-115865530-2', Router)(Terms);
