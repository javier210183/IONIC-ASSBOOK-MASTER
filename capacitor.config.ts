import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'es.fullstackpro.ionic.assbook',
  appName: 'IONIC-ASSBOOK-MASTER2',
  webDir: 'www',
  server: {
    androidScheme: 'https',
  },
  android: {
    allowMixedContent: true,
  },
  plugins: {
    GoogleAuth: {
      scopes: ["profile", "email"],
      serverClientId: "746820501392-oalflicqch2kuc12s8rclb5rf7b1fist.apps.googleusercontent.com",
      forceCodeForRefreshToken: true,
    },
  },
};

export default config;
