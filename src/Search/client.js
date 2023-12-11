import axios from "axios";
import data from "bootstrap/js/src/dom/data";
export const PROJECT_API = process.env.REACT_APP_PROJECT_API;

const request = axios.create({
    withCredentials: true,
});

export const getLocationUsers = async (location) => {
    const response = await request.get(`${PROJECT_API}/users/${location}`);
    return response.data;
}

export const searchLocationNews = async (location) => {
    const response = await request.get(`${PROJECT_API}/news/${location}`);
    return response.data;
    // mock data
    // const response = {
    //     data: {
    //         news: [
    //             {
    //                 title: "New York City Is in a Housing Crisis: Miller Samuel",
    //                 id: "S44ADRDWLU6801",
    //                 card: "video",
    //                 date: 1699974006,
    //                 longURL: "https://www.bloomberg.com/news/videos/2023-11-14/new-york-city-is-in-a-housing-crisis-miller-samuel-video",
    //                 thumbnailImage: "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iZGyE9L20CBI/v3/600x-1.jpg"
    //             },
    //             {
    //                 title: "Con Edison Proposes $903 Million to Fortify New York System",
    //                 id: "S4HQ08T0G1KW01",
    //                 card: "article",
    //                 date: 1700604912,
    //                 longURL: "https://www.bloomberg.com/news/articles/2023-11-21/con-edison-proposes-903-million-to-fortify-its-new-york-system"
    //             },
    //             {
    //                 title: "New York Private College That’s Closing to Skip Debt Payments",
    //                 id: "S4ZYHST1UM0W01",
    //                 card: "article",
    //                 date: 1701465612,
    //                 longURL: "https://www.bloomberg.com/news/articles/2023-12-01/yet-another-new-york-college-to-close-creating-pinch-in-albany"
    //             },
    //             {
    //                 title: "New York City Mayor Eric Adams accused of 1993 sexual assault in legal filing",
    //                 id: "S4L1N7TVI5MO02",
    //                 card: "article",
    //                 date: 1700791567,
    //                 longURL: "https://www.bloomberg.com/en/news/thp/2023-11-23/new-york-city-mayor-eric-adams-accused-of-1993-sexual-assault-in-legal-filing"
    //             },
    //             {
    //                 title: "New York Times Shares Jump as Subscribers Top 10 Million",
    //                 id: "S3PMGRDWRGG001",
    //                 card: "article",
    //                 date: 1699457923,
    //                 longURL: "https://www.bloomberg.com/news/articles/2023-11-08/new-york-times-beats-estimates-as-subscribers-top-10-million"
    //             },
    //             {
    //                 title: "'Killers of the Flower Moon' named best film of 2023 by New York film critics",
    //                 id: "S4YCIFTVI5MO02",
    //                 card: "article",
    //                 date: 1701373911,
    //                 longURL: "https://www.bloomberg.com/en/news/thp/2023-11-30/-killers-of-the-flower-moon-named-best-film-of-2023-by-new-york-film-critics"
    //             },
    //             {
    //                 title: "New York Food Delivery Minimum Pay Rule Is Cleared by Court",
    //                 id: "S4YIC7T0G1KW01",
    //                 card: "article",
    //                 date: 1701388142,
    //                 longURL: "https://www.bloomberg.com/news/articles/2023-11-30/new-york-food-delivery-minimum-pay-rule-is-cleared-by-court"
    //             },
    //             {
    //                 title: "Hedge Fund Kapitalo Plans to Open Office in New York",
    //                 id: "S48J17T0G1KW01",
    //                 card: "article",
    //                 date: 1700237663,
    //                 longURL: "https://www.bloomberg.com/news/articles/2023-11-17/hedge-fund-kapitalo-plans-to-open-new-york-office-amid-expansion"
    //             },
    //             {
    //                 title: "World's Most Expensive Cities 2023: Singapore, Zurich Overtake New York",
    //                 id: "S4WTJCDWLU6801",
    //                 card: "article",
    //                 date: 1701302664,
    //                 longURL: "https://www.bloomberg.com/news/articles/2023-11-30/world-s-most-expensive-cities-2023-singapore-zurich-overtake-new-york"
    //             },
    //             {
    //                 title: "What You Need to Know Before Moving to New York City",
    //                 id: "S4FP3XT0AFB401",
    //                 card: "video",
    //                 date: 1700649158,
    //                 longURL: "https://www.bloomberg.com/news/videos/2023-11-22/what-you-need-to-know-before-moving-to-new-york-city-video",
    //                 thumbnailImage: "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iJkHWJk3sPbA/v73/600x-1.jpg"
    //             },
    //             {
    //                 title: "URGENT: FBI seized phones, iPad from New York Mayor Eric Adams in escalation of fundraising investigation",
    //                 id: "S3XEBYTP3SHT02",
    //                 card: "article",
    //                 date: 1699658256,
    //                 longURL: "https://www.bloomberg.com/en/news/thp/2023-11-10/urgent-fbi-seized-phones-ipad-from-new-york-city-mayor-eric-adams"
    //             },
    //             {
    //                 title: "Futures Broker Marex Is Said to Prepare for New York Listing",
    //                 id: "S3TEDTDWX2PS01",
    //                 card: "article",
    //                 date: 1699537453,
    //                 longURL: "https://www.bloomberg.com/news/articles/2023-11-09/futures-broker-marex-is-said-to-prepare-for-new-york-listing"
    //             },
    //             {
    //                 title: "Yamamoto scores in shootout as Seattle Kraken beat New York Islanders 4-3",
    //                 id: "S4984STP3SHS02",
    //                 card: "article",
    //                 date: 1700204735,
    //                 longURL: "https://www.bloomberg.com/en/news/thp/2023-11-17/yamamoto-scores-in-shootout-as-seattle-kraken-beat-new-york-islanders-4-3"
    //             },
    //             {
    //                 title: "Planet Omega Pop-Up in New York Shows Watches Worn by Elvis, JFK",
    //                 id: "S3VE6GT0G1KW01",
    //                 card: "article",
    //                 date: 1699556488,
    //                 longURL: "https://www.bloomberg.com/news/articles/2023-11-09/planet-omega-pop-up-in-new-york-shows-watches-worn-by-elvis-jfk"
    //             },
    //             {
    //                 title: "Review: The long Kiss goodbye ends at New York's Madison Square Garden, but Kiss avatars loom",
    //                 id: "S53U4DTP3SHS02",
    //                 card: "article",
    //                 date: 1701630013,
    //                 longURL: "https://www.bloomberg.com/en/news/thp/2023-12-03/review-the-long-kiss-goodbye-ends-at-new-york-s-madison-square-garden-but-kiss-avatars-loom"
    //             },
    //             {
    //                 title: "Victims in Niagara Falls border bridge crash identified as Western New York couple",
    //                 id: "S4MZ63TP3SHS02",
    //                 card: "article",
    //                 date: 1700873243,
    //                 longURL: "https://www.bloomberg.com/en/news/thp/2023-11-24/victims-in-niagara-falls-border-bridge-crash-identified-as-western-new-york-couple"
    //             },
    //             {
    //                 title: "Juan Soto traded to New York Yankees from San Diego Padres in 7-player blockbuster",
    //                 id: "S5A3ZRTVI5MO02",
    //                 card: "article",
    //                 date: 1701933738,
    //                 longURL: "https://www.bloomberg.com/en/news/thp/2023-12-07/urgent-juan-soto-traded-to-new-york-yankees-from-san-diego-padres-according-to-two-ap-sources"
    //             },
    //             {
    //                 title: "A horse loose on a flight to Belgium forces a cargo jet back to New York",
    //                 id: "S46CR6TVI5MO02",
    //                 card: "article",
    //                 date: 1700076665,
    //                 longURL: "https://www.bloomberg.com/en/news/thp/2023-11-15/a-cargo-plane-returns-to-jfk-airport-after-a-horse-escapes-its-stall-pilot-dumps-20-tons-of-fuel"
    //             },
    //             {
    //                 title: "WeWork’s Collapse Is Latest Blow to New York, San Francisco Office Markets",
    //                 id: "S3R9NFDWLU6801",
    //                 card: "article",
    //                 date: 1699384115,
    //                 longURL: "https://www.bloomberg.com/news/articles/2023-11-07/wework-s-collapse-is-latest-blow-to-new-york-san-francisco-office-markets"
    //             },
    //             {
    //                 title: "Stellar women's field takes aim at New York City Marathon record on Sunday",
    //                 id: "S3K0RRTVI5MO02",
    //                 card: "article",
    //                 date: 1699104853,
    //                 longURL: "https://www.bloomberg.com/en/news/thp/2023-11-03/stellar-women-s-field-takes-aim-at-new-york-city-marathon-record-on-sunday"
    //             },
    //             {
    //                 title: "NY Region’s Gender Employment Gap Has Fallen Sharply Since 2021",
    //                 id: "S4ZNQWT1UM0W01",
    //                 card: "article",
    //                 date: 1701461855,
    //                 longURL: "https://www.bloomberg.com/news/articles/2023-12-01/us-gender-employment-gap-shrank-sharply-in-ny-region-since-2021"
    //             },
    //             {
    //                 title: "New York Court Gives Blessing on Venezuela Bond Standstill",
    //                 id: "S4KTMKDWX2PS01",
    //                 card: "article",
    //                 date: 1700766242,
    //                 longURL: "https://www.bloomberg.com/news/articles/2023-11-23/new-york-court-gives-blessing-on-venezuela-bond-standstill"
    //             },
    //             {
    //                 title: "NY Governor Hochul: No Sign of Terrorism in Rainbow Bridge Car Blast",
    //                 id: "S4JQK8T0G1KW01",
    //                 card: "video",
    //                 date: 1700695221,
    //                 longURL: "https://www.bloomberg.com/news/videos/2023-11-22/ny-governor-hochul-no-sign-of-terrorism-in-rainbow-bridge-car-blast",
    //                 thumbnailImage: "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/i_d3KLEn_gE8/v3/600x-1.jpg"
    //             },
    //             {
    //                 title: "Amazon-Backed E-Plane Startup, Beta, Expanding in Upstate NY",
    //                 id: "S4YDDZT1UM0W01",
    //                 card: "article",
    //                 date: 1701439200,
    //                 longURL: "https://www.bloomberg.com/news/articles/2023-12-01/amazon-backed-e-plane-startup-beta-expanding-in-upstate-ny"
    //             },
    //             {
    //                 title: "New York's The Hole: Forgotten Jewel Streets Hope for Revival",
    //                 id: "S4ZLC8DWLU6801",
    //                 card: "interactive",
    //                 date: 1701432008,
    //                 longURL: "https://www.bloomberg.com/features/2023-nyc-jewel-streets-redevelopment/"
    //             }
    //         ]
    //     }
    // }
}

