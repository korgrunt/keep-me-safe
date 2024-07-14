const { Pool } = require('pg');




class Database {
    constructor() {
        this.pool = new Pool({
            user: 'keepmesafe_user',
            host: 'localhost',
            database: 'keepmesafe_db',
            password: 'qsusdDSDekj3456d2YHg34Zp9su',
            port: 5432, // Port par défaut de PostgreSQL
        });
    }

    async buildDatabase() {
        const createTableQuery = `
        CREATE TABLE IF NOT EXISTS my_table (
            host VARCHAR(100) PRIMARY KEY,
            score INT NOT NULL
        );
    `;

        try {
            const client = await this.pool.connect();
            await client.query(createTableQuery);
            console.log('Table created successfully or already exists.');
            client.release();
        } catch (err) {
            console.log('Error building database:', err.message);
        } 
    }

    async populateDatabase() {
        const commonSitesWhiteListed = [
            'google.com', 'youtube.com', 'facebook.com', 'amazon.com', 'wikipedia.org',
            'yahoo.com', 'reddit.com', 'ebay.com', 'twitter.com', 'instagram.com',
            'linkedin.com', 'netflix.com', 'bing.com', 'craigslist.org', 'cnn.com',
            'pinterest.com', 'espn.com', 'weather.com', 'nytimes.com', 'bbc.com',
            'msn.com', 'foxnews.com', 'quora.com', 'indeed.com', 'apple.com',
            'paypal.com', 'tumblr.com', 'imdb.com', 'stackoverflow.com', 'wordpress.com',
            'huffpost.com', 'nytimes.com', 'walmart.com', 'microsoft.com', 'live.com',
            'salesforce.com', 'adobe.com', 'github.com', 'dropbox.com', 'office.com',
            'zoom.us', 'slack.com', 'medium.com', 'spotify.com', 'cnet.com',
            'forbes.com', 'businessinsider.com', 'healthline.com', 'bankofamerica.com', 'chase.com',
            'usps.com', 'homedepot.com', 'bestbuy.com', 'target.com', 'costco.com',
            'lowes.com', 'etsy.com', 'aliexpress.com', 'ikea.com', 'wayfair.com',
            'tripadvisor.com', 'booking.com', 'airbnb.com', 'expedia.com', 'skyscanner.com',
            'hotels.com', 'zillow.com', 'realtor.com', 'trulia.com', 'opentable.com',
            'yelp.com', 'webmd.com', 'mayoclinic.org', 'nih.gov', 'cdc.gov',
            'fda.gov', 'irs.gov', 'nasa.gov', 'whitehouse.gov', 'senate.gov',
            'house.gov', 'census.gov', 'uspto.gov', 'ssa.gov', 'medicare.gov',
            'va.gov', 'uscis.gov', 'state.gov', 'dot.gov', 'epa.gov',
            'ed.gov', 'fbi.gov', 'cia.gov', 'ice.gov', 'dhs.gov',
            'atf.gov', 'gsa.gov', 'treasury.gov', 'agriculture.gov', 'energy.gov', 'hash24security.gov'
        ];
        try {
            const client = await this.pool.connect();
        
            // Prepare the INSERT queries
            const insertQueries = commonSitesWhiteListed.map(site => `
                INSERT INTO my_table (host, score) VALUES ('${site}', 0) 
                ON CONFLICT (host) DO NOTHING;
            `);
    
            // Execute all insert queries
            for (const query of insertQueries) {
                await client.query(query);
            }
            console.log('Common sites inserted successfully or already exist.');
    
            client.release();
        } catch (err) {
            console.log('Error building database:', err.message);
        }
    }

    async insertUrlAndScore(url, score) {
        const client = await this.pool.connect();
        try {
            const query = {
                text: 'INSERT INTO my_table(host, score) VALUES($1, $2) RETURNING *',
                values: [url, score],
            };
            const result = await client.query(query);
            return result.rows[0];
        } finally {
            client.release();
        }
    }

    async getScoreByUrl(url) {
        const client = await this.pool.connect();
        try {
            const query = {
                text: 'SELECT score FROM my_table WHERE host = $1',
                values: [url],
            };
            const result = await client.query(query);
            return result.rows[0];
        } finally {
            client.release();
        }
    }

    async close() {
        await this.pool.end();
    }
}

// Singleton instance
const dbInstance = new Database();

module.exports = dbInstance;
