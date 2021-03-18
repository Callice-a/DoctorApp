# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'

5.times do
  Physician.create(name: Faker::Superhero.name)
end

5.times do
  patient = Patient.create(name: Faker::Name.name)

  6.times do |i|
    Appointment.create(patient_id: patient.id, physician_id: i, appointment_date: Faker::Date.in_date_period)
  end

end

puts "PHYSICIANS SIZE: #{Physician.all.length}"
puts "PATIENT SIZE: #{Patient.all.length}"
puts "APPOINTMENTS SIZE: #{Appointment.all.length}"


