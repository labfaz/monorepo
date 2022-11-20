module.exports = ({ env }) => {
  const settings = parseURL(env('DATABASE_URL')) || {};

  settings.client   = settings.client   || 'postgres';
  settings.host     = settings.host     || env('DB_HOST', 'localhost');
  settings.port     = settings.port     || env.int('DB_PORT', 5432);
  settings.username = settings.username || env('DB_USER');
  settings.password = settings.password || env('DB_PASS');
  settings.database = settings.database || env('DB_NAME', 'labfaz-strapi');
  settings.ssl      = env('NODE_ENV') === 'production';

  let password = '[hidden]';
  console.log('DB CONNECTION ATTEMPT with', { ...settings, password });

  return {
    defaultConnection: 'default',
    connections: {
      default: {
        connector: 'bookshelf',
        settings,
        options: {}
      },
    },
  };
};

function parseURL(url) {
  try {
    let data = new URL(url);

    return {
      client: data.protocol.replace(/:$/, ''),
      host: data.hostname,
      port: data.port,
      username: data.username,
      password: data.password,
      database: data.pathname.replace(/^[/]/, ''),
    };
  } catch (err) {
    return null;
  }
}
