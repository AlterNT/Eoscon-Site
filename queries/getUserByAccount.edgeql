select User {
  id,
  name,
  image,
  email,
  emailVerified,
  is_admin
} filter (.<user[is Account].providerAccountId, .<user[is Account].provider) = (<str>$providerAccountId, <str>$provider)