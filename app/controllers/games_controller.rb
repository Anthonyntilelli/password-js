# frozen_string_literal: true

# Game API controller
class GamesController < ApplicationController
  def create
    unless @top_level.require('action') == 'new'
      render json: { status: 'failed' }, status: :bad_request
      return
    end
    game = Game.new_game
    render json: public_object(game, 'created'), status: :created
  rescue ActionController::ParameterMissing
    render json: { status: e.message }, status: :bad_request
  end

  private

  def public_object(game, status)
    { game_id: game.id, current_hint: game.current_hint, lives_left: game.lives_left, status: status }
  end
end
