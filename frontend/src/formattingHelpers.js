export function getDrName(user) {
  return user.title + ' ' +  user.firstname + ' ' + user.lastname
}

export function getPatientName(patient) {
  return patient.firstname + ' ' + patient.lastname
}