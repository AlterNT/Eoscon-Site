select User {
  id,
  name,
  image,
  email,
  emailVerified,
  is_admin
} filter .email = <str>$email