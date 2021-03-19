class Api::PatientsController < ApplicationController
  before_action :set_patient, only: [:show, :destroy]

  def index
      patients = Patient.all
      render json: patients
  end

  def show
    physicians = @patient.get_physicians_with_appointments
    render json: {patient: @patient, physicians: physicians}
  end

  def create
    patient = Patient.new(patient_params)
    if(patient.save)
      render json: patient
    else
      render json: {error: @patient.errors}, status: 422
    end
  end

  def destroy
    patient = Patient.find(params[:id]).destroy
   render json: patient
  end
  
  private

  def patient_params 
    params.require(:patient).permit(:name)
  end

  def set_patient
   @patient = Patient.find(params[:id])
  end
end