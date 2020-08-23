# frozen_string_literal: true

# Password API Controller
class PasswordsController < ApplicationController
  def create
    stong_params_create
    pass = Password.create!(word: @word, win_count: 0, loss_count: 0)
    @hints.each do |hint|
      pass.hints.create!(message: hint, shown: 0)
    end
    render json: { status: 'ok' }, status: :created
  rescue ActionController::ParameterMissing => e
    render json: { status: e.message }, status: :bad_request
  rescue ActiveRecord::RecordInvalid => e
    render json: { status: e.message }, status: :bad_request
  end

  private

  def stong_params_create
    @word = @top_level.require('word')
    @hints = @top_level.require('hints')
  end
end
