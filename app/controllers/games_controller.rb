# frozen_string_literal: true

# Game API controller
class GamesController < ApplicationController
  skip_before_action :params_filter, only: :show
  before_action :load_game, only: %i[update show destroy]

  # New Game
  def create
    unless @top_level.require('action') == 'new'
      render json: { status: 'failed' }, status: :bad_request
      return
    end
    game = Game.new_game
    render json: public_object(game, 'created'), status: :created
  rescue ActionController::ParameterMissing => e
    render json: { status: e.message }, status: :bad_request
  end

  # Make guess
  def update
    guess = @top_level.require('guess')
    if @game.lives_left != 0
      status = if @game.make_guess(guess)
                 'You guessed correctly.'
               else
                 'You guessed incorrectly'
               end
      render json: public_object(@game, status), status: :ok
    else
      render json: { status: 'Game already completed' }, status: :bad_request
    end
  rescue ActionController::ParameterMissing => e
    render json: { status: e.message }, status: :bad_request
  rescue ActiveRecord::RecordInvalid
    render json: { status: 'Guess has already been made!' }, status: :conflict
  end

  # Resume existing game
  def show
    render json: public_object(@game, status), status: :ok
  end

  # Surrender/end game (does not removes game from db though)
  def destroy
    unless @top_level.require('action') == 'surrender'
      render json: { status: 'failed' }, status: :bad_request
      return
    end
    @game.surrender
    render json: public_object(@game, status), status: :ok
  end

  private

  def public_object(game, status)
    {
      game_id: game.id,
      current_hint: game.current_hint,
      lives_left: game.lives_left,
      history: game.history,
      game_state: game.game_state,
      password: game.restricted_password,
      status: status
    }
  end

  def load_game
    @game = Game.find(params.require('id'))
  rescue ActiveRecord::RecordNotFound => e
    render json: { status: e.message }, status: :not_found
  end
end
