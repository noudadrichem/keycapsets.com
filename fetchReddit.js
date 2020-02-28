const fetch = require('node-fetch')
const moment = require('moment')

fetch('https://www.reddit.com/r/MechGroupBuys.json?limit=100')
    .then(r => r.json())
    .then((response) => {
        console.log('fetched items count...', response.data.children.length)
        const sets = response.data.children.reduce((result, data) => {
            const set = data.data
            const formattedSet = getObjFromTitle(set.title)
            if (formattedSet.isGB) {
                if(formattedSet.type === 'gmk') {
                    delete formattedSet.isGB
                    delete formattedSet.year

                    const isActive = moment().diff(formattedSet.groupbuyStartDate, 'days') > 0;
                    result.push({
                        ...formattedSet,
                        active: isActive,
                        coverImageUrl: set.preview.images[0].resolutions.pop().url.replace(/&amp;/g, '&'),
                        websiteUrl: `https://reddit.com${set.permalink}`,
                        vendors: [
                            "5e306b5b30f87f93e77153e7",
                            "5e39ea54fa509d182e35a938",
                            "5e39ead0fa509d182e35a939",
                            "5e39eb5ffa509d182e35a93a",
                            "5e39ec08fa509d182e35a93b",
                            "5e39ec48fa509d182e35a93c",
                        ]

                    })
                }
            }

            return result
        }, [])

        return sets
    })
    .then(function fetchVendor(formateddSets) {
        console.log(formateddSets)

        for (let i = 0; i < formateddSets.length; i++) {
            const set = formateddSets[i];
            console.log(JSON.stringify(set, null, 4))

            fetch('http://localhost:4000/graphql', {
                method: 'post',
                headers: {
                    'Content-Type': 'text/xml'
                },
                body: {
                    "query": `mutation keycapsetCreateOne(
                        $name: String
                        $type: String
                        $active: Boolean
                        $coverImageUrl: String
                        $vendors: [String]
                        $imageUrls: [String]
                        $websiteUrl: String
                        $groupbuyStartDate: Date
                        $groupbuyEndDate: Date
                    ) {
                        createKeycapset(
                            name: $name
                            type: $type
                            active: $active
                            coverImageUrl: $coverImageUrl,
                            vendors: $vendors
                            imageUrls: $imageUrls
                            websiteUrl: $websiteUrl
                            groupbuyStartDate: $groupbuyStartDate
                            groupbuyEndDate: $groupbuyEndDate
                        ) {
                            name
                            type
                            _id
                        }
                }`,
                    "variables": JSON.stringify(set)
                }
            })
        }
    })

function getObjFromTitle(title) {
    const t = title;
    const isGB = title.split(' ')[0] === '[GB]'

    if(isGB) {
        const x = t.split('//')
        const info = x[0].split(' ')
        const type = info[1].toLowerCase();

        if(type === 'gmk') {
            const finalTitle = info.slice(2, info.length).join(' ')
            const dates = x[1].split(',');
            console.log({ dates })
            const year = dates.pop()
            const dateString = dates[0]
            let datess;
            if (dateString.includes(' – ')) {
                datess = dateString.split(' – ')
            } else if (dateString.includes(' - ')) {
                datess = dateString.split(' - ')
            } else if (dateString.includes(' to ')) {
                datess = dateString.split(' to ')
            }

            const startDate = datess[0]
            const endDate = datess[1]

            return {
                name: finalTitle,
                slug: finalTitle.toLowerCase().trim().replace(/ /g, '-'),
                groupbuyStartDate: moment(`${year} ${startDate}`, 'YYYY D m'),
                groupbuyEndDate: moment(`${year} ${endDate}`, 'YYYY D m'),
                year,
                type,
                isGB
            }
        }
    }

    return {
        isGB: false,
    }
}
