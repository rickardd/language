class VerbsController < ApplicationController

  def index
    # conjugations = Conjugation.all
    @verbs = Verb.first(3)

    render "index.json.jbuilder"
  end

end
