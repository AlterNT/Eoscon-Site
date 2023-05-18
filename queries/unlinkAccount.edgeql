select (
  delete Account
  filter (.providerAccountId, .provider) = (<str>$providerAccountId, <str>$provider)
) {
  account_type,
  provider,
  providerAccountId,
  refresh_token,
  access_token,
  expires_at,
  token_type,
  scope,
  id_token,
  session_state,
  user: {
    id
  }
}