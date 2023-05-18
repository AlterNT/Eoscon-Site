select Session {
  expires,
  sessionToken,
  user: {
    id,
    name,
    image,
    email,
    emailVerified,
    is_admin
  }
} filter .sessionToken = <str>$sessionToken