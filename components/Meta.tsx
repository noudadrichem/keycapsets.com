import Head from 'next/head'

const title = `Keycapsets. Find your favorite keycapset!`;
const description = `Searching for a beautifull keycapset for your current or future keyboard but don't know where to start? This page shows you keycapsets that excist and will point you in the right direction to buy that keycapset!`;
const metaImgUrl = 'https://keycapsets.com/images/meta/meta-image.png';

function Meta(props) {
    function setGoogleTags() {
        return {
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-115865530-2');`
        };
    }


    return (
        <Head>
            <title>{title}</title>
            <meta
                name="viewport"
                key="viewport"
                content="width=device-width, initial-scale=1.0, maximum-scale=1.00, minimum-scale=1.00"
            />
            <meta name="author" content="noudadrichem" />
            <meta property="og:title" content={title} />
            <meta name="twitter:title" content={title} />

            <meta name="description" content={description} />
            <meta property="og:description" content={description} />
            <meta name="twitter:description" content={description} />

            <meta property="og:image" content={metaImgUrl} />
            <meta name="twitter:image" content={metaImgUrl} />

            {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
            <script async src="https://www.googletagmanager.com/gtag/js?id=UA-115865530-2"></script>
            <script dangerouslySetInnerHTML={setGoogleTags()} />

        </Head>
    )
}

export default Meta
