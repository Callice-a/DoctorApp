class Api::StaticController < ApplicationController

    def api_test
      render json: {dataHere: '*This App for criminally insane, but ethically flexitble doctors is running smoothly*'}
    end
end
