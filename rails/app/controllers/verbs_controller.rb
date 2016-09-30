class VerbsController < ApplicationController

  def index
    # conjugations = Conjugation.all
    @verbs = Verb.all

    render "index.json.jbuilder"
  end

end
