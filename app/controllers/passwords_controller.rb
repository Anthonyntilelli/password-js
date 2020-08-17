# frozen_string_literal: true

# Password API Controller
class PasswordsController < ApplicationController
  def create
    word = params.require('word')
    hints = params.require('hints')
    pass = Password.create!(word: word, win_count: 0, loss_count: 0)
    hints.each do |hint|
      pass.hints.create!(message: hint, shown: 0)
    end
    render json: 'ok', status: :created
  rescue ActionController::ParameterMissing => e
    render json: e.message.to_json, status: :bad_request
  rescue ActiveRecord::RecordInvalid => e
    render json: e.message.to_json, status: :bad_request
  end
end
