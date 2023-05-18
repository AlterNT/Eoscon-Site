select (
  delete User
  filter .id = <uuid>$id
) {
  id,
  name,
  image,
  email,
  emailVerified,
  is_admin
}