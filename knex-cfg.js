module.exports = {
    pg_dev: {
        client: 'pg',
        connection: {
            host: 'localhost',
            user: 'postgres',
            password: 'password',
            database: 'blood_donation',
            charset: 'utf8'
        },
        debug: true
    },
    pg_prod: {
        client: 'pg',
        connection: {
            host: 'ec2-174-129-41-23.compute-1.amazonaws.com',
            user: 'sxjpawismomzco',
            password: 'cc910a7f89e96d6faef9a6390550a43d3699ea6a0b1245ef56ff03184bf0c3ee',
            database: 'd4rfh3r3hge9ta',
            charset: 'utf8'
        },
        debug: true
    }
};