# frozen_string_literal: true

# Base API Controller
class ApplicationController < ActionController::API
  before_action :params_filter

  def params_filter
    @top_level = params.require(params[:controller])
  rescue ActionController::ParameterMissing
    render json: { status: "Expected json it start with #{params[:controller]}" }, status: :bad_request
  end
end
