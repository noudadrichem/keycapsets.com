import Head from 'next/head'

const title = `Keycapsets. Find your favorite set!`;
const description = `Searching for a beautifull keycapset for your keyboard but don't know where to start? This page shows you sets that excist and will point you in the right direction to buy that set!`;
const metaImgUrl = 'https://keycapsets.com/images/meta/meta-image.png';

function Meta(props) {
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

            <meta property="og:image" name="meta image" content={metaImgUrl} />
            <meta name="twitter:image" name="meta image" content={metaImgUrl} />
        </Head>
    )
}

export default Meta
