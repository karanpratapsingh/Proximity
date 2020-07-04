export type GoogleAuthResult = {
  idToken: string | null;
  accessToken: string | undefined;
};

export type AppleAuthResult = {
  identityToken: string | null;
  nonce: string;
};

export enum SocialSignInType {
  GOOGLE,
  APPLE,
}

export type SocialSignInResult = {
  token: string;
  avatar: string | null;
  name: string;
  email: string;
};
