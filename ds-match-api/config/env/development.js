module.exports = {

  // Add other environment variables here

  docker_data_dir: '/app/dockerData/',

  hookTimeout: 3600000,

  datastores: {
    default: {
      adapter: 'sails-mssql',
      url: 'mssql://marketingprocess:!Dz%23R%403,e9%7B6RvhY@NEDDBSERVICES/NedDev',
    }
  },


  models: {
    migrate: 'safe'
  },

  blueprints: {
    shortcuts: false,
  },

  security: {
    cors: {
      allRoutes: true,
      allowOrigin: '*'
      // allowOrigins: [
      //   'http://localhost:4200'
      // ],
    },
  },

  session: {
    // adapter: '@sailshq/connect-redis',
    // url: 'redis://user:password@localhost:6379/databasenumber',
    cookie: {
      // secure: true,
      maxAge: 24 * 60 * 60 * 1000,  // 24 hours
    },
  },

  sockets: {},

  log: {
    level: 'debug'
  },

  http: {
    cache: 365.25 * 24 * 60 * 60 * 1000, // One year
    // trustProxy: true,
  },

  custom: { },

  port:2338,

};
