module.exports = ({ env }) => {
  if (!env.bool('USE_AWS')) {
    return {
      upload: {
        config: {
          providerOptions: {
            localServer: { maxage: 300000 },
          },
        },
      },
    };
  } 

  return {
    upload: {
      provider: 'aws-s3',
      providerOptions: {
        accessKeyId: env('AWS_ACCESS_KEY_ID'),
        secretAccessKey: env('AWS_ACCESS_SECRET'),
        region: env('AWS_REGION'),
        params: {
          Bucket: env('AWS_BUCKET'),
        },
      },
    },
  };
};
 