class Patient < ApplicationRecord
  has_many :appointments, dependent: :destroy
  has_many :physicians, :through => :appointments

  def get_physicians_with_appointments
    self.physicians.map do |physician|
      appointment = physician.appointments.find_by(patient_id: self.id).appointment_date
      {physician: physician, appointment: appointment}
    end
 end

end
