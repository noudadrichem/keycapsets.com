import Head from 'next/head';

const TITLE = `Keycapsets.com. Find your favorite keycapset!`;
const DESCRIPTION = `Looking for a beautiful keycapset for your current or future keyboard but don't know where to start? This page shows you existing keycapsets and will point you in the right direction to buy that keycapset!`;
const META_IMG_URL = 'https://keycapsets.com/images/meta/meta-image.png';

interface MetaProps {
    title?: string;
    description?: string;
    metaImgUrl?: string;
}

function Meta(props: MetaProps) {
    const { title, description, metaImgUrl }: MetaProps = props;
    console.log({
        title,
        description,
        metaImgUrl,
    });

    function setGoogleTags() {
        return {
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-115865530-2');`,
        };
    }

    return (
        <Head>
            <title>{title || TITLE}</title>
            <meta
                name="viewport"
                key="viewport"
                content="width=device-width, initial-scale=1.0, maximum-scale=1.00, minimum-scale=1.00"
            />

            <link rel="shortcut icon" href="/images/favicon.ico" type="image/x-icon" />
            <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
            <meta name="author" content="noudadrichem" />
            <meta key="meta_og_title" property="og:title" content={title || TITLE} />
            <meta key="meta_twitter_title" name="twitter:title" content={title || TITLE} />

            <meta key="meta_description" name="description" content={description || DESCRIPTION} />
            <meta key="meta_og_description" property="og:description" content={description || DESCRIPTION} />
            <meta key="meta_twitter_description" name="twitter:description" content={description || DESCRIPTION} />

            <meta key="meta_og_image" property="og:image" content={metaImgUrl || META_IMG_URL} />
            <meta key="meta_twitter_image" name="twitter:image" content={metaImgUrl || META_IMG_URL} />

            {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
            <script async src="https://www.googletagmanager.com/gtag/js?id=UA-115865530-2"></script>
            <script dangerouslySetInnerHTML={setGoogleTags()} />
        </Head>
    );
}

export default Meta;
