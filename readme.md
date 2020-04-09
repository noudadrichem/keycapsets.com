# Keycapsets.com
## Made for love of mech keebs, and the trouble of finding a suitable keycapset overview!

> https://keycapsets.com

[<img src="https://keycapsets.com/images/meta/meta-image.png">](https://keycapsets.com/)

<h2 className="alinea-title">Intro</h2>
<p className="light alinea">
    Friends came to me enthusiastic about mechanical keyboards. I'm always in to help them find their best keyboard. The second step is ofcource, a nice keyset!
</p>

<p className="light alinea">
    We were surfing and browsing through several websites like Geekhack and other vendor sites. This is where the idea came to mind. One website to rule them all. Just one website with an overview of keysets that are available or will be available soon. I don't want to be a vendor. Let this site be a proxy to your vendor.
</p>

<h2 className="alinea-title">For vendors</h2>
<p className="light alinea">
    This site should be an advantage to your business. From overview to single I'll proxy the user to their vendor. There will be an overview page with vendors categorised by country and continent.
</p>

<h2 className="alinea-title">The Future for set designers</h2>
<p className="light alinea">
    I want to make it easier for you as a designer to express yourself. <br/> My goal is to make it possible for you to have a single webpage with all the information you need. Such as vendors, renders, previews etc.
</p>

<h2 className="alinea-title">The Future for explorers</h2>
<p className="light alinea">
    This should be your go-to website to look for keycap sets. I want you to be able to search based on name, type or even the color you like. I want to make it as easy as possible for you to decide what set you should go with on your next build.
</p>

<h2 className="alinea-title">The person behind</h2>
<p className="light alinea">
    I'm Noud Adrichem, a 21 year old mechanical keyboard enthusiast. Stu-dying Software Engineering at Hogeschool Utrecht and working as a Software Engineer at <a href="https://bannerwise.io">Bannerwise.io</a>.
</p>

# Development

## Running locally in development mode

To get started, just clone the repository and run `yarn install && yarn dev`:

    git clone git@github.com:noudadrichem/keycapsets.com.git
    yarn install
    yarn dev

Note: If you are running on Windows run install --noptional flag (i.e. `yarn install --ignore-optional`) which will skip installing fsevents.

## Building and deploying in production

If you wanted to run this site in production, you should install modules then build the site with `yarn build` and run it with `yarn start`:

    yarn install
    yarn build
    yarn start

You should run `yarn build` again any time you make changes to the site.

Note: If you are already running a webserver on port 80 (e.g. Macs usually have the Apache webserver running on port 80) you can still start the example in production mode by passing a different port as an Environment Variable when starting (e.g. `PORT=3000 yarn start`).
