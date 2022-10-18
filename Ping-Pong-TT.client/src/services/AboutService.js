import { AppState } from "../AppState.js"

class AboutService {
  async setMessage(num) {
    AppState.aboutMessage = num
  }
}

export const aboutService = new AboutService()